
import { supabase } from "@/lib/supabase";
import type {
  Product,
  Category,
  MealTime,
} from "@/lib/catalog";

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      image,
      category,
      price,
      healthy,
      sweet,
      ready_to_eat,
      daily_essential,
      perishable,
      meal_time
    `)
    .eq("is_available", true)
    .order("id", { ascending: true });

  if (error) {
    throw new Error(`Unable to load products: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    id: Number(row.id),
    name: row.name,
    image: row.image,
    category: row.category as Category,
    price: Number(row.price),
    healthy: row.healthy,
    sweet: row.sweet,
    readyToEat: row.ready_to_eat,
    dailyEssential: row.daily_essential,
    perishable: row.perishable,
    mealTime: row.meal_time as MealTime,
  }));
}
