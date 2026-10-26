
import { supabase } from "@/lib/supabase";

export type UserRole = "customer" | "admin";

export async function getUserRole(): Promise<UserRole | null> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || !data) {
    throw new Error(
      "Unable to load your profile. Please try again."
    );
  }

  if (data.role !== "customer" && data.role !== "admin") {
    throw new Error("Your account has an invalid role.");
  }

  return data.role;
}

export function getDashboardPath(role: UserRole): string {
  return role === "admin" ? "/admin" : "/user";
}
