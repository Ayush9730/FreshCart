
import dotenv from "dotenv";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { PRODUCTS } from "../src/lib/catalog";

dotenv.config({
  path: path.resolve(process.cwd(), "backend/.env"),
});

async function seedProducts() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in backend/.env"
    );
  }

  if (PRODUCTS.length !== 100) {
    console.warn(
      `Expected 100 catalog products, found ${PRODUCTS.length}.`
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const rows = PRODUCTS.map((product) => ({
    id: product.id,
    name: product.name,
    image: product.image,
    category: product.category,
    price: product.price,
    healthy: product.healthy,
    sweet: product.sweet,
    ready_to_eat: product.readyToEat,
    daily_essential: product.dailyEssential,
    perishable: product.perishable,
    meal_time: product.mealTime,
  }));

  const { data, error } = await supabase
    .from("products")
    .upsert(rows, { onConflict: "id" })
    .select("id");

  if (error) {
    throw new Error(`Product import failed: ${error.message}`);
  }

  console.log(`Successfully imported ${data.length} products.`);
  console.log("Product IDs and recommendation attributes were preserved.");
}

seedProducts().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
