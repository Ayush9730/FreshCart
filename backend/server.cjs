const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const { createClient } = require('@supabase/supabase-js');

dotenv.config();

const app = express();
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '100kb' }));

const PORT = process.env.PORT || process.env.PAYMENT_PORT || 5000;
const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in backend/.env');
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

if (!keyId || !keySecret) {
  console.warn('Razorpay keys are not configured. Payment endpoints will be unavailable.');
}

const razorpay = keyId && keySecret
  ? new Razorpay({ key_id: keyId, key_secret: keySecret })
  : null;

const TAX_RATE = 0.05;
const MAX_QUANTITY_PER_ITEM = 100;

function getBearerToken(req) {
  const header = req.headers.authorization || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : null;
}

async function requireCustomer(req, res, next) {
  try {
    const token = getBearerToken(req);
    if (!token) {
      return res.status(401).json({ error: 'Sign in is required to continue.' });
    }

    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data?.user?.id) {
      return res.status(401).json({ error: 'Your session is invalid or expired. Please sign in again.' });
    }

    req.customer = data.user;
    return next();
  } catch (error) {
    console.error('Customer authentication error:', error);
    return res.status(401).json({ error: 'Unable to authenticate this request.' });
  }
}

function roundMoney(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function safeEqualHex(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' ||
      !/^[0-9a-f]+$/i.test(a) || !/^[0-9a-f]+$/i.test(b)) {
    return false;
  }
  const aBuffer = Buffer.from(a, 'hex');
  const bBuffer = Buffer.from(b, 'hex');
  return aBuffer.length === bBuffer.length && crypto.timingSafeEqual(aBuffer, bBuffer);
}

async function getOwnedPendingOrder(orderNumber, userId) {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('id, user_id, order_number, items, subtotal, tax, total, payment_status, order_status, payment_id, stock_deducted')
    .eq('order_number', orderNumber)
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

/*
 * Rebuild order item prices from Supabase products.
 * Client-supplied item names/prices/amounts and totals are never trusted.
 */
async function priceOrderFromDatabase(order) {
  if (!Array.isArray(order.items) || order.items.length === 0) {
    throw Object.assign(new Error('The order has no items.'), { statusCode: 400 });
  }

  const quantities = new Map();
  for (const item of order.items) {
    const id = Number(item?.id);
    const quantity = Number(item?.quantity);

    if (!Number.isSafeInteger(id) || id <= 0 ||
        !Number.isSafeInteger(quantity) || quantity <= 0 ||
        quantity > MAX_QUANTITY_PER_ITEM) {
      throw Object.assign(new Error('The order contains an invalid product or quantity.'), { statusCode: 400 });
    }
    quantities.set(id, (quantities.get(id) || 0) + quantity);
    if (quantities.get(id) > MAX_QUANTITY_PER_ITEM) {
      throw Object.assign(new Error('The requested quantity is too large.'), { statusCode: 400 });
    }
  }

  const productIds = [...quantities.keys()];
  const { data: products, error } = await supabaseAdmin
    .from('products')
    .select('id, name, price, is_available, stock_quantity')
    .in('id', productIds);

  if (error) throw error;
  if (!products || products.length !== productIds.length) {
    throw Object.assign(new Error('One or more products no longer exist.'), { statusCode: 400 });
  }

  const productById = new Map(products.map(product => [Number(product.id), product]));
  const pricedItems = [];

  for (const [id, quantity] of quantities.entries()) {
    const product = productById.get(id);
    const price = Number(product?.price);

    if (!product || product.is_available === false) {
      throw Object.assign(new Error(`Product ${id} is currently unavailable.`), { statusCode: 400 });
    }
    if (!Number.isFinite(price) || price < 0) {
      throw Object.assign(new Error(`Product ${id} has an invalid price in the database.`), { statusCode: 500 });
    }
    if (product.stock_quantity != null && Number(product.stock_quantity) < quantity) {
      throw Object.assign(new Error(`${product.name} does not have enough stock.`), { statusCode: 409 });
    }

    pricedItems.push({
      id,
      name: String(product.name),
      price: roundMoney(price),
      quantity,
      amount: roundMoney(price * quantity),
    });
  }

  const subtotal = roundMoney(pricedItems.reduce((sum, item) => sum + item.amount, 0));
  const tax = roundMoney(subtotal * TAX_RATE);
  const total = roundMoney(subtotal + tax);

  return { items: pricedItems, subtotal, tax, total };
}

app.get('/', (_req, res) => {
  res.json({ message: 'FreshCart Payment API', status: 'running' });
});

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    razorpayConfigured: Boolean(razorpay),
    supabaseConfigured: Boolean(supabaseAdmin),
  });
});

/*
 * POST /api/create-order
 * Body: { receipt: "BILL-..." }
 * Requires Authorization: Bearer <Supabase access token>
 */
app.post('/api/create-order', requireCustomer, async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(503).json({ error: 'Razorpay is not configured on the server.' });
    }

    const receipt = req.body?.receipt;
    if (typeof receipt !== 'string' || !/^BILL-[A-Za-z0-9_-]{1,32}$/.test(receipt)) {
      return res.status(400).json({ error: 'Invalid order receipt.' });
    }

    const existingOrder = await getOwnedPendingOrder(receipt, req.customer.id);
    if (!existingOrder) {
      return res.status(404).json({ error: 'Pending order was not found for this customer.' });
    }
    if (existingOrder.payment_status === 'paid') {
      return res.status(409).json({ error: 'This order has already been paid.' });
    }
    if (existingOrder.payment_status !== 'pending') {
      return res.status(409).json({ error: 'This order is not available for payment.' });
    }

    // Reprice the order from trusted database values.
    const priced = await priceOrderFromDatabase(existingOrder);
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({
        items: priced.items,
        subtotal: priced.subtotal,
        tax: priced.tax,
        total: priced.total,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existingOrder.id)
      .eq('user_id', req.customer.id)
      .eq('payment_status', 'pending');

    if (updateError) throw updateError;

    const amountInPaise = Math.round(priced.total * 100);
    if (!Number.isSafeInteger(amountInPaise) || amountInPaise <= 0) {
      return res.status(400).json({ error: 'Calculated order amount is invalid.' });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt,
      notes: { customer_id: req.customer.id },
    });

    return res.json({
      id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId,
      receipt,
      subtotal: priced.subtotal,
      tax: priced.tax,
      total: priced.total,
      items: priced.items,
    });
  } catch (error) {
    console.error('Create order error:', error);
    return res.status(error.statusCode || 500).json({
      error: error.statusCode ? error.message : 'Unable to create Razorpay order.',
    });
  }
});

/*
 * POST /api/verify-payment
 * Body: Razorpay Checkout response fields
 * Requires Authorization: Bearer <Supabase access token>
 */
app.post('/api/verify-payment', requireCustomer, async (req, res) => {
  try {
    if (!razorpay || !keySecret) {
      return res.status(503).json({ verified: false, error: 'Razorpay is not configured on the server.' });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
    if (
      typeof razorpay_order_id !== 'string' ||
      typeof razorpay_payment_id !== 'string' ||
      typeof razorpay_signature !== 'string' ||
      !razorpay_order_id || !razorpay_payment_id || !razorpay_signature
    ) {
      return res.status(400).json({ verified: false, error: 'Missing payment verification fields.' });
    }

    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (!safeEqualHex(expectedSignature, razorpay_signature)) {
      return res.status(400).json({ verified: false, error: 'Payment signature verification failed.' });
    }

    const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id);
    if (!razorpayOrder?.receipt) {
      return res.status(400).json({ verified: false, error: 'Razorpay order has no receipt.' });
    }

    const order = await getOwnedPendingOrder(razorpayOrder.receipt, req.customer.id);
    if (!order) {
      return res.status(404).json({ verified: false, orderSaved: false, error: 'No matching order belongs to this customer.' });
    }

    // Check the gateway order against the server-calculated database total.
    const expectedAmount = Math.round(Number(order.total) * 100);
    if (
      razorpayOrder.currency !== 'INR' ||
      Number(razorpayOrder.amount) !== expectedAmount ||
      razorpayOrder.receipt !== order.order_number
    ) {
      return res.status(400).json({ verified: false, error: 'Razorpay order amount or receipt does not match the database order.' });
    }

    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    if (
      payment.order_id !== razorpay_order_id ||
      Number(payment.amount) !== expectedAmount ||
      payment.currency !== 'INR'
    ) {
      return res.status(400).json({ verified: false, error: 'Payment details do not match the expected order.' });
    }

    if (payment.status !== 'captured') {
      return res.status(400).json({
        verified: false,
        error: `Payment has not been captured. Current status: ${payment.status}`,
      });
    }

    // If this payment was saved earlier, retry inventory processing safely.
    if (order.payment_status === 'paid') {
      if (order.payment_id === razorpay_payment_id) {
        const { data: stockResult, error: stockError } = await supabaseAdmin.rpc(
          'deduct_order_stock', { p_order_id: order.id }
        );
        if (stockError) {
          console.error('Inventory processing error for already-paid order:', stockError);
          return res.status(500).json({
            verified: true, orderSaved: true, stockDeducted: false,
            orderNumber: order.order_number,
            error: 'Payment is saved, but inventory processing failed. Do not pay again; contact support.',
          });
        }
        if (!stockResult?.success) {
          console.error('Inventory processing rejected for already-paid order:', stockResult);
          return res.status(409).json({
            verified: true, orderSaved: true, stockDeducted: false,
            orderNumber: order.order_number,
            error: stockResult?.message || 'Payment is saved, but inventory could not be processed. Contact support.',
          });
        }
        return res.json({
          verified: true, orderSaved: true, stockDeducted: true,
          alreadyProcessed: Boolean(stockResult.already_processed),
          orderNumber: order.order_number,
          message: 'Payment was already verified; inventory is confirmed processed.',
        });
      }
      return res.status(409).json({ verified: false, error: 'This order has already been paid with a different payment.' });
    }

    if (order.payment_status !== 'pending') {
      return res.status(409).json({ verified: false, error: 'This order is not pending payment.' });
    }

    const { data: savedOrder, error: updateError } = await supabaseAdmin
      .from('orders')
      .update({
        payment_status: 'paid',
        payment_id: razorpay_payment_id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', order.id)
      .eq('user_id', req.customer.id)
      .eq('payment_status', 'pending')
      .select('id, order_number, payment_status, payment_id')
      .maybeSingle();

    if (updateError) {
      console.error('Supabase order update error:', updateError);
      return res.status(500).json({
        verified: true,
        orderSaved: false,
        error: 'Payment was verified, but the order status could not be saved. Contact support before retrying payment.',
      });
    }

    if (!savedOrder) {
      // Another request may have completed the update concurrently; recheck safely.
      const { data: latestOrder, error: lookupError } = await supabaseAdmin
        .from('orders')
        .select('order_number, payment_status, payment_id')
        .eq('id', order.id)
        .eq('user_id', req.customer.id)
        .maybeSingle();

      if (lookupError) throw lookupError;
      if (latestOrder?.payment_status === 'paid' && latestOrder?.payment_id === razorpay_payment_id) {
        const { data: stockResult, error: stockError } = await supabaseAdmin.rpc(
          'deduct_order_stock', { p_order_id: order.id }
        );
        if (stockError || !stockResult?.success) {
          console.error('Inventory processing error after concurrent payment update:', stockError || stockResult);
          return res.status(500).json({
            verified: true, orderSaved: true, stockDeducted: false,
            orderNumber: latestOrder.order_number,
            error: 'Payment is saved, but inventory processing failed. Do not pay again; contact support.',
          });
        }
        return res.json({
          verified: true, orderSaved: true, stockDeducted: true,
          orderNumber: latestOrder.order_number,
          alreadyProcessed: Boolean(stockResult.already_processed),
        });
      }
      return res.status(409).json({ verified: true, orderSaved: false, error: 'Payment was verified but the order was not updated.' });
    }

    // Deduct stock only after the payment has been verified and saved as paid.
    const { data: stockResult, error: stockError } = await supabaseAdmin.rpc(
      'deduct_order_stock', { p_order_id: savedOrder.id }
    );

    if (stockError) {
      console.error('Inventory processing error after payment:', stockError);
      return res.status(500).json({
        verified: true, orderSaved: true, stockDeducted: false,
        orderNumber: savedOrder.order_number,
        error: 'Payment was captured and saved, but inventory processing failed. Do not pay again; contact support.',
      });
    }

    if (!stockResult?.success) {
      console.error('Inventory processing rejected after payment:', stockResult);
      return res.status(409).json({
        verified: true, orderSaved: true, stockDeducted: false,
        orderNumber: savedOrder.order_number,
        error: stockResult?.message || 'Payment was captured and saved, but inventory could not be processed. Contact support.',
      });
    }

    return res.json({
      verified: true,
      orderSaved: true,
      stockDeducted: true,
      alreadyProcessed: Boolean(stockResult.already_processed),
      orderNumber: savedOrder.order_number,
      message: 'Payment verified, order saved, and inventory processed successfully.',
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    return res.status(500).json({
      verified: false,
      orderSaved: false,
      error: 'Unable to complete payment verification and order update.',
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Payment server running on port ${PORT}`);
});
