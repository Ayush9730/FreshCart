import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ShoppingBasket,
  Sparkles,
  X,
  Plus,
  Minus,
  Clock,
  Brain,
  RotateCcw,
  Receipt,
  History,
  Printer,
  CreditCard,
  CheckCircle2,
  Loader2,
  Search,
  Leaf,
  ShieldCheck,
  ArrowRight,
  PackageCheck,
} from "lucide-react";
import { CATEGORIES, type Product } from "@/lib/catalog";
import { fetchProducts } from "@/lib/products";
import { supabase } from "@/lib/supabase";

declare global {
  interface Window {
    Razorpay: any;
  }
}

import {
  CLUSTER,
  classifyUse,
  recommendForYou,
  recommendSimilar,
  segment,
  timeOfDayUse,
  userProfile,
  type Behaviour,
  type Recommendation,
} from "@/lib/recommender";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "FreshCart — Smart Grocery Recommendations" },
      {
        name: "description",
        content:
          "Pick any product and get similar items by features, price, clustering and your daily habits.",
      },
      {
        property: "og:title",
        content: "FreshCart — Smart Grocery Recommendations",
      },
      {
        property: "og:description",
        content:
          "Similar products by features, price, clustering and your daily habits.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const EMPTY: Behaviour = {
  views: {},
  carts: {},
  basketHistory: [],
};

const KEY = "freshcart-behaviour";
const BILLS_KEY = "freshcart-bills";

type BillItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  amount: number;
};

type Bill = {
  id: string;
  date: string;
  items: BillItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentStatus?: "UNPAID" | "PAID";
  paymentId?: string;
  razorpayOrderId?: string;
};

const TIMES = [
  { label: "Morning", hour: 8 },
  { label: "Afternoon", hour: 13 },
  { label: "Evening", hour: 17 },
  { label: "Night", hour: 21 },
];

function Index() {
  const [b, setB] = useState<Behaviour>(EMPTY);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [selected, setSelected] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [cat, setCat] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hour, setHour] = useState(12);
  const [showCart, setShowCart] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [bills, setBills] = useState<Bill[]>([]);
  const [generatedBill, setGeneratedBill] = useState<Bill | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        setProductsLoading(true);
        setProductsError(null);
        const result = await fetchProducts();
        if (!cancelled) setProducts(result);
      } catch (error) {
        if (!cancelled) {
          setProductsError(
            error instanceof Error
              ? error.message
              : "Unable to load products."
          );
        }
      } finally {
        if (!cancelled) setProductsLoading(false);
      }
    }

    void loadProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setHour(new Date().getHours());

    try {
      const s = localStorage.getItem(KEY);
      if (s) setB(JSON.parse(s));

      const savedBills = localStorage.getItem(BILLS_KEY);
      if (savedBills) setBills(JSON.parse(savedBills));
    } catch {
      /* ignore */
    }
  }, []);

  const productsById = useMemo(
    () =>
      new Map<number, Product>(
        products.map((product) => [product.id, product] as const)
      ),
    [products]
  );

  const save = (nb: Behaviour) => {
    setB(nb);
    localStorage.setItem(KEY, JSON.stringify(nb));
  };

  const open = (p: Product) => {
    setSelected(p);

    save({
      ...b,
      views: {
        ...b.views,
        [p.id]: (b.views[p.id] || 0) + 1,
      },
    });
  };

  const addToCart = (p: Product) => {
    setCart((c) => ({
      ...c,
      [p.id]: (c[p.id] || 0) + 1,
    }));

    save({
      ...b,
      carts: {
        ...b.carts,
        [p.id]: (b.carts[p.id] || 0) + 1,
      },
    });
  };

  const changeQty = (id: number, d: number) =>
    setCart((c) => {
      const n = {
        ...c,
        [id]: (c[id] || 0) + d,
      };

      if ((n[id] ?? 0) <= 0) delete n[id];

      return n;
    });

  const generateBill = () => {
    const entries = Object.entries(cart);

    if (!entries.length) return;

    const items: BillItem[] = [];

    for (const [id, quantity] of entries) {
      const p = productsById.get(Number(id));
      if (!p) {
        alert(
          "One or more cart products could not be found. Please refresh the shop and try again."
        );
        return;
      }

      if (!Number.isInteger(quantity) || quantity <= 0 || quantity > 100) {
        alert("Each item quantity must be between 1 and 100.");
        return;
      }

      items.push({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity,
        amount: p.price * quantity,
      });
    }

    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const tax = Math.round(subtotal * 0.05 * 100) / 100;

    const bill: Bill = {
      id: `BILL-${Date.now()}`,
      date: new Date().toLocaleString("en-IN"),
      items,
      subtotal,
      tax,
      total: Math.round((subtotal + tax) * 100) / 100,
      paymentStatus: "UNPAID",
    };

    const updatedBills = [bill, ...bills];
    setBills(updatedBills);
    localStorage.setItem(BILLS_KEY, JSON.stringify(updatedBills));
    setGeneratedBill(bill);

    const ids = entries.map(([id]) => Number(id));
    save({
      ...b,
      basketHistory: [...b.basketHistory, ids],
    });
  };

  const updateBill = (updatedBill: Bill) => {
    const updatedBills = bills.map((bill) =>
      bill.id === updatedBill.id ? updatedBill : bill
    );

    setBills(updatedBills);
    localStorage.setItem(BILLS_KEY, JSON.stringify(updatedBills));
    setGeneratedBill(updatedBill);
  };

  const loadRazorpay = () =>
    new Promise<boolean>((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const API_URL = (
    import.meta.env["VITE_API_URL"] || "http://localhost:5000"
  ).replace(/\/+$/, "");

  const payBill = async (bill: Bill) => {
    if (paymentLoading || bill.paymentStatus === "PAID") return;

    setPaymentLoading(true);
    let checkoutOpened = false;

    try {
      // Obtain a current Supabase session. The access token is sent only to
      // our backend, which independently verifies the customer and order.
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        throw new Error(`Unable to verify your login: ${sessionError.message}`);
      }

      if (!session?.user || !session.access_token) {
        throw new Error(
          "Please log in to your FreshCart account before paying."
        );
      }

      if (
        !bill.items.length ||
        !Number.isFinite(bill.total) ||
        bill.total <= 0
      ) {
        throw new Error("This bill has no valid items or total.");
      }

      // Every item must carry the numeric Supabase product ID and quantity.
      for (const item of bill.items) {
        if (
          !Number.isInteger(Number(item.id)) ||
          Number(item.id) <= 0 ||
          !Number.isInteger(Number(item.quantity)) ||
          Number(item.quantity) <= 0 ||
          Number(item.quantity) > 100
        ) {
          throw new Error(
            "This bill contains an invalid product or quantity. Generate a new bill and try again."
          );
        }
      }

      const authHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      };

      // Check whether this customer's receipt already exists.
      const { data: existingOrder, error: lookupError } = await supabase
        .from("orders")
        .select("id, payment_status, order_status")
        .eq("order_number", bill.id)
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (lookupError) {
        throw new Error(`Unable to check your order: ${lookupError.message}`);
      }

      if (existingOrder?.payment_status === "paid") {
        updateBill({ ...bill, paymentStatus: "PAID" });
        alert("This order has already been paid.");
        return;
      }

      if (
        existingOrder &&
        (existingOrder.payment_status !== "pending" ||
          existingOrder.order_status !== "placed")
      ) {
        throw new Error(
          "This order is not in a payable state. Please contact support if you believe this is an error."
        );
      }

      // Create the pending record before requesting a Razorpay order.
      // Never insert a paid order from the browser.
      if (!existingOrder) {
        const { error: insertError } = await supabase.from("orders").insert({
          user_id: session.user.id,
          order_number: bill.id,
          items: bill.items.map((item) => ({
            id: Number(item.id),
            name: item.name,
            price: item.price,
            quantity: Number(item.quantity),
            amount: item.price * item.quantity,
          })),
          subtotal: bill.subtotal,
          tax: bill.tax,
          total: bill.total,
          payment_status: "pending",
          order_status: "placed",
        });

        if (insertError) {
          // A concurrent retry may have inserted the same receipt. Re-read
          // it rather than creating a duplicate.
          const { data: retryOrder, error: retryError } = await supabase
            .from("orders")
            .select("id, payment_status, order_status")
            .eq("order_number", bill.id)
            .eq("user_id", session.user.id)
            .maybeSingle();

          if (retryError || !retryOrder) {
            throw new Error(
              `Unable to save your pending order: ${insertError.message}`
            );
          }

          if (
            retryOrder.payment_status !== "pending" ||
            retryOrder.order_status !== "placed"
          ) {
            throw new Error("This order is not available for payment.");
          }
        }
      }

      const loaded = await loadRazorpay();
      if (!loaded) {
        throw new Error(
          "Unable to load Razorpay Checkout. Check your internet connection."
        );
      }

      // The backend re-prices products from Supabase. Do not send a client
      // amount: the receipt and authenticated session are the only inputs.
      const orderResponse = await fetch(`${API_URL}/api/create-order`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ receipt: bill.id }),
      });

      const orderData = await orderResponse.json().catch(() => ({}));

      if (!orderResponse.ok) {
        throw new Error(
          orderData.error || `Unable to create payment order (${orderResponse.status}).`
        );
      }

      if (
        !orderData.id ||
        !orderData.keyId ||
        !Number.isFinite(Number(orderData.amount)) ||
        Number(orderData.amount) <= 0
      ) {
        throw new Error("The backend returned an invalid Razorpay order.");
      }

      const serverTotal = Number(orderData.total);
      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: Number(orderData.amount),
        currency: orderData.currency || "INR",
        name: "FreshCart",
        description: `Payment for ${bill.id}`,
        order_id: orderData.id,
        prefill: {
          email: session.user.email || "",
        },
        notes: {
          receipt: bill.id,
        },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verifyResponse = await fetch(
              `${API_URL}/api/verify-payment`,
              {
                method: "POST",
                headers: authHeaders,
                body: JSON.stringify(response),
              }
            );

            const verifyData = await verifyResponse.json().catch(() => ({}));

            if (
              !verifyResponse.ok ||
              verifyData.verified !== true ||
              verifyData.orderSaved !== true
            ) {
              throw new Error(
                verifyData.error ||
                  "The backend could not confirm the payment and saved order. Do not pay again yet; check your Bills history or contact support."
              );
            }

            // Use the server-calculated total after verified payment so the
            // local receipt reflects the database's authoritative price.
            const updatedItems: BillItem[] = Array.isArray(orderData.items)
              ? orderData.items.map((item: any) => ({
                  id: Number(item.id),
                  name: String(item.name),
                  price: Number(item.price),
                  quantity: Number(item.quantity),
                  amount:
                    Math.round(
                      Number(item.price) * Number(item.quantity) * 100
                    ) / 100,
                }))
              : bill.items;

            updateBill({
              ...bill,
              items: updatedItems,
              subtotal: Number.isFinite(Number(orderData.subtotal))
                ? Number(orderData.subtotal)
                : bill.subtotal,
              tax: Number.isFinite(Number(orderData.tax))
                ? Number(orderData.tax)
                : bill.tax,
              total: Number.isFinite(serverTotal) ? serverTotal : bill.total,
              paymentStatus: "PAID",
              paymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
            });

            alert(
              "Payment successful! The backend verified the payment and confirmed the order was saved."
            );
          } catch (error) {
            alert(
              error instanceof Error
                ? error.message
                : "Payment verification failed. Check your Bills history before retrying."
            );
          } finally {
            setPaymentLoading(false);
          }
        },
        modal: {
          ondismiss: () => setPaymentLoading(false),
        },
        theme: { color: "#2f855a" },
      });

      razorpay.on(
        "payment.failed",
        (response: { error?: { description?: string } }) => {
          alert(
            response.error?.description || "Payment failed. Please try again."
          );
          setPaymentLoading(false);
        }
      );

      razorpay.open();
      checkoutOpened = true;
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Unable to start payment."
      );
    } finally {
      if (!checkoutOpened) setPaymentLoading(false);
    }
  };

  const clearCartAfterBill = () => {
    setCart({});
  };

  const printBill = (bill: Bill) => {
    const rows = bill.items
      .map(
        (item) =>
          `<tr><td>${item.name}</td><td>${item.quantity}</td><td>₹${item.price}</td><td>₹${item.amount}</td></tr>`
      )
      .join("");

    const printWindow = window.open("", "_blank", "width=700,height=800");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>${bill.id}</title>
          <style>
            body{font-family:Arial,sans-serif;padding:32px;color:#222}
            h1{text-align:center}
            .meta{margin-bottom:20px;color:#555}
            table{width:100%;border-collapse:collapse}
            th,td{padding:10px;border-bottom:1px solid #ddd;text-align:left}
            .total{text-align:right;margin-top:20px;font-size:18px;line-height:1.8}
          </style>
        </head>
        <body>
          <h1>FreshCart</h1>
          <div class="meta"><b>Bill:</b> ${bill.id}<br/><b>Date:</b> ${bill.date}</div>
          <table>
            <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Amount</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
          <div class="total">
            Subtotal: ₹${bill.subtotal.toFixed(2)}<br/>
            Tax (5%): ₹${bill.tax.toFixed(2)}<br/>
            <b>Total: ₹${bill.total.toFixed(2)}</b>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const visible = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = cat === "All" || product.category === cat;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [products, cat, searchQuery]);

  const forYou = useMemo(() => recommendForYou(b, hour), [b, hour]);

  const similar = useMemo(
    () => (selected ? recommendSimilar(selected, b, hour) : []),
    [selected, b, hour]
  );

  const profile = useMemo(() => userProfile(b), [b]);

  const cartCount = Object.values(cart).reduce((a, n) => a + n, 0);

  const cartTotal = Object.entries(cart).reduce((sum, [id, quantity]) => {
    const product = productsById.get(Number(id));
    return sum + (product ? product.price * quantity : 0);
  }, 0);

  const topCats = Object.entries(profile.categoryAffinity)
    .sort((a, c) => c[1] - a[1])
    .slice(0, 3);

  const nowUse = timeOfDayUse(hour);

  return (
    <div className="min-h-screen font-sans">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="/shop" className="flex min-w-0 items-center gap-3" aria-label="FreshCart home">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <ShoppingBasket className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">FreshCart<span className="text-primary">.</span></span>
              <span className="hidden text-[11px] font-medium tracking-wide text-muted-foreground sm:block">SMARTER EVERYDAY SHOPPING</span>
            </span>
          </a>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => setShowHistory(true)}
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-semibold transition hover:border-primary/30 hover:bg-secondary"
            >
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">Bills</span>
              {bills.length > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1.5 text-xs">{bills.length}</span>
              )}
            </button>
            <button
              onClick={() => setShowCart(true)}
              className="relative flex items-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition hover:opacity-90 sm:px-4"
            >
              <ShoppingBasket className="h-4 w-4" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs text-accent-foreground">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <section className="relative mt-5 overflow-hidden rounded-[2rem] bg-hero text-primary-foreground shadow-soft sm:mt-7">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[36px] border-primary-foreground/10" />
          <div className="pointer-events-none absolute -bottom-24 right-1/4 h-56 w-56 rounded-full bg-primary-foreground/5 blur-2xl" />
          <div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[1.4fr_0.8fr] lg:items-end lg:p-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 text-xs font-semibold tracking-wide">
                <Sparkles className="h-3.5 w-3.5" /> YOUR PERSONAL GROCERY ASSISTANT
              </span>
              <h2 className="mt-5 max-w-xl font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Good food. Great picks. <span className="text-accent">Made for you.</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-primary-foreground/80 sm:text-base">
                Discover everyday essentials and smart recommendations shaped by your shopping habits, product features and the time of day.
              </p>
              <button
                onClick={() => document.getElementById("freshcart-products")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-foreground px-5 py-3 text-sm font-bold text-primary shadow-sm transition hover:-translate-y-0.5"
              >
                Explore groceries <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-4 backdrop-blur sm:p-5">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <Clock className="h-4 w-4" /> Shop for your moment
              </p>
              <p className="mt-1 text-xs text-primary-foreground/70">Choose a time to tailor your recommendations.</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {TIMES.map((t) => {
                  const active = hour === t.hour;
                  return (
                    <button
                      key={t.label}
                      onClick={() => setHour(t.hour)}
                      aria-pressed={active}
                      className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                        active
                          ? "bg-accent text-accent-foreground shadow-sm"
                          : "bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="relative grid grid-cols-3 border-t border-primary-foreground/15 bg-primary-foreground/5">
            <div className="flex items-center justify-center gap-2 px-2 py-3 text-xs font-medium sm:text-sm"><Leaf className="h-4 w-4" /> Everyday essentials</div>
            <div className="flex items-center justify-center gap-2 border-x border-primary-foreground/15 px-2 py-3 text-xs font-medium sm:text-sm"><Brain className="h-4 w-4" /> Smart suggestions</div>
            <div className="flex items-center justify-center gap-2 px-2 py-3 text-xs font-medium sm:text-sm"><ShieldCheck className="h-4 w-4" /> Secure checkout</div>
          </div>
        </section>

        <section className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          <Stat
            label="Your top categories"
            value={
              topCats.length
                ? topCats.map(([c]) => c).join(", ")
                : "Browse to teach me"
            }
          />
          <Stat
            label="Your usual spend per item"
            value={profile.avgPrice ? `₹${Math.round(profile.avgPrice)}` : "—"}
          />
          <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
            <div>
              <p className="text-xs text-muted-foreground">Activity learned</p>
              <p className="font-semibold">
                {Object.keys(b.views).length} viewed · {b.basketHistory.length}{" "}
                orders
              </p>
            </div>
            <button
              onClick={() => save(EMPTY)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Picked for you</p>
              <h3 className="mt-1 flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                <Sparkles className="h-5 w-5 text-accent" /> Recommended for you
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Smart picks based on your habits and what suits {nowUse === "home" ? "your home" : nowUse} right now.
              </p>
            </div>
            <span className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground">
              {forYou.length} suggestions
            </span>
          </div>
          {forYou.length > 0 ? (
            <div className="mt-4 flex gap-4 overflow-x-auto pb-3">
              {forYou.map((r) => (
                <MiniCard key={r.product.id} r={r} onOpen={open} />
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-border p-5 text-sm text-muted-foreground">
              Browse a few products and add items to your cart to build personalized recommendations.
            </div>
          )}
        </section>

        <section id="freshcart-products" className="mt-10 scroll-mt-24">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">The FreshCart market</p>
              <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">Shop all groceries</h3>
              <p className="mt-1 text-sm text-muted-foreground">Find your favourites, then add them to your basket.</p>
            </div>
            <div className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground">
              {productsLoading ? "Loading…" : `${visible.length} products`}
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-border bg-card p-3 shadow-sm sm:p-4">
            <label htmlFor="freshcart-search" className="sr-only">Search products or categories</label>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-3.5 py-3 transition focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/10">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                id="freshcart-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search milk, apples, snacks…"
                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery("")} className="rounded-lg px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground">
                  Clear
                </button>
              )}
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {["All", ...CATEGORIES].map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  aria-pressed={cat === c}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    cat === c
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {searchQuery.trim() ? <>Results for <span className="font-semibold text-foreground">“{searchQuery.trim()}”</span></> : cat === "All" ? "Browse the full collection" : <>Browsing <span className="font-semibold text-foreground">{cat}</span></>}
            </p>
            {(searchQuery.trim() || cat !== "All") && (
              <button onClick={() => { setSearchQuery(""); setCat("All"); }} className="text-sm font-semibold text-primary hover:underline">
                Clear filters
              </button>
            )}
          </div>

          {productsLoading && (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="animate-pulse rounded-2xl border border-border bg-card p-3">
                  <div className="aspect-square rounded-xl bg-muted" />
                  <div className="mt-4 h-3 w-3/4 rounded bg-muted" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-muted" />
                  <div className="mt-4 h-9 rounded-xl bg-muted" />
                </div>
              ))}
            </div>
          )}
          {!productsLoading && productsError && (
            <div className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-5 text-sm" role="alert">
              <p className="font-bold">Products could not be loaded.</p>
              <p className="mt-1">{productsError}</p>
              <p className="mt-1 text-muted-foreground">Check your Supabase connection and the products table, then refresh this page.</p>
            </div>
          )}
          {!productsLoading && !productsError && visible.length === 0 && (
            <div className="mt-6 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
              <Search className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-3 font-bold">No products found</p>
              <p className="mt-1 text-sm text-muted-foreground">Try another product name or choose a different category.</p>
              <button onClick={() => { setSearchQuery(""); setCat("All"); }} className="mt-4 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground">
                Clear search and filters
              </button>
            </div>
          )}
          {!productsLoading && !productsError && visible.length > 0 && (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
              {visible.map((p) => (
                <article
                  key={p.id}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card p-3 transition duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:p-4"
                >
                  <button onClick={() => open(p)} className="block w-full text-left" aria-label={`View ${p.name} details`}>
                    <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-muted/60 p-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-contain transition duration-300 group-hover:scale-110"
                      />
                      <span className="absolute left-2 top-2 max-w-[80%] truncate rounded-full border border-border/60 bg-background/90 px-2 py-1 text-[10px] font-bold text-muted-foreground backdrop-blur">
                        {p.category}
                      </span>
                    </div>
                    <p className="mt-3 line-clamp-2 min-h-10 font-semibold leading-5 text-foreground">{p.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{segment(p.price)}</p>
                  </button>
                  <div className="mt-auto flex items-end justify-between gap-2 pt-3">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Price</p>
                      <span className="font-display text-lg font-extrabold text-primary">₹{p.price}</span>
                    </div>
                    <button
                      onClick={() => addToCart(p)}
                      aria-label={`Add ${p.name} to cart`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition hover:bg-primary hover:text-primary-foreground"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <PackageCheck className="h-4 w-4" /> Fresh picks for your everyday needs
          </div>
        </section>
      </main>

      {selected && (
        <Drawer onClose={() => setSelected(null)}>
          <div className="flex gap-4">
            <img
              src={selected.image}
              alt={selected.name}
              className="h-28 w-28 rounded-2xl bg-muted object-contain p-2"
            />
            <div>
              <h3 className="font-display text-3xl font-bold">
                {selected.name}
              </h3>
              <p className="font-display text-xl text-primary">
                ₹{selected.price}
              </p>
              <div className="mt-2 flex flex-wrap gap-1 text-xs">
                <Tag>{selected.category}</Tag>
                <Tag>{segment(selected.price)}</Tag>
                <Tag>Cluster #{(CLUSTER.get(selected.id) ?? 0) + 1}</Tag>
                <Tag>Used for: {classifyUse(selected)}</Tag>
                {selected.healthy && <Tag>Healthy</Tag>}
                {selected.sweet && <Tag>Sweet</Tag>}
              </div>
              <button
                onClick={() => addToCart(selected)}
                className="mt-3 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Add to cart
              </button>
            </div>
          </div>

          <h4 className="mt-8 flex items-center gap-2 font-display text-xl font-bold">
            <Sparkles className="h-4 w-4 text-accent" />
            Similar products
          </h4>
          <p className="text-sm text-muted-foreground">
            Matched on features, price, cluster and your habits.
          </p>
          <div className="mt-4 space-y-3">
            {similar.map((r) => (
              <div
                key={r.product.id}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
              >
                <button onClick={() => open(r.product)}>
                  <img
                    src={r.product.image}
                    alt={r.product.name}
                    className="h-16 w-16 rounded-xl bg-muted object-contain p-1"
                  />
                </button>
                <div className="min-w-0 flex-1">
                  <button
                    onClick={() => open(r.product)}
                    className="font-semibold hover:underline"
                  >
                    {r.product.name}
                  </button>
                  <p className="text-xs text-muted-foreground">
                    ₹{r.product.price} ·{" "}
                    {r.reasons.join(" · ") || "Similar features"}
                  </p>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{
                        width: `${Math.min(100, r.score * 100)}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-sm font-bold text-primary">
                  {Math.round(r.score * 100)}%
                </span>
                <button
                  onClick={() => addToCart(r.product)}
                  aria-label="Add"
                  className="rounded-full bg-secondary p-2"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </Drawer>
      )}

      {showCart && (
        <Drawer onClose={() => setShowCart(false)}>
          <h3 className="font-display text-3xl font-bold">Your cart</h3>
          {cartCount === 0 ? (
            <p className="mt-4 text-muted-foreground">Your cart is empty.</p>
          ) : (
            <>
              <div className="mt-4 space-y-3">
                {Object.entries(cart).map(([id, n]) => {
                  const p = productsById.get(Number(id));
                  if (!p) return null;
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-12 w-12 object-contain"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{p.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ₹{p.price}
                        </p>
                      </div>
                      <button
                        onClick={() => changeQty(p.id, -1)}
                        className="rounded-full bg-secondary p-1"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center">{n}</span>
                      <button
                        onClick={() => changeQty(p.id, 1)}
                        className="rounded-full bg-secondary p-1"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-primary" />
                  <h4 className="font-display text-xl font-bold">
                    Bill Details
                  </h4>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Items</span>
                    <span>{cartCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>₹{(cartTotal * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="mt-2 flex justify-between border-t border-border pt-3 text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      ₹{(cartTotal * 1.05).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={generateBill}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
                >
                  <Receipt className="h-4 w-4" />
                  Generate Bill
                </button>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  The generated bill is saved in Bill History.
                </p>
              </div>

              {generatedBill && (
                <div className="mt-5 rounded-2xl border border-primary/30 bg-secondary/30 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Generated successfully
                      </p>
                      <h4 className="font-display text-xl font-bold">
                        {generatedBill.id}
                      </h4>
                    </div>
                    <button
                      onClick={() => printBill(generatedBill)}
                      className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold"
                    >
                      <Printer className="h-4 w-4" />
                      Print
                    </button>
                  </div>

                  <div className="mt-4 space-y-2 text-sm">
                    {generatedBill.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between"
                      >
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span>₹{item.amount.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t border-border pt-3 font-bold">
                      <div className="flex justify-between">
                        <span>Total</span>
                        <span>₹{generatedBill.total.toFixed(2)}</span>
                      </div>
                      <div className="mt-2 flex justify-between text-sm font-normal">
                        <span>Payment</span>
                        <span
                          className={
                            generatedBill.paymentStatus === "PAID"
                              ? "font-semibold text-green-600"
                              : "font-semibold text-amber-600"
                          }
                        >
                          {generatedBill.paymentStatus ?? "UNPAID"}
                        </span>
                      </div>
                      {generatedBill.paymentId && (
                        <p className="mt-2 break-all text-xs font-normal text-muted-foreground">
                          Payment ID: {generatedBill.paymentId}
                        </p>
                      )}
                    </div>
                  </div>

                  {generatedBill.paymentStatus !== "PAID" ? (
                    <button
                      onClick={() => payBill(generatedBill)}
                      disabled={paymentLoading}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground disabled:opacity-60"
                    >
                      {paymentLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CreditCard className="h-4 w-4" />
                      )}
                      {paymentLoading
                        ? "Opening Payment..."
                        : `Pay ₹${generatedBill.total.toFixed(2)}`}
                    </button>
                  ) : (
                    <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                      <CheckCircle2 className="h-4 w-4" />
                      Payment completed
                    </div>
                  )}
                  <button
                    onClick={clearCartAfterBill}
                    className="mt-3 w-full rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
              <p className="mt-2 text-xs text-muted-foreground">
                Orders teach the system which items you buy together.
              </p>
            </>
          )}
        </Drawer>
      )}

      {showHistory && (
        <Drawer onClose={() => setShowHistory(false)}>
          <div className="flex items-center gap-2">
            <History className="h-6 w-6 text-primary" />
            <h3 className="font-display text-3xl font-bold">Bill History</h3>
          </div>
          {bills.length === 0 ? (
            <p className="mt-6 text-muted-foreground">
              No bills have been generated yet.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {bills.map((bill) => (
                <div
                  key={bill.id}
                  className="rounded-2xl border border-border bg-card p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{bill.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {bill.date}
                      </p>
                    </div>
                    <span className="font-bold text-primary">
                      ₹{bill.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-3 space-y-1 text-sm">
                    {bill.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between"
                      >
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span>₹{item.amount.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        bill.paymentStatus === "PAID"
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {bill.paymentStatus ?? "UNPAID"}
                    </span>
                    {bill.paymentStatus !== "PAID" && (
                      <button
                        onClick={() => payBill(bill)}
                        disabled={paymentLoading}
                        className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground disabled:opacity-60"
                      >
                        <CreditCard className="h-4 w-4" />
                        Pay Now
                      </button>
                    )}
                    <button
                      onClick={() => printBill(bill)}
                      className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
                    >
                      <Printer className="h-4 w-4" />
                      Print Bill
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Drawer>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/25 hover:shadow-md">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 break-words font-display text-lg font-bold text-foreground">{value}</p>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">
      {children}
    </span>
  );
}

function MiniCard({
  r,
  onOpen,
}: {
  r: Recommendation;
  onOpen: (p: Product) => void;
}) {
  return (
    <button
      onClick={() => onOpen(r.product)}
      className="w-44 shrink-0 rounded-2xl border border-border bg-card p-3 text-left transition duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
    >
      <img
        src={r.product.image}
        alt={r.product.name}
        className="h-28 w-full rounded-xl bg-muted/40 object-contain p-2"
      />
      <p className="mt-3 line-clamp-2 min-h-10 font-semibold leading-5">{r.product.name}</p>
      <p className="text-sm text-primary">₹{r.product.price}</p>
      <p className="truncate text-xs text-muted-foreground">
        {r.reasons[0] || r.product.category}
      </p>
    </button>
  );
}

function Drawer({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-40 flex justify-end bg-foreground/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="h-full w-full max-w-xl overflow-y-auto border-l border-border bg-background p-5 shadow-2xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="float-right rounded-full bg-muted p-2"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}
