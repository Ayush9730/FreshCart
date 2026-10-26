import { t as supabase } from "./supabase-DJxlXwXN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-w09b0sOZ.js
async function getUserRole() {
	const { data: { user }, error: authError } = await supabase.auth.getUser();
	if (authError || !user) return null;
	const { data, error } = await supabase.from("profiles").select("role").eq("id", user.id).single();
	if (error || !data) throw new Error("Unable to load your profile. Please try again.");
	if (data.role !== "customer" && data.role !== "admin") throw new Error("Your account has an invalid role.");
	return data.role;
}
function getDashboardPath(role) {
	return role === "admin" ? "/admin" : "/user";
}
//#endregion
export { getUserRole as n, getDashboardPath as t };
