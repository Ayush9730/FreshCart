import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-DJxlXwXN.js
var supabaseUrl = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_Sk3RT7sopyd11Fv9iVpOyg_6B8H5RFo",
	"VITE_SUPABASE_URL": "https://layvfascgyggaiitiwyj.supabase.co"
}["VITE_SUPABASE_URL"];
var supabaseKey = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_Sk3RT7sopyd11Fv9iVpOyg_6B8H5RFo",
	"VITE_SUPABASE_URL": "https://layvfascgyggaiitiwyj.supabase.co"
}["VITE_SUPABASE_PUBLISHABLE_KEY"];
if (!supabaseUrl || !supabaseKey) throw new Error("Missing Supabase environment variables.");
var supabase = createClient(supabaseUrl, supabaseKey);
//#endregion
export { supabase as t };
