import { n as __toESM } from "../_runtime.mjs";
import { n as getUserRole, t as getDashboardPath } from "./auth-w09b0sOZ.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DSY6-soI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HomeRedirect() {
	const navigate = useNavigate();
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let active = true;
		async function redirectUser() {
			try {
				const role = await getUserRole();
				if (!active) return;
				if (!role) await navigate({
					to: "/login",
					replace: true
				});
				else await navigate({
					to: getDashboardPath(role),
					replace: true
				});
			} catch {
				if (active) setError("Unable to verify your session. Please try opening /login.");
			}
		}
		redirectUser();
		return () => {
			active = false;
		};
	}, [navigate]);
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-screen items-center justify-center p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				children: error
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "mt-4 inline-block underline",
				href: "/login",
				children: "Go to login"
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Loading FreshCart..." })
	});
}
//#endregion
export { HomeRedirect as component };
