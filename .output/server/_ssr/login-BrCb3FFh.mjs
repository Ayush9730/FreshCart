import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-DJxlXwXN.mjs";
import { n as getUserRole, t as getDashboardPath } from "./auth-w09b0sOZ.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BrCb3FFh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [checkingSession, setCheckingSession] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let active = true;
		async function checkSession() {
			try {
				const { data: { session } } = await supabase.auth.getSession();
				if (!active) return;
				if (session) {
					const role = await getUserRole();
					if (active && role) {
						await navigate({
							to: getDashboardPath(role),
							replace: true
						});
						return;
					}
				}
			} catch {
				if (active) setError("Unable to load your account. Please try again.");
			} finally {
				if (active) setCheckingSession(false);
			}
		}
		checkSession();
		return () => {
			active = false;
		};
	}, [navigate]);
	async function handleLogin(e) {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const { error: loginError } = await supabase.auth.signInWithPassword({
				email: email.trim(),
				password
			});
			if (loginError) throw loginError;
			const role = await getUserRole();
			if (!role) {
				await supabase.auth.signOut();
				throw new Error("Your account profile could not be found.");
			}
			await navigate({
				to: getDashboardPath(role),
				replace: true
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Login failed. Check your credentials and try again.");
		} finally {
			setLoading(false);
		}
	}
	if (checkingSession) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Checking your session..."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-screen items-center justify-center bg-background px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-sm text-primary hover:underline",
					children: "← Back to FreshCart"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 text-3xl font-bold text-foreground",
					children: "Welcome back"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Sign in to continue to FreshCart."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleLogin,
					className: "mt-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "login-email",
							className: "mb-1 block text-sm font-medium",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "login-email",
							type: "email",
							required: true,
							autoComplete: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							className: "w-full rounded-lg border border-input bg-background px-3 py-2",
							placeholder: "you@example.com"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "login-password",
							className: "mb-1 block text-sm font-medium",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "login-password",
							type: "password",
							required: true,
							autoComplete: "current-password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							className: "w-full rounded-lg border border-input bg-background px-3 py-2",
							placeholder: "Your password"
						})] }),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "text-sm text-destructive",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: loading,
							className: "w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground disabled:opacity-60",
							children: loading ? "Signing in..." : "Sign in"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-center text-sm text-muted-foreground",
					children: [
						"New to FreshCart?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/register",
							className: "font-semibold text-primary hover:underline",
							children: "Create an account"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { LoginPage as component };
