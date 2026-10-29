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
    () => new Map<number, Product>(
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
        alert("One or more cart products could not be found. Please refresh the shop and try again.");
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

    const subtotal = items.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const tax = Math.round(subtotal * 0.05 * 100) / 100;

    const bill: Bill = {
      id: `BILL-${Date.now()}`,
      date: new Date().toLocaleString("en-IN"),
      items,
      subtotal,
      tax,
      total: subtotal + tax,
      paymentStatus: "UNPAID",
    };

    const updatedBills = [bill, ...bills];

    setBills(updatedBills);

    localStorage.setItem(
      BILLS_KEY,
      JSON.stringify(updatedBills)
    );

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

    localStorage.setItem(
      BILLS_KEY,
      JSON.stringify(updatedBills)
    );

    setGeneratedBill(updatedBill);
  };

  const loadRazorpay = () =>
    new Promise<boolean>((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");

      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });

  /*
   * Backend API URL
   *
   * Local development:
   * VITE_API_URL=http://localhost:5000
   *
   * Production/Vercel:
   * VITE_API_URL=https://YOUR-RENDER-BACKEND.onrender.com
   */
  const API_URL =
    import.meta.env["VITE_API_URL"] || "http://localhost:5000";

  const payBill = async (bill: Bill) => {
    if (paymentLoading || bill.paymentStatus === "PAID") return;

    setPaymentLoading(true);
    let checkoutOpened = false;

    try {
      // Ensure the order belongs to a currently signed-in customer.
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error(
          "Please log in to your FreshCart account before paying."
        );
      }

      if (!bill.items.length || !Number.isFinite(bill.total) || bill.total <= 0) {
        throw new Error("This bill has no valid items or total.");
      }

      // Check whether this bill already exists for this customer.
      const { data: existingOrder, error: lookupError } = await supabase
        .from("orders")
        .select("id, payment_status")
        .eq("order_number", bill.id)
        .eq("user_id", user.id)
        .maybeSingle();

      if (lookupError) {
        throw new Error(`Unable to check your order: ${lookupError.message}`);
      }

      if (existingOrder?.payment_status === "paid") {
        updateBill({ ...bill, paymentStatus: "PAID" });
        alert("This order has already been paid.");
        return;
      }

      // Save the pending order before opening Razorpay Checkout.
      if (!existingOrder) {
        const { error: insertError } = await supabase.from("orders").insert({
          user_id: user.id,
          order_number: bill.id,
          items: bill.items,
          subtotal: bill.subtotal,
          tax: bill.tax,
          total: bill.total,
          payment_status: "pending",
          order_status: "placed",
        });

        if (insertError) {
          throw new Error(`Unable to save your order: ${insertError.message}`);
        }
      }

      const loaded = await loadRazorpay();

      if (!loaded) {
        throw new Error(
          "Unable to load Razorpay Checkout. Check your internet connection."
        );
      }

      // Create the Razorpay order through the backend.
      const orderResponse = await fetch(`${API_URL}/api/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: bill.total, receipt: bill.id }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error || "Unable to create payment order.");
      }

      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "FreshCart",
        description: `Payment for ${bill.id}`,
        order_id: orderData.id,
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verifyResponse = await fetch(`${API_URL}/api/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok || !verifyData.verified) {
              throw new Error(
                verifyData.error || "Payment verification failed."
              );
            }

            // The backend must confirm the Supabase order is marked paid.
            if (verifyData.orderSaved !== true) {
              throw new Error(
                "Payment verification succeeded, but the order's paid status could not be confirmed in the database. Please contact support before trying to pay again."
              );
            }

            updateBill({
              ...bill,
              paymentStatus: "PAID",
              paymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
            });

            alert(
              "Payment successful! Your order has been saved and marked as paid."
            );
          } catch (error) {
            alert(
              error instanceof Error
                ? error.message
                : "Payment verification failed."
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

    const printWindow = window.open(
      "",
      "_blank",
      "width=700,height=800"
    );

    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>${bill.id}</title>

          <style>
            body{
              font-family:Arial,sans-serif;
              padding:32px;
              color:#222
            }

            h1{
              text-align:center
            }

            .meta{
              margin-bottom:20px;
              color:#555
            }

            table{
              width:100%;
              border-collapse:collapse
            }

            th,td{
              padding:10px;
              border-bottom:1px solid #ddd;
              text-align:left
            }

            .total{
              text-align:right;
              margin-top:20px;
              font-size:18px;
              line-height:1.8
            }
          </style>
        </head>

        <body>
          <h1>FreshCart</h1>

          <div class="meta">
            <b>Bill:</b> ${bill.id}<br/>
            <b>Date:</b> ${bill.date}
          </div>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              ${rows}
            </tbody>
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
    return products.filter((p) => {
      const matchesCategory = cat === "All" || p.category === cat;
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [products, cat, searchQuery]);

  const categoryCards = [
    { name: "All", emoji: "🛒", description: "Everything you need" },
    { name: "Fruits", emoji: "🍎", description: "Fresh and juicy" },
    { name: "Vegetables", emoji: "🥦", description: "Fresh from the farm" },
    { name: "Dairy", emoji: "🥛", description: "Everyday essentials" },
    { name: "Bakery", emoji: "🍞", description: "Freshly baked" },
    { name: "Beverages", emoji: "🥤", description: "Sip something good" },
    { name: "Snacks", emoji: "🍿", description: "Little treats" },
    { name: "Breakfast", emoji: "🥣", description: "Start your day right" },
    { name: "Instant Food", emoji: "🍜", description: "Quick and easy meals" },
    { name: "Personal Care", emoji: "🧴", description: "Care for yourself" },
    { name: "Cleaning", emoji: "🧽", description: "A cleaner home" },
  ].filter((item) => item.name === "All" || CATEGORIES.includes(item.name as (typeof CATEGORIES)[number]));

  const forYou = useMemo(
    () => recommendForYou(b, hour),
    [b, hour]
  );

  const similar = useMemo(
    () =>
      selected
        ? recommendSimilar(
            selected,
            b,
            hour
          )
        : [],
    [selected, b, hour]
  );

  const profile = useMemo(
    () => userProfile(b),
    [b]
  );

  const cartCount = Object.values(cart).reduce(
    (a, n) => a + n,
    0
  );

  const cartTotal = Object.entries(cart).reduce((sum, [id, quantity]) => {
    const product = productsById.get(Number(id));
    return sum + (product ? product.price * quantity : 0);
  }, 0);

  const topCats = Object.entries(
    profile.categoryAffinity
  )
    .sort((a, c) => c[1] - a[1])
    .slice(0, 3);

  const nowUse = timeOfDayUse(hour);

  return (
    <div className="min-h-screen font-sans">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="font-display text-2xl font-bold text-primary">
            FreshCart
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistory(true)}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-secondary"
            >
              <History className="h-4 w-4" />

              Bills

              {bills.length > 0 && (
                <span className="rounded-full bg-secondary px-2 text-xs">
                  {bills.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setShowCart(true)}
              className="relative flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              <ShoppingBasket className="h-4 w-4" />

              Cart

              {cartCount > 0 && (
                <span className="rounded-full bg-accent px-2 text-xs text-accent-foreground">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-20">
        <style>{`
          @keyframes freshcart-float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-12px) rotate(5deg); } }
          @keyframes freshcart-glow { 0%, 100% { opacity: .18; transform: scale(1); } 50% { opacity: .32; transform: scale(1.08); } }
          .freshcart-hero { position: relative; isolation: isolate; overflow: hidden; background-size: 200% 200%; animation: freshcart-glow 7s ease-in-out infinite; }
          .freshcart-hero-content { position: relative; z-index: 1; }
          .freshcart-orb { position: absolute; border-radius: 9999px; background: rgba(255,255,255,.13); pointer-events: none; }
          .freshcart-leaf { position: absolute; right: 10%; top: 18%; font-size: 3.5rem; opacity: .22; animation: freshcart-float 5s ease-in-out infinite; pointer-events: none; }
          .freshcart-category { transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
          .freshcart-category:hover { transform: translateY(-3px); }
          @media (prefers-reduced-motion: reduce) { .freshcart-hero, .freshcart-leaf { animation: none; } .freshcart-category { transition: none; } }
        `}</style>
        <section className="freshcart-hero bg-hero relative mt-6 rounded-3xl p-6 text-primary-foreground shadow-soft sm:p-8 lg:p-10">
          <div className="freshcart-orb -right-12 -top-16 h-56 w-56" />
          <div className="freshcart-orb -bottom-24 right-1/3 h-48 w-48" />
          <div className="freshcart-leaf" aria-hidden="true">🌿</div>
          <div className="freshcart-hero-content">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="flex items-center gap-2 text-sm opacity-80">
                <Brain className="h-4 w-4" />
                Smart recommendations
              </p>

              <h2 className="mt-2 font-display text-4xl font-bold leading-tight">
                Pick a product. We'll find its best matches.
              </h2>

              <p className="mt-3 opacity-80">
                Uses product features, price, clustering,
                classification, your shopping habits and the
                time of day.
              </p>
            </div>

            <div className="rounded-2xl bg-primary-foreground/10 p-4 text-sm">
              <p className="mb-2 flex items-center gap-2 opacity-80">
                <Clock className="h-4 w-4" />
                Time of day
              </p>

              <div className="flex gap-1">
                {TIMES.map((t) => (
                  <button
                    key={t.label}
                    onClick={() =>
                      setHour(t.hour)
                    }
                    className={`rounded-full px-3 py-1 ${
                      timeOfDayUse(t.hour) ===
                        nowUse &&
                      Math.abs(t.hour - hour) < 4
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary-foreground/10"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <Stat
            label="Your top categories"
            value={
              topCats.length
                ? topCats
                    .map(([c]) => c)
                    .join(", ")
                : "Browse to teach me"
            }
          />

          <Stat
            label="Your usual spend per item"
            value={
              profile.avgPrice
                ? `₹${Math.round(
                    profile.avgPrice
                  )}`
                : "—"
            }
          />

          <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
            <div>
              <p className="text-xs text-muted-foreground">
                Activity learned
              </p>

              <p className="font-semibold">
                {Object.keys(b.views).length} viewed ·{" "}
                {b.basketHistory.length} orders
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
          <h3 className="flex items-center gap-2 font-display text-2xl font-bold">
            <Sparkles className="h-5 w-5 text-accent" />
            Recommended for you
          </h3>

          <p className="text-sm text-muted-foreground">
            Based on your habits and what people need for{" "}
            {nowUse === "home" ? "home" : nowUse} right now.
          </p>

          <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
            {forYou.map((r) => (
              <MiniCard
                key={r.product.id}
                r={r}
                onOpen={open}
              />
            ))}
          </div>
        </section>

        <section className="mt-10" id="product-catalogue">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Explore FreshCart</p>
              <h3 className="mt-1 font-display text-2xl font-bold sm:text-3xl">Find your everyday favourites</h3>
              <p className="mt-1 text-sm text-muted-foreground">Search products or choose a category to get started.</p>
            </div>
            <p className="text-sm text-muted-foreground">{visible.length} {visible.length === 1 ? "product" : "products"} found</p>
          </div>

          <label className="mb-5 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by product or category..."
              aria-label="Search products by name or category"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery("")} className="rounded-full p-1 text-muted-foreground hover:bg-secondary" aria-label="Clear search">
                <X className="h-4 w-4" />
              </button>
            )}
          </label>

          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {categoryCards.map((item) => {
              const count = item.name === "All" ? products.length : products.filter((p) => p.category === item.name).length;
              const active = cat === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setCat(item.name)}
                  aria-pressed={active}
                  className={`freshcart-category rounded-2xl border p-4 text-left ${active ? "border-primary bg-primary/10 ring-2 ring-primary/20" : "border-border bg-card hover:border-primary/50 hover:shadow-soft"}`}
                >
                  <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-2xl" aria-hidden="true">{item.emoji}</span>
                  <span className="block text-sm font-bold">{item.name}</span>
                  <span className="mt-1 block min-h-8 text-xs text-muted-foreground">{item.description}</span>
                  <span className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${active ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{count} items</span>
                </button>
              );
            })}
          </div>

          {productsLoading && (
            <p className="mt-6 text-sm text-muted-foreground" role="status">
              Loading products from FreshCart...
            </p>
          )}

          {!productsLoading && productsError && (
            <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm" role="alert">
              <p className="font-semibold">Products could not be loaded.</p>
              <p className="mt-1">{productsError}</p>
              <p className="mt-1 text-muted-foreground">
                Check your Supabase connection and the products table, then refresh this page.
              </p>
            </div>
          )}

          {!productsLoading && !productsError && visible.length === 0 && (
            <div className="mt-6 rounded-3xl border border-dashed border-border bg-card px-6 py-12 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-3xl" aria-hidden="true">🔎</span>
              <h4 className="mt-4 text-lg font-bold">We couldn’t find a match</h4>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">Try another product name or category, or reset your filters to see the full FreshCart catalogue.</p>
              <button
                type="button"
                onClick={() => { setSearchQuery(""); setCat("All"); }}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <RotateCcw className="h-4 w-4" /> Reset search and filters
              </button>
            </div>
          )}

          {!productsLoading && !productsError && visible.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {visible.map((p) => (
              <div
                key={p.id}
                className="group rounded-2xl border border-border bg-card p-3 transition hover:shadow-soft"
              >
                <button
                  onClick={() => open(p)}
                  className="block w-full text-left"
                >
                  <div className="aspect-square overflow-hidden rounded-xl bg-muted">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-contain p-3 transition group-hover:scale-105"
                    />
                  </div>

                  <p className="mt-2 font-semibold">
                    {p.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {p.category} · {segment(p.price)}
                  </p>
                </button>

                <div className="mt-2 flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-primary">
                    ₹{p.price}
                  </span>

                  <button
                    onClick={() => addToCart(p)}
                    aria-label={`Add ${p.name}`}
                    className="rounded-full bg-secondary p-2 text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          )}
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
                <Tag>
                  Cluster #
                  {(CLUSTER.get(selected.id) ?? 0) + 1}
                </Tag>
                <Tag>
                  Used for: {classifyUse(selected)}
                </Tag>

                {selected.healthy && (
                  <Tag>Healthy</Tag>
                )}

                {selected.sweet && (
                  <Tag>Sweet</Tag>
                )}
              </div>

              <button
                onClick={() =>
                  addToCart(selected)
                }
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
            Matched on features, price, cluster and your
            habits.
          </p>

          <div className="mt-4 space-y-3">
            {similar.map((r) => (
              <div
                key={r.product.id}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
              >
                <button
                  onClick={() =>
                    open(r.product)
                  }
                >
                  <img
                    src={r.product.image}
                    alt={r.product.name}
                    className="h-16 w-16 rounded-xl bg-muted object-contain p-1"
                  />
                </button>

                <div className="min-w-0 flex-1">
                  <button
                    onClick={() =>
                      open(r.product)
                    }
                    className="font-semibold hover:underline"
                  >
                    {r.product.name}
                  </button>

                  <p className="text-xs text-muted-foreground">
                    ₹{r.product.price} ·{" "}
                    {r.reasons.join(" · ") ||
                      "Similar features"}
                  </p>

                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{
                        width: `${Math.min(
                          100,
                          r.score * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <span className="text-sm font-bold text-primary">
                  {Math.round(r.score * 100)}%
                </span>

                <button
                  onClick={() =>
                    addToCart(r.product)
                  }
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
          <h3 className="font-display text-3xl font-bold">
            Your cart
          </h3>

          {cartCount === 0 ? (
            <p className="mt-4 text-muted-foreground">
              Your cart is empty.
            </p>
          ) : (
            <>
              <div className="mt-4 space-y-3">
                {Object.entries(cart).map(
                  ([id, n]) => {
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
                          <p className="font-semibold">
                            {p.name}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            ₹{p.price}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            changeQty(p.id, -1)
                          }
                          className="rounded-full bg-secondary p-1"
                        >
                          <Minus className="h-3 w-3" />
                        </button>

                        <span className="w-6 text-center">
                          {n}
                        </span>

                        <button
                          onClick={() =>
                            changeQty(p.id, 1)
                          }
                          className="rounded-full bg-secondary p-1"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  }
                )}
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
                    <span>
                      ₹{cartTotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>
                      ₹{(cartTotal * 0.05).toFixed(2)}
                    </span>
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
                      onClick={() =>
                        printBill(generatedBill)
                      }
                      className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold"
                    >
                      <Printer className="h-4 w-4" />
                      Print
                    </button>
                  </div>

                  <div className="mt-4 space-y-2 text-sm">
                    {generatedBill.items.map(
                      (item) => (
                        <div
                          key={item.id}
                          className="flex justify-between"
                        >
                          <span>
                            {item.name} ×{" "}
                            {item.quantity}
                          </span>

                          <span>
                            ₹{item.amount.toFixed(2)}
                          </span>
                        </div>
                      )
                    )}

                    <div className="border-t border-border pt-3 font-bold">
                      <div className="flex justify-between">
                        <span>Total</span>

                        <span>
                          ₹
                          {generatedBill.total.toFixed(
                            2
                          )}
                        </span>
                      </div>

                      <div className="mt-2 flex justify-between text-sm font-normal">
                        <span>Payment</span>

                        <span
                          className={
                            generatedBill.paymentStatus ===
                            "PAID"
                              ? "font-semibold text-green-600"
                              : "font-semibold text-amber-600"
                          }
                        >
                          {generatedBill.paymentStatus ??
                            "UNPAID"}
                        </span>
                      </div>

                      {generatedBill.paymentId && (
                        <p className="mt-2 break-all text-xs font-normal text-muted-foreground">
                          Payment ID:{" "}
                          {generatedBill.paymentId}
                        </p>
                      )}
                    </div>
                  </div>

                  {generatedBill.paymentStatus !==
                  "PAID" ? (
                    <button
                      onClick={() =>
                        payBill(generatedBill)
                      }
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
                        : `Pay ₹${generatedBill.total.toFixed(
                            2
                          )}`}
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
                Orders teach the system which items you buy
                together.
              </p>
            </>
          )}
        </Drawer>
      )}

      {showHistory && (
        <Drawer onClose={() => setShowHistory(false)}>
          <div className="flex items-center gap-2">
            <History className="h-6 w-6 text-primary" />

            <h3 className="font-display text-3xl font-bold">
              Bill History
            </h3>
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
                      <p className="font-semibold">
                        {bill.id}
                      </p>

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
                          {item.name} ×{" "}
                          {item.quantity}
                        </span>

                        <span>
                          ₹{item.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        bill.paymentStatus ===
                        "PAID"
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {bill.paymentStatus ??
                        "UNPAID"}
                    </span>

                    {bill.paymentStatus !==
                      "PAID" && (
                      <button
                        onClick={() =>
                          payBill(bill)
                        }
                        disabled={paymentLoading}
                        className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground disabled:opacity-60"
                      >
                        <CreditCard className="h-4 w-4" />
                        Pay Now
                      </button>
                    )}

                    <button
                      onClick={() =>
                        printBill(bill)
                      }
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
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="font-semibold">{value}</p>
    </div>
  );
}

function Tag({
  children,
}: {
  children: React.ReactNode;
}) {
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
      className="w-40 shrink-0 rounded-2xl border border-border bg-card p-3 text-left hover:shadow-soft"
    >
      <img
        src={r.product.image}
        alt={r.product.name}
        className="h-24 w-full object-contain"
      />

      <p className="mt-2 font-semibold">
        {r.product.name}
      </p>

      <p className="text-sm text-primary">
        ₹{r.product.price}
      </p>

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
      className="fixed inset-0 z-40 flex justify-end bg-foreground/30"
      onClick={onClose}
    >
      <div
        className="h-full w-full max-w-xl overflow-y-auto bg-background p-6 shadow-soft"
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