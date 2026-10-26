
import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { getUserRole } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
});

type Category =
  | "Fruits"
  | "Vegetables"
  | "Dairy"
  | "Bakery"
  | "Beverages"
  | "Snacks"
  | "Breakfast"
  | "Instant Food"
  | "Personal Care"
  | "Cleaning";

type MealTime = "breakfast" | "snack" | "meal" | "home";

type Product = {
  id: number;
  name: string;
  image: string;
  category: Category;
  price: number;
  healthy: boolean;
  sweet: boolean;
  ready_to_eat: boolean;
  daily_essential: boolean;
  perishable: boolean;
  meal_time: MealTime;
  stock_quantity: number;
  is_available: boolean;
};

type ProductForm = {
  name: string;
  image: string;
  category: Category;
  price: string;
  healthy: boolean;
  sweet: boolean;
  ready_to_eat: boolean;
  daily_essential: boolean;
  perishable: boolean;
  meal_time: MealTime;
  stock_quantity: string;
  is_available: boolean;
};

const CATEGORIES: Category[] = [
  "Fruits",
  "Vegetables",
  "Dairy",
  "Bakery",
  "Beverages",
  "Snacks",
  "Breakfast",
  "Instant Food",
  "Personal Care",
  "Cleaning",
];

const EMPTY_FORM: ProductForm = {
  name: "",
  image: "",
  category: "Fruits",
  price: "",
  healthy: false,
  sweet: false,
  ready_to_eat: false,
  daily_essential: false,
  perishable: false,
  meal_time: "home",
  stock_quantity: "0",
  is_available: true,
};

function AdminDashboard() {
  const navigate = useNavigate();

  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [email, setEmail] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);

  useEffect(() => {
    let active = true;

    async function checkAccess() {
      try {
        const role = await getUserRole();

        if (!active) return;

        if (!role) {
          await navigate({ to: "/login", replace: true });
          return;
        }

        if (role !== "admin") {
          await navigate({ to: "/user", replace: true });
          return;
        }

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;

        if (active) {
          setEmail(user?.email ?? "");
          setAuthorized(true);
        }
      } catch {
        if (active) {
          await navigate({ to: "/login", replace: true });
        }
      } finally {
        if (active) setChecking(false);
      }
    }

    void checkAccess();

    return () => {
      active = false;
    };
  }, [navigate]);

  const loadProducts = useCallback(async () => {
    setLoadingProducts(true);
    setError("");

    try {
      const { data, error: queryError } = await supabase
        .from("products")
        .select(
          "id, name, image, category, price, healthy, sweet, ready_to_eat, daily_essential, perishable, meal_time, stock_quantity, is_available"
        )
        .order("id", { ascending: true });

      if (queryError) throw queryError;

      setProducts((data ?? []) as Product[]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load products from Supabase."
      );
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    if (authorized) void loadProducts();
  }, [authorized, loadProducts]);

  async function logout() {
    await supabase.auth.signOut();
    await navigate({ to: "/login", replace: true });
  }

  function startAdd() {
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
    setError("");
    setNotice("");
    setShowForm(true);
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      image: product.image,
      category: product.category,
      price: String(product.price),
      healthy: product.healthy,
      sweet: product.sweet,
      ready_to_eat: product.ready_to_eat,
      daily_essential: product.daily_essential,
      perishable: product.perishable,
      meal_time: product.meal_time,
      stock_quantity: String(product.stock_quantity),
      is_available: product.is_available,
    });
    setError("");
    setNotice("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
  }

  function updateForm<K extends keyof ProductForm>(
    key: K,
    value: ProductForm[K]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function saveProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    const price = Number(form.price);
    const stock = Number(form.stock_quantity);

    if (!form.name.trim()) {
      setError("Please enter a product name.");
      return;
    }

    if (!Number.isFinite(price) || price < 0) {
      setError("Enter a valid, non-negative price.");
      return;
    }

    if (!Number.isInteger(stock) || stock < 0) {
      setError("Stock quantity must be a non-negative whole number.");
      return;
    }

    setSaving(true);

    const payload = {
      name: form.name.trim(),
      image: form.image.trim() || "/images/placeholder.png",
      category: form.category,
      price,
      healthy: form.healthy,
      sweet: form.sweet,
      ready_to_eat: form.ready_to_eat,
      daily_essential: form.daily_essential,
      perishable: form.perishable,
      meal_time: form.meal_time,
      stock_quantity: stock,
      is_available: form.is_available,
      updated_at: new Date().toISOString(),
    };

    try {
      if (editingId !== null) {
        const { error: updateError } = await supabase
          .from("products")
          .update(payload)
          .eq("id", editingId);

        if (updateError) throw updateError;

        setNotice("Product updated successfully.");
      } else {
        const { error: insertError } = await supabase
          .from("products")
          .insert(payload);

        if (insertError) throw insertError;

        setNotice("Product added successfully.");
      }

      closeForm();
      await loadProducts();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save the product."
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleAvailability(product: Product) {
    setError("");
    setNotice("");

    const nextAvailability = !product.is_available;

    const { error: updateError } = await supabase
      .from("products")
      .update({
        is_available: nextAvailability,
        updated_at: new Date().toISOString(),
      })
      .eq("id", product.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setNotice(
      nextAvailability
        ? `${product.name} is now available.`
        : `${product.name} has been marked unavailable.`
    );

    await loadProducts();
  }

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        String(product.id).includes(term);

      const matchesCategory =
        categoryFilter === "All" ||
        product.category === categoryFilter;

      const matchesAvailability =
        availabilityFilter === "All" ||
        (availabilityFilter === "Available" && product.is_available) ||
        (availabilityFilter === "Unavailable" && !product.is_available);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAvailability
      );
    });
  }, [products, search, categoryFilter, availabilityFilter]);

  const availableCount = products.filter(
    (product) => product.is_available
  ).length;

  const unavailableCount = products.length - availableCount;

  const lowStockCount = products.filter(
    (product) => product.is_available && product.stock_quantity <= 5
  ).length;

  if (checking) {
    return (
      <main className="p-8">
        Verifying administrator access...
      </main>
    );
  }

  if (!authorized) return null;

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-primary">
            FreshCart Administration
          </p>
          <h1 className="mt-2 text-3xl font-bold">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Signed in as {email}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/shop"
            className="rounded-lg border border-input px-4 py-2 text-sm hover:bg-secondary"
          >
            View Shop
          </Link>
          <button
            onClick={logout}
            className="rounded-lg border border-input px-4 py-2 text-sm hover:bg-secondary"
          >
            Sign out
          </button>
        </div>
      </header>

      {error && (
        <div
          role="alert"
          className="mt-5 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800"
        >
          {error}
        </div>
      )}

      {notice && (
        <div
          role="status"
          className="mt-5 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-800"
        >
          {notice}
        </div>
      )}

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total products" value={products.length} />
        <StatCard label="Available" value={availableCount} />
        <StatCard label="Unavailable" value={unavailableCount} />
        <StatCard label="Low stock (5 or less)" value={lowStockCount} />
      </section>

      <section className="mt-8 rounded-xl border border-border bg-card p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">Product Management</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage catalogue details, stock and availability.
            </p>
          </div>

          <button
            onClick={startAdd}
            className="rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:opacity-90"
          >
            + Add Product
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={saveProduct}
            className="mt-6 rounded-xl border border-border bg-background p-4 md:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-semibold">
                {editingId !== null ? "Edit Product" : "Add New Product"}
              </h3>
              {editingId !== null && (
                <span className="text-sm text-muted-foreground">
                  Product ID: {editingId}
                </span>
              )}
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Product name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                  placeholder="e.g. Fresh Apples"
                  className={inputClass}
                />
              </Field>

              <Field label="Image path or URL">
                <input
                  value={form.image}
                  onChange={(e) => updateForm("image", e.target.value)}
                  placeholder="/images/apples.png"
                  className={inputClass}
                />
              </Field>

              <Field label="Category">
                <select
                  value={form.category}
                  onChange={(e) =>
                    updateForm("category", e.target.value as Category)
                  }
                  className={inputClass}
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Price (₹)">
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => updateForm("price", e.target.value)}
                  placeholder="100.00"
                  className={inputClass}
                />
              </Field>

              <Field label="Stock quantity">
                <input
                  required
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock_quantity}
                  onChange={(e) =>
                    updateForm("stock_quantity", e.target.value)
                  }
                  className={inputClass}
                />
              </Field>

              <Field label="Best suited for">
                <select
                  value={form.meal_time}
                  onChange={(e) =>
                    updateForm("meal_time", e.target.value as MealTime)
                  }
                  className={inputClass}
                >
                  <option value="home">Home / General</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="snack">Snack</option>
                  <option value="meal">Meal</option>
                </select>
              </Field>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <ToggleField
                label="Healthy"
                checked={form.healthy}
                onChange={(value) => updateForm("healthy", value)}
              />
              <ToggleField
                label="Sweet"
                checked={form.sweet}
                onChange={(value) => updateForm("sweet", value)}
              />
              <ToggleField
                label="Ready to eat"
                checked={form.ready_to_eat}
                onChange={(value) => updateForm("ready_to_eat", value)}
              />
              <ToggleField
                label="Daily essential"
                checked={form.daily_essential}
                onChange={(value) => updateForm("daily_essential", value)}
              />
              <ToggleField
                label="Perishable"
                checked={form.perishable}
                onChange={(value) => updateForm("perishable", value)}
              />
              <ToggleField
                label="Available for customers"
                checked={form.is_available}
                onChange={(value) => updateForm("is_available", value)}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-primary px-5 py-2 font-semibold text-primary-foreground disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingId !== null
                    ? "Save Changes"
                    : "Add Product"}
              </button>

              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="rounded-lg border border-input px-5 py-2 hover:bg-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <Field label="Search products">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or ID..."
              className={inputClass}
            />
          </Field>

          <Field label="Filter by category">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={inputClass}
            >
              <option value="All">All categories</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Availability">
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className={inputClass}
            >
              <option value="All">All products</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </Field>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>

          <button
            onClick={() => void loadProducts()}
            disabled={loadingProducts}
            className="rounded-lg border border-input px-3 py-2 text-sm hover:bg-secondary disabled:opacity-60"
          >
            {loadingProducts ? "Refreshing..." : "Refresh products"}
          </button>
        </div>

        {loadingProducts ? (
          <p className="py-10 text-center text-muted-foreground">
            Loading products from Supabase...
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="py-10 text-center text-muted-foreground">
            No products match your filters.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-secondary/60">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Availability</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t border-border"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-12 w-12 rounded-lg bg-muted object-contain p-1"
                          onError={(e) => {
                            e.currentTarget.style.visibility = "hidden";
                          }}
                        />
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            ID: {product.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-3">{product.category}</td>

                    <td className="p-3 font-semibold">
                      ₹{Number(product.price).toFixed(2)}
                    </td>

                    <td className="p-3">
                      <span
                        className={
                          product.stock_quantity <= 5
                            ? "font-semibold text-red-600"
                            : ""
                        }
                      >
                        {product.stock_quantity}
                      </span>
                    </td>

                    <td className="p-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          product.is_available
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {product.is_available ? "Available" : "Unavailable"}
                      </span>
                    </td>

                    <td className="p-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => startEdit(product)}
                          className="rounded-md border border-input px-3 py-1.5 hover:bg-secondary"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => void toggleAvailability(product)}
                          className="rounded-md border border-input px-3 py-1.5 hover:bg-secondary"
                        >
                          {product.is_available ? "Disable" : "Enable"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-lg font-semibold">Orders</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Customer order storage and order management are the next stage.
          </p>
        </article>

        <article className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-lg font-semibold">Analytics</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sales analytics can be added once orders are stored in Supabase.
          </p>
        </article>
      </section>

      <div className="mt-6">
        <Link to="/user" className="text-primary hover:underline">
          ← Back to customer dashboard
        </Link>
      </div>
    </main>
  );
}

const inputClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border p-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-primary"
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <article className="rounded-xl border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </article>
  );
}
