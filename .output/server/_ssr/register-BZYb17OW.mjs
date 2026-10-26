import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-DJxlXwXN.mjs";
import { n as getUserRole, t as getDashboardPath } from "./auth-w09b0sOZ.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-BZYb17OW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RegisterPage() {
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	async function handleRegister(e) {
		e.preventDefault();
		setLoading(true);
		setMessage("");
		setError("");
		try {
			const { data, error: signupError } = await supabase.auth.signUp({
				email: email.trim(),
				password,
				options: { data: { full_name: name.trim() } }
			});
			if (signupError) throw signupError;
			if (!data.session) {
				setMessage("Account created. Check your email to confirm your account, then sign in.");
				return;
			}
			const role = await getUserRole();
			if (!role) throw new Error("Your profile could not be loaded.");
			await navigate({
				to: getDashboardPath(role),
				replace: true
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
		} finally {
			setLoading(false);
		}
	}
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
					children: "Create your account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Join FreshCart for smarter grocery shopping."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleRegister,
					className: "mt-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "name",
							className: "mb-1 block text-sm font-medium",
							children: "Full name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "name",
							required: true,
							autoComplete: "name",
							value: name,
							onChange: (e) => setName(e.target.value),
							className: "w-full rounded-lg border border-input bg-background px-3 py-2",
							placeholder: "Your name"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "register-email",
							className: "mb-1 block text-sm font-medium",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "register-email",
							type: "email",
							required: true,
							autoComplete: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							className: "w-full rounded-lg border border-input bg-background px-3 py-2",
							placeholder: "you@example.com"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "register-password",
							className: "mb-1 block text-sm font-medium",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "register-password",
							type: "password",
							required: true,
							minLength: 8,
							autoComplete: "new-password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							className: "w-full rounded-lg border border-input bg-background px-3 py-2",
							placeholder: "At least 8 characters"
						})] }),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "text-sm text-destructive",
							children: error
						}),
						message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "status",
							className: "text-sm text-primary",
							children: message
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: loading,
							className: "w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground disabled:opacity-60",
							children: loading ? "Creating account..." : "Create account"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-center text-sm text-muted-foreground",
					children: [
						"Already registered?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "font-semibold text-primary hover:underline",
							children: "Sign in"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { RegisterPage as component };
