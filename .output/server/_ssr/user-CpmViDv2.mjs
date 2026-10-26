import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-DJxlXwXN.mjs";
import { n as getUserRole, t as getDashboardPath } from "./auth-w09b0sOZ.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user-CpmViDv2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UserDashboard() {
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)("");
	const [checking, setChecking] = (0, import_react.useState)(true);
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
				if (role !== "customer") {
					await navigate({
						to: getDashboardPath(role),
						replace: true
					});
					return;
				}
				const { data: { user } } = await supabase.auth.getUser();
				if (active) setName(user?.user_metadata?.["full_name"] ?? "Customer");
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
	async function logout() {
		await supabase.auth.signOut();
		await navigate({
			to: "/login",
			replace: true
		});
	}
	if (checking) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "p-8",
		children: "Checking your account..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background p-6 md:p-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-wrap items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					className: "text-sm text-primary hover:underline",
					children: "Shop Groceries"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-3 text-3xl font-bold",
					children: [
						"Hello, ",
						name,
						"!"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: "Welcome to your customer dashboard."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: logout,
				className: "rounded-lg border border-input px-4 py-2",
				children: "Sign out"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/shop",
					className: "rounded-xl border border-border bg-card p-6 hover:border-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-semibold",
						children: "Shop groceries"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Browse products and discover recommendations."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-border bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-semibold",
						children: "My orders"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Order history will be connected to PostgreSQL in a later step."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-border bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-semibold",
						children: "My recommendations"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Your personalised shopping experience will be integrated here."
					})]
				})
			]
		})]
	});
}
//#endregion
export { UserDashboard as component };
