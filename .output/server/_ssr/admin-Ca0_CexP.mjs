import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-DJxlXwXN.mjs";
import { n as getUserRole } from "./auth-w09b0sOZ.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-Ca0_CexP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	"Fruits",
	"Vegetables",
	"Dairy",
	"Bakery",
	"Beverages",
	"Snacks",
	"Breakfast",
	"Instant Food",
	"Personal Care",
	"Cleaning"
];
var EMPTY_FORM = {
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
	is_available: true
};
function AdminDashboard() {
	const navigate = useNavigate();
	const [checking, setChecking] = (0, import_react.useState)(true);
	const [authorized, setAuthorized] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [products, setProducts] = (0, import_react.useState)([]);
	const [loadingProducts, setLoadingProducts] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [notice, setNotice] = (0, import_react.useState)("");
	const [search, setSearch] = (0, import_react.useState)("");
	const [categoryFilter, setCategoryFilter] = (0, import_react.useState)("All");
	const [availabilityFilter, setAvailabilityFilter] = (0, import_react.useState)("All");
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [showForm, setShowForm] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	(0, import_react.useEffect)(() => {
		let active = true;
		async function checkAccess() {
			try {
				const role = await getUserRole();
				if (!active) return;
				if (!role) {
					await navigate({
						to: "/login",
						replace: true
					});
					return;
				}
				if (role !== "admin") {
					await navigate({
						to: "/user",
						replace: true
					});
					return;
				}
				const { data: { user }, error: userError } = await supabase.auth.getUser();
				if (userError) throw userError;
				if (active) {
					setEmail(user?.email ?? "");
					setAuthorized(true);
				}
			} catch {
				if (active) await navigate({
					to: "/login",
					replace: true
				});
			} finally {
				if (active) setChecking(false);
			}
		}
		checkAccess();
		return () => {
			active = false;
		};
	}, [navigate]);
	const loadProducts = (0, import_react.useCallback)(async () => {
		setLoadingProducts(true);
		setError("");
		try {
			const { data, error: queryError } = await supabase.from("products").select("id, name, image, category, price, healthy, sweet, ready_to_eat, daily_essential, perishable, meal_time, stock_quantity, is_available").order("id", { ascending: true });
			if (queryError) throw queryError;
			setProducts(data ?? []);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unable to load products from Supabase.");
		} finally {
			setLoadingProducts(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (authorized) loadProducts();
	}, [authorized, loadProducts]);
	async function logout() {
		await supabase.auth.signOut();
		await navigate({
			to: "/login",
			replace: true
		});
	}
	function startAdd() {
		setEditingId(null);
		setForm({ ...EMPTY_FORM });
		setError("");
		setNotice("");
		setShowForm(true);
	}
	function startEdit(product) {
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
			is_available: product.is_available
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
	function updateForm(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	async function saveProduct(event) {
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
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		};
		try {
			if (editingId !== null) {
				const { error: updateError } = await supabase.from("products").update(payload).eq("id", editingId);
				if (updateError) throw updateError;
				setNotice("Product updated successfully.");
			} else {
				const { error: insertError } = await supabase.from("products").insert(payload);
				if (insertError) throw insertError;
				setNotice("Product added successfully.");
			}
			closeForm();
			await loadProducts();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unable to save the product.");
		} finally {
			setSaving(false);
		}
	}
	async function toggleAvailability(product) {
		setError("");
		setNotice("");
		const nextAvailability = !product.is_available;
		const { error: updateError } = await supabase.from("products").update({
			is_available: nextAvailability,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", product.id);
		if (updateError) {
			setError(updateError.message);
			return;
		}
		setNotice(nextAvailability ? `${product.name} is now available.` : `${product.name} has been marked unavailable.`);
		await loadProducts();
	}
	const filteredProducts = (0, import_react.useMemo)(() => {
		const term = search.trim().toLowerCase();
		return products.filter((product) => {
			const matchesSearch = !term || product.name.toLowerCase().includes(term) || String(product.id).includes(term);
			const matchesCategory = categoryFilter === "All" || product.category === categoryFilter;
			const matchesAvailability = availabilityFilter === "All" || availabilityFilter === "Available" && product.is_available || availabilityFilter === "Unavailable" && !product.is_available;
			return matchesSearch && matchesCategory && matchesAvailability;
		});
	}, [
		products,
		search,
		categoryFilter,
		availabilityFilter
	]);
	const availableCount = products.filter((product) => product.is_available).length;
	const unavailableCount = products.length - availableCount;
	const lowStockCount = products.filter((product) => product.is_available && product.stock_quantity <= 5).length;
	if (checking) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "p-8",
		children: "Verifying administrator access..."
	});
	if (!authorized) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background p-4 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-primary",
						children: "FreshCart Administration"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 text-3xl font-bold",
						children: "Admin Dashboard"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: ["Signed in as ", email]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "rounded-lg border border-input px-4 py-2 text-sm hover:bg-secondary",
						children: "View Shop"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: logout,
						className: "rounded-lg border border-input px-4 py-2 text-sm hover:bg-secondary",
						children: "Sign out"
					})]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "alert",
				className: "mt-5 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800",
				children: error
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "status",
				className: "mt-5 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-800",
				children: notice
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total products",
						value: products.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Available",
						value: availableCount
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Unavailable",
						value: unavailableCount
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Low stock (5 or less)",
						value: lowStockCount
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 rounded-xl border border-border bg-card p-4 md:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold",
							children: "Product Management"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Manage catalogue details, stock and availability."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: startAdd,
							className: "rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:opacity-90",
							children: "+ Add Product"
						})]
					}),
					showForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: saveProduct,
						className: "mt-6 rounded-xl border border-border bg-background p-4 md:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-semibold",
									children: editingId !== null ? "Edit Product" : "Add New Product"
								}), editingId !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm text-muted-foreground",
									children: ["Product ID: ", editingId]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 grid gap-4 md:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Product name",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											required: true,
											value: form.name,
											onChange: (e) => updateForm("name", e.target.value),
											placeholder: "e.g. Fresh Apples",
											className: inputClass
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Image path or URL",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: form.image,
											onChange: (e) => updateForm("image", e.target.value),
											placeholder: "/images/apples.png",
											className: inputClass
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Category",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											value: form.category,
											onChange: (e) => updateForm("category", e.target.value),
											className: inputClass,
											children: CATEGORIES.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: category,
												children: category
											}, category))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Price (₹)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											required: true,
											type: "number",
											min: "0",
											step: "0.01",
											value: form.price,
											onChange: (e) => updateForm("price", e.target.value),
											placeholder: "100.00",
											className: inputClass
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Stock quantity",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											required: true,
											type: "number",
											min: "0",
											step: "1",
											value: form.stock_quantity,
											onChange: (e) => updateForm("stock_quantity", e.target.value),
											className: inputClass
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Best suited for",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: form.meal_time,
											onChange: (e) => updateForm("meal_time", e.target.value),
											className: inputClass,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "home",
													children: "Home / General"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "breakfast",
													children: "Breakfast"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "snack",
													children: "Snack"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "meal",
													children: "Meal"
												})
											]
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleField, {
										label: "Healthy",
										checked: form.healthy,
										onChange: (value) => updateForm("healthy", value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleField, {
										label: "Sweet",
										checked: form.sweet,
										onChange: (value) => updateForm("sweet", value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleField, {
										label: "Ready to eat",
										checked: form.ready_to_eat,
										onChange: (value) => updateForm("ready_to_eat", value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleField, {
										label: "Daily essential",
										checked: form.daily_essential,
										onChange: (value) => updateForm("daily_essential", value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleField, {
										label: "Perishable",
										checked: form.perishable,
										onChange: (value) => updateForm("perishable", value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleField, {
										label: "Available for customers",
										checked: form.is_available,
										onChange: (value) => updateForm("is_available", value)
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: saving,
									className: "rounded-lg bg-primary px-5 py-2 font-semibold text-primary-foreground disabled:opacity-60",
									children: saving ? "Saving..." : editingId !== null ? "Save Changes" : "Add Product"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: closeForm,
									disabled: saving,
									className: "rounded-lg border border-input px-5 py-2 hover:bg-secondary",
									children: "Cancel"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-3 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Search products",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: search,
									onChange: (e) => setSearch(e.target.value),
									placeholder: "Search by name or ID...",
									className: inputClass
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Filter by category",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: categoryFilter,
									onChange: (e) => setCategoryFilter(e.target.value),
									className: inputClass,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "All",
										children: "All categories"
									}), CATEGORIES.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: category,
										children: category
									}, category))]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Availability",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: availabilityFilter,
									onChange: (e) => setAvailabilityFilter(e.target.value),
									className: inputClass,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "All",
											children: "All products"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Available",
											children: "Available"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Unavailable",
											children: "Unavailable"
										})
									]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								"Showing ",
								filteredProducts.length,
								" of ",
								products.length,
								" products"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => void loadProducts(),
							disabled: loadingProducts,
							className: "rounded-lg border border-input px-3 py-2 text-sm hover:bg-secondary disabled:opacity-60",
							children: loadingProducts ? "Refreshing..." : "Refresh products"
						})]
					}),
					loadingProducts ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-10 text-center text-muted-foreground",
						children: "Loading products from Supabase..."
					}) : filteredProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-10 text-center text-muted-foreground",
						children: "No products match your filters."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 overflow-x-auto rounded-lg border border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[850px] text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-secondary/60",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Product"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Category"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Price"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Stock"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Availability"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Actions"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filteredProducts.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: product.image,
												alt: product.name,
												className: "h-12 w-12 rounded-lg bg-muted object-contain p-1",
												onError: (e) => {
													e.currentTarget.style.visibility = "hidden";
												}
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold",
												children: product.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground",
												children: ["ID: ", product.id]
											})] })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3",
										children: product.category
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-3 font-semibold",
										children: ["₹", Number(product.price).toFixed(2)]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: product.stock_quantity <= 5 ? "font-semibold text-red-600" : "",
											children: product.stock_quantity
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded-full px-2 py-1 text-xs font-semibold ${product.is_available ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"}`,
											children: product.is_available ? "Available" : "Unavailable"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => startEdit(product),
												className: "rounded-md border border-input px-3 py-1.5 hover:bg-secondary",
												children: "Edit"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => void toggleAvailability(product),
												className: "rounded-md border border-input px-3 py-1.5 hover:bg-secondary",
												children: product.is_available ? "Disable" : "Enable"
											})]
										})
									})
								]
							}, product.id)) })]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-border bg-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Orders"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Customer order storage and order management are the next stage."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-border bg-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Analytics"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Sales analytics can be added once orders are stored in Supabase."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/user",
					className: "text-primary hover:underline",
					children: "← Back to customer dashboard"
				})
			})
		]
	});
}
var inputClass = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30";
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium",
			children: label
		}), children]
	});
}
function ToggleField({ label, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex cursor-pointer items-center gap-2 rounded-lg border border-border p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "checkbox",
			checked,
			onChange: (e) => onChange(e.target.checked),
			className: "h-4 w-4 accent-primary"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm",
			children: label
		})]
	});
}
function StatCard({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl border border-border bg-card p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-3xl font-bold",
			children: value
		})]
	});
}
//#endregion
export { AdminDashboard as component };
