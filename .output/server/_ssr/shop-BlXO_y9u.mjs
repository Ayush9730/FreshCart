import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-DJxlXwXN.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as Receipt, c as Minus, d as CreditCard, f as Clock, i as RotateCcw, l as LoaderCircle, m as Brain, n as Sparkles, o as Printer, p as CircleCheck, r as ShoppingBasket, s as Plus, t as X, u as History } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-BlXO_y9u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRODUCTS = [
	[
		"Apple",
		"apple",
		"Fruits",
		180,
		"hsrdp",
		"snack"
	],
	[
		"Banana",
		"banana",
		"Fruits",
		60,
		"hsrdp",
		"breakfast"
	],
	[
		"Orange",
		"orange",
		"Fruits",
		120,
		"hsrp",
		"snack"
	],
	[
		"Grapes",
		"grapes",
		"Fruits",
		140,
		"hsrp",
		"snack"
	],
	[
		"Guava",
		"guava",
		"Fruits",
		90,
		"hsrp",
		"snack"
	],
	[
		"Mango",
		"mango",
		"Fruits",
		220,
		"hsrp",
		"snack"
	],
	[
		"Papaya",
		"papaya",
		"Fruits",
		70,
		"hsrp",
		"breakfast"
	],
	[
		"Pineapple",
		"pineapple",
		"Fruits",
		110,
		"hsrp",
		"snack"
	],
	[
		"Pomegranate",
		"pomegranate",
		"Fruits",
		200,
		"hsrp",
		"snack"
	],
	[
		"Watermelon",
		"watermelon",
		"Fruits",
		80,
		"hsrp",
		"snack"
	],
	[
		"Tomato",
		"tomato",
		"Vegetables",
		40,
		"hdp",
		"meal"
	],
	[
		"Potato",
		"potato",
		"Vegetables",
		35,
		"dp",
		"meal"
	],
	[
		"Onion",
		"onion",
		"Vegetables",
		45,
		"dp",
		"meal"
	],
	[
		"Carrot",
		"carrot",
		"Vegetables",
		60,
		"hp",
		"meal"
	],
	[
		"Cabbage",
		"cabbage",
		"Vegetables",
		40,
		"hp",
		"meal"
	],
	[
		"Cauliflower",
		"cauliflower",
		"Vegetables",
		50,
		"hp",
		"meal"
	],
	[
		"Capsicum",
		"capsicum",
		"Vegetables",
		80,
		"hp",
		"meal"
	],
	[
		"Brinjal",
		"brinjal",
		"Vegetables",
		45,
		"hp",
		"meal"
	],
	[
		"Spinach",
		"spinach",
		"Vegetables",
		30,
		"hp",
		"meal"
	],
	[
		"Green Peas",
		"peas",
		"Vegetables",
		90,
		"hp",
		"meal"
	],
	[
		"Milk",
		"milk",
		"Dairy",
		32,
		"hdp",
		"breakfast"
	],
	[
		"Curd",
		"curd",
		"Dairy",
		45,
		"hrdp",
		"meal"
	],
	[
		"Yogurt",
		"yogurt",
		"Dairy",
		60,
		"hrp",
		"snack"
	],
	[
		"Butter",
		"butter",
		"Dairy",
		58,
		"dp",
		"breakfast"
	],
	[
		"Cheese",
		"cheese",
		"Dairy",
		140,
		"rp",
		"snack"
	],
	[
		"Paneer",
		"paneer",
		"Dairy",
		95,
		"hp",
		"meal"
	],
	[
		"Ghee",
		"ghee",
		"Dairy",
		320,
		"d",
		"meal"
	],
	[
		"Fresh Cream",
		"cream",
		"Dairy",
		70,
		"p",
		"meal"
	],
	[
		"Lassi",
		"lassi",
		"Dairy",
		30,
		"srp",
		"snack"
	],
	[
		"Milkshake",
		"milkshake",
		"Dairy",
		45,
		"srp",
		"snack"
	],
	[
		"White Bread",
		"bread",
		"Bakery",
		40,
		"rdp",
		"breakfast"
	],
	[
		"Brown Bread",
		"brownbread",
		"Bakery",
		55,
		"hrdp",
		"breakfast"
	],
	[
		"Multigrain Bread",
		"multigrain",
		"Bakery",
		65,
		"hrp",
		"breakfast"
	],
	[
		"Buns",
		"buns",
		"Bakery",
		35,
		"rp",
		"breakfast"
	],
	[
		"Pav",
		"pav",
		"Bakery",
		30,
		"rp",
		"meal"
	],
	[
		"Croissant",
		"croissant",
		"Bakery",
		90,
		"rp",
		"breakfast"
	],
	[
		"Cake",
		"cake",
		"Bakery",
		350,
		"srp",
		"snack"
	],
	[
		"Cupcake",
		"cupcake",
		"Bakery",
		60,
		"srp",
		"snack"
	],
	[
		"Donut",
		"donut",
		"Bakery",
		70,
		"srp",
		"snack"
	],
	[
		"Garlic Bread",
		"garlicbread",
		"Bakery",
		110,
		"rp",
		"snack"
	],
	[
		"Pizza Base",
		"pizzabase",
		"Bakery",
		60,
		"p",
		"meal"
	],
	[
		"Rusk",
		"rusk",
		"Bakery",
		50,
		"sr",
		"breakfast"
	],
	[
		"Coffee",
		"coffee",
		"Beverages",
		260,
		"d",
		"breakfast"
	],
	[
		"Black Tea",
		"blacktea",
		"Beverages",
		180,
		"d",
		"breakfast"
	],
	[
		"Green Tea",
		"greentea",
		"Beverages",
		220,
		"h",
		"breakfast"
	],
	[
		"Iced Tea",
		"icedtea",
		"Beverages",
		50,
		"sr",
		"snack"
	],
	[
		"Apple Juice",
		"applejuice",
		"Beverages",
		120,
		"hsr",
		"breakfast"
	],
	[
		"Mango Juice",
		"mangojuice",
		"Beverages",
		99,
		"sr",
		"snack"
	],
	[
		"Lemon Juice",
		"lemonjuice",
		"Beverages",
		60,
		"hr",
		"snack"
	],
	[
		"Soft Drink",
		"softdrink",
		"Beverages",
		45,
		"sr",
		"snack"
	],
	[
		"Soda",
		"soda",
		"Beverages",
		25,
		"r",
		"snack"
	],
	[
		"Energy Drink",
		"energydrink",
		"Beverages",
		110,
		"sr",
		"snack"
	],
	[
		"Mineral Water",
		"water",
		"Beverages",
		20,
		"hrd",
		"home"
	],
	[
		"Biscuits",
		"biscuits",
		"Snacks",
		30,
		"sr",
		"snack"
	],
	[
		"Cookies",
		"cookies",
		"Snacks",
		80,
		"sr",
		"snack"
	],
	[
		"Chips",
		"chips",
		"Snacks",
		20,
		"r",
		"snack"
	],
	[
		"Nachos",
		"nachos",
		"Snacks",
		60,
		"r",
		"snack"
	],
	[
		"Namkeen",
		"namkeen",
		"Snacks",
		55,
		"r",
		"snack"
	],
	[
		"Mixture",
		"mixture",
		"Snacks",
		50,
		"r",
		"snack"
	],
	[
		"Sev",
		"sev",
		"Snacks",
		45,
		"r",
		"snack"
	],
	[
		"Khakhra",
		"khakhra",
		"Snacks",
		70,
		"hr",
		"snack"
	],
	[
		"Popcorn",
		"popcorn",
		"Snacks",
		40,
		"r",
		"snack"
	],
	[
		"Chocolate",
		"chocolate",
		"Snacks",
		100,
		"sr",
		"snack"
	],
	[
		"Energy Bar",
		"energybar",
		"Snacks",
		50,
		"hsr",
		"snack"
	],
	[
		"Peanut Bar",
		"peanutbar",
		"Snacks",
		30,
		"hsr",
		"snack"
	],
	[
		"Cornflakes",
		"cornflakes",
		"Breakfast",
		190,
		"hs",
		"breakfast"
	],
	[
		"Oats",
		"oats",
		"Breakfast",
		160,
		"h",
		"breakfast"
	],
	[
		"Muesli",
		"muesli",
		"Breakfast",
		340,
		"hs",
		"breakfast"
	],
	[
		"Poha",
		"poha",
		"Breakfast",
		60,
		"hd",
		"breakfast"
	],
	[
		"Upma Mix",
		"upma",
		"Breakfast",
		70,
		"h",
		"breakfast"
	],
	[
		"Pancake Mix",
		"pancake",
		"Breakfast",
		210,
		"s",
		"breakfast"
	],
	[
		"Noodles",
		"noodles",
		"Instant Food",
		15,
		"",
		"meal"
	],
	[
		"Pasta",
		"pasta",
		"Instant Food",
		90,
		"",
		"meal"
	],
	[
		"Pasta Kit",
		"pastakit",
		"Instant Food",
		150,
		"",
		"meal"
	],
	[
		"Macaroni",
		"macaroni",
		"Instant Food",
		80,
		"",
		"meal"
	],
	[
		"Instant Soup",
		"soup",
		"Instant Food",
		50,
		"h",
		"meal"
	],
	[
		"Khichdi Mix",
		"khichdi",
		"Instant Food",
		95,
		"h",
		"meal"
	],
	[
		"Toothpaste",
		"toothpaste",
		"Personal Care",
		95,
		"d",
		"home"
	],
	[
		"Toothbrush",
		"toothbrush",
		"Personal Care",
		40,
		"d",
		"home"
	],
	[
		"Soap",
		"soap",
		"Personal Care",
		45,
		"d",
		"home"
	],
	[
		"Shampoo",
		"shampoo",
		"Personal Care",
		180,
		"d",
		"home"
	],
	[
		"Face Wash",
		"facewash",
		"Personal Care",
		150,
		"",
		"home"
	],
	[
		"Body Lotion",
		"lotion",
		"Personal Care",
		220,
		"",
		"home"
	],
	[
		"Hair Oil",
		"hairoil",
		"Personal Care",
		130,
		"",
		"home"
	],
	[
		"Deodorant",
		"deo",
		"Personal Care",
		200,
		"",
		"home"
	],
	[
		"Razor",
		"razor",
		"Personal Care",
		120,
		"",
		"home"
	],
	[
		"Hand Wash",
		"handwash",
		"Personal Care",
		99,
		"d",
		"home"
	],
	[
		"Sanitizer",
		"sanitizer",
		"Personal Care",
		60,
		"",
		"home"
	],
	[
		"Body Scrub",
		"scrub",
		"Personal Care",
		250,
		"",
		"home"
	],
	[
		"Detergent",
		"detergent",
		"Cleaning",
		210,
		"d",
		"home"
	],
	[
		"Dishwash Liquid",
		"dishwash",
		"Cleaning",
		110,
		"d",
		"home"
	],
	[
		"Floor Cleaner",
		"floorcleaner",
		"Cleaning",
		160,
		"",
		"home"
	],
	[
		"Toilet Cleaner",
		"toiletcleaner",
		"Cleaning",
		95,
		"",
		"home"
	],
	[
		"Glass Cleaner",
		"glasscleaner",
		"Cleaning",
		120,
		"",
		"home"
	],
	[
		"Phenyl",
		"phenyl",
		"Cleaning",
		80,
		"",
		"home"
	],
	[
		"Room Freshener",
		"freshener",
		"Cleaning",
		170,
		"",
		"home"
	],
	[
		"Garbage Bags",
		"garbage",
		"Cleaning",
		90,
		"d",
		"home"
	],
	[
		"Tissue Roll",
		"tissue",
		"Cleaning",
		70,
		"d",
		"home"
	],
	[
		"Broom",
		"broom",
		"Cleaning",
		120,
		"",
		"home"
	],
	[
		"Mop",
		"mop",
		"Cleaning",
		280,
		"",
		"home"
	]
].map(([name, img, category, price, f, mealTime], i) => ({
	id: i + 1,
	name,
	image: `/images/${img}.png`,
	category,
	price,
	healthy: f.includes("h"),
	sweet: f.includes("s"),
	readyToEat: f.includes("r"),
	dailyEssential: f.includes("d"),
	perishable: f.includes("p"),
	mealTime
}));
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
async function fetchProducts() {
	const { data, error } = await supabase.from("products").select(`
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
    `).eq("is_available", true).order("id", { ascending: true });
	if (error) throw new Error(`Unable to load products: ${error.message}`);
	return (data ?? []).map((row) => ({
		id: Number(row.id),
		name: row.name,
		image: row.image,
		category: row.category,
		price: Number(row.price),
		healthy: row.healthy,
		sweet: row.sweet,
		readyToEat: row.ready_to_eat,
		dailyEssential: row.daily_essential,
		perishable: row.perishable,
		mealTime: row.meal_time
	}));
}
var MEALS = [
	"breakfast",
	"snack",
	"meal",
	"home"
];
var prices = PRODUCTS.map((p) => p.price);
var logMin = Math.log(Math.min(...prices));
var logMax = Math.log(Math.max(...prices));
var normPrice = (p) => (Math.log(p) - logMin) / (logMax - logMin);
function features(p) {
	return [
		normPrice(p.price) * 2,
		...CATEGORIES.map((c) => c === p.category ? 1.6 : 0),
		p.healthy ? .7 : 0,
		p.sweet ? .7 : 0,
		p.readyToEat ? .5 : 0,
		p.dailyEssential ? .5 : 0,
		p.perishable ? .4 : 0,
		...MEALS.map((m) => m === p.mealTime ? .6 : 0)
	];
}
var VECTORS = new Map(PRODUCTS.map((p) => [p.id, features(p)]));
var dist = (a, b) => Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0));
var cosine = (a, b) => {
	let d = 0, na = 0, nb = 0;
	a.forEach((v, i) => {
		d += v * b[i];
		na += v * v;
		nb += b[i] * b[i];
	});
	return d / (Math.sqrt(na * nb) || 1);
};
function seeded(seed) {
	return () => ((seed = seed * 16807 % 2147483647) - 1) / 2147483646;
}
function kmeans(k) {
	const rand = seeded(42);
	const pts = PRODUCTS.map((p) => VECTORS.get(p.id));
	const centroids = [pts[Math.floor(rand() * pts.length)]];
	while (centroids.length < k) {
		const d2 = pts.map((p) => Math.min(...centroids.map((c) => dist(p, c) ** 2)));
		let r = rand() * d2.reduce((a, b) => a + b, 0);
		let idx = 0;
		while ((r -= d2[idx]) > 0) idx++;
		centroids.push(pts[idx]);
	}
	let assign = new Array(pts.length).fill(0);
	for (let iter = 0; iter < 50; iter++) {
		const next = pts.map((p) => {
			let best = 0;
			centroids.forEach((c, i) => {
				if (dist(p, c) < dist(p, centroids[best])) best = i;
			});
			return best;
		});
		const changed = next.some((v, i) => v !== assign[i]);
		assign = next;
		centroids.forEach((_, ci) => {
			const members = pts.filter((_, i) => assign[i] === ci);
			if (members.length) centroids[ci] = members[0].map((_, d) => members.reduce((s, m) => s + m[d], 0) / members.length);
		});
		if (!changed) break;
	}
	return new Map(PRODUCTS.map((p, i) => [p.id, assign[i]]));
}
var CLUSTER = kmeans(14);
var sorted = [...prices].sort((a, b) => a - b);
var q1 = sorted[Math.floor(sorted.length / 3)];
var q2 = sorted[Math.floor(2 * sorted.length / 3)];
var segment = (price) => price <= q1 ? "Budget" : price <= q2 ? "Mid-range" : "Premium";
/** kNN classifier: predicts the "daily-life use" of a product from its nearest neighbours' meal time. */
function classifyUse(p, k = 5) {
	const v = VECTORS.get(p.id);
	const neighbours = PRODUCTS.filter((o) => o.id !== p.id).map((o) => ({
		o,
		d: dist(v, VECTORS.get(o.id))
	})).sort((a, b) => a.d - b.d).slice(0, k);
	const votes = {};
	neighbours.forEach(({ o, d }) => votes[o.mealTime] = (votes[o.mealTime] || 0) + 1 / (d + .1));
	return Object.entries(votes).sort((a, b) => b[1] - a[1])[0][0];
}
function timeOfDayUse(hour) {
	if (hour >= 5 && hour < 11) return "breakfast";
	if (hour >= 11 && hour < 15) return "meal";
	if (hour >= 15 && hour < 19) return "snack";
	return "meal";
}
function userProfile(b) {
	const cat = {};
	let priceSum = 0, priceW = 0, healthy = 0, total = 0;
	const add = (id, w) => {
		const p = PRODUCTS.find((x) => x.id === id);
		if (!p) return;
		cat[p.category] = (cat[p.category] || 0) + w;
		priceSum += p.price * w;
		priceW += w;
		if (p.healthy) healthy += w;
		total += w;
	};
	Object.entries(b.views).forEach(([id, n]) => add(+id, n));
	Object.entries(b.carts).forEach(([id, n]) => add(+id, n * 3));
	b.basketHistory.flat().forEach((id) => add(id, 4));
	const maxCat = Math.max(1, ...Object.values(cat));
	return {
		categoryAffinity: Object.fromEntries(Object.entries(cat).map(([k, v]) => [k, v / maxCat])),
		avgPrice: priceW ? priceSum / priceW : null,
		healthyRatio: total ? healthy / total : 0,
		signals: total
	};
}
function coPurchase(b, id) {
	const baskets = b.basketHistory.filter((o) => o.includes(id));
	const counts = {};
	baskets.forEach((o) => o.forEach((x) => x !== id && (counts[x] = (counts[x] || 0) + 1)));
	return {
		counts,
		n: baskets.length
	};
}
function recommendSimilar(selected, b, hour, limit = 8) {
	const v = VECTORS.get(selected.id);
	const profile = userProfile(b);
	const nowUse = timeOfDayUse(hour);
	const selSeg = segment(selected.price);
	const co = coPurchase(b, selected.id);
	return PRODUCTS.filter((p) => p.id !== selected.id).map((p) => {
		const similarity = Math.max(0, cosine(v, VECTORS.get(p.id)));
		const cluster = CLUSTER.get(p.id) === CLUSTER.get(selected.id) ? 1 : 0;
		const price = (1 - Math.abs(p.price - selected.price) / Math.max(p.price, selected.price)) * .7 + (segment(p.price) === selSeg ? .3 : 0);
		let personal = (profile.categoryAffinity[p.category] || 0) * .6;
		if (profile.avgPrice) personal += (1 - Math.min(1, Math.abs(p.price - profile.avgPrice) / profile.avgPrice)) * .25;
		if (p.healthy) personal += profile.healthyRatio * .15;
		const daily = (p.mealTime === nowUse ? .6 : 0) + (p.dailyEssential ? .4 : 0);
		const together = co.n ? (co.counts[p.id] || 0) / co.n : 0;
		const sameCat = p.category === selected.category ? 1 : 0;
		const score = similarity * .3 + sameCat * .15 + cluster * .15 + price * .15 + personal * .1 + daily * .05 + together * .1;
		const reasons = [];
		if (sameCat && price > .7) reasons.push(`Similar ${selected.category.toLowerCase()}, similar price`);
		else if (sameCat) reasons.push(`Also in ${selected.category}`);
		if (cluster) reasons.push("Same product cluster");
		if (segment(p.price) === selSeg && !sameCat) reasons.push(`${selSeg} pick`);
		if (together > .3) reasons.push("You bought these together");
		if ((profile.categoryAffinity[p.category] || 0) > .6) reasons.push("Matches your habits");
		if (p.mealTime === nowUse && nowUse !== "home") reasons.push(`Good for ${nowUse} now`);
		return {
			product: p,
			score,
			reasons: reasons.slice(0, 2),
			parts: {
				similarity,
				cluster,
				price,
				personal,
				daily,
				together
			}
		};
	}).sort((a, b) => b.score - a.score).slice(0, limit);
}
/** Home feed: personal habits + what fits this time of day. */
function recommendForYou(b, hour, limit = 8) {
	const profile = userProfile(b);
	const nowUse = timeOfDayUse(hour);
	const seen = new Set([...Object.keys(b.carts)].map(Number));
	return PRODUCTS.filter((p) => !seen.has(p.id)).map((p) => {
		const personal = profile.categoryAffinity[p.category] || 0;
		const daily = (p.mealTime === nowUse ? .7 : 0) + (p.dailyEssential ? .3 : 0);
		const priceFit = profile.avgPrice ? 1 - Math.min(1, Math.abs(p.price - profile.avgPrice) / profile.avgPrice) : .5;
		return {
			product: p,
			score: profile.signals ? personal * .5 + daily * .3 + priceFit * .2 : daily,
			reasons: [personal > .6 ? "Based on your habits" : "", p.mealTime === nowUse && nowUse !== "home" ? `For your ${nowUse}` : p.dailyEssential ? "Daily essential" : ""].filter(Boolean),
			parts: {
				similarity: 0,
				cluster: 0,
				price: priceFit,
				personal,
				daily,
				together: 0
			}
		};
	}).sort((a, b) => b.score - a.score).slice(0, limit);
}
var EMPTY = {
	views: {},
	carts: {},
	basketHistory: []
};
var KEY = "freshcart-behaviour";
var BILLS_KEY = "freshcart-bills";
var TIMES = [
	{
		label: "Morning",
		hour: 8
	},
	{
		label: "Afternoon",
		hour: 13
	},
	{
		label: "Evening",
		hour: 17
	},
	{
		label: "Night",
		hour: 21
	}
];
function Index() {
	const [b, setB] = (0, import_react.useState)(EMPTY);
	const [cart, setCart] = (0, import_react.useState)({});
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [products, setProducts] = (0, import_react.useState)([]);
	const [productsLoading, setProductsLoading] = (0, import_react.useState)(true);
	const [productsError, setProductsError] = (0, import_react.useState)(null);
	const [cat, setCat] = (0, import_react.useState)("All");
	const [hour, setHour] = (0, import_react.useState)(12);
	const [showCart, setShowCart] = (0, import_react.useState)(false);
	const [showHistory, setShowHistory] = (0, import_react.useState)(false);
	const [bills, setBills] = (0, import_react.useState)([]);
	const [generatedBill, setGeneratedBill] = (0, import_react.useState)(null);
	const [paymentLoading, setPaymentLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		async function loadProducts() {
			try {
				setProductsLoading(true);
				setProductsError(null);
				const result = await fetchProducts();
				if (!cancelled) setProducts(result);
			} catch (error) {
				if (!cancelled) setProductsError(error instanceof Error ? error.message : "Unable to load products.");
			} finally {
				if (!cancelled) setProductsLoading(false);
			}
		}
		loadProducts();
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		setHour((/* @__PURE__ */ new Date()).getHours());
		try {
			const s = localStorage.getItem(KEY);
			if (s) setB(JSON.parse(s));
			const savedBills = localStorage.getItem(BILLS_KEY);
			if (savedBills) setBills(JSON.parse(savedBills));
		} catch {}
	}, []);
	const productsById = (0, import_react.useMemo)(() => new Map(products.map((product) => [product.id, product])), [products]);
	const save = (nb) => {
		setB(nb);
		localStorage.setItem(KEY, JSON.stringify(nb));
	};
	const open = (p) => {
		setSelected(p);
		save({
			...b,
			views: {
				...b.views,
				[p.id]: (b.views[p.id] || 0) + 1
			}
		});
	};
	const addToCart = (p) => {
		setCart((c) => ({
			...c,
			[p.id]: (c[p.id] || 0) + 1
		}));
		save({
			...b,
			carts: {
				...b.carts,
				[p.id]: (b.carts[p.id] || 0) + 1
			}
		});
	};
	const changeQty = (id, d) => setCart((c) => {
		const n = {
			...c,
			[id]: (c[id] || 0) + d
		};
		if ((n[id] ?? 0) <= 0) delete n[id];
		return n;
	});
	const generateBill = () => {
		const entries = Object.entries(cart);
		if (!entries.length) return;
		const items = [];
		for (const [id, quantity] of entries) {
			const p = productsById.get(Number(id));
			if (!p) {
				alert("One or more cart products could not be found. Please refresh the shop and try again.");
				return;
			}
			items.push({
				id: p.id,
				name: p.name,
				price: p.price,
				quantity,
				amount: p.price * quantity
			});
		}
		const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
		const tax = Math.round(subtotal * .05 * 100) / 100;
		const bill = {
			id: `BILL-${Date.now()}`,
			date: (/* @__PURE__ */ new Date()).toLocaleString("en-IN"),
			items,
			subtotal,
			tax,
			total: subtotal + tax,
			paymentStatus: "UNPAID"
		};
		const updatedBills = [bill, ...bills];
		setBills(updatedBills);
		localStorage.setItem(BILLS_KEY, JSON.stringify(updatedBills));
		setGeneratedBill(bill);
		const ids = entries.map(([id]) => Number(id));
		save({
			...b,
			basketHistory: [...b.basketHistory, ids]
		});
	};
	const updateBill = (updatedBill) => {
		const updatedBills = bills.map((bill) => bill.id === updatedBill.id ? updatedBill : bill);
		setBills(updatedBills);
		localStorage.setItem(BILLS_KEY, JSON.stringify(updatedBills));
		setGeneratedBill(updatedBill);
	};
	const loadRazorpay = () => new Promise((resolve) => {
		if (window.Razorpay) return resolve(true);
		const script = document.createElement("script");
		script.src = "https://checkout.razorpay.com/v1/checkout.js";
		script.onload = () => resolve(true);
		script.onerror = () => resolve(false);
		document.body.appendChild(script);
	});
	const API_URL = {
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
	}["VITE_API_URL"] || "http://localhost:5000";
	const payBill = async (bill) => {
		if (paymentLoading || bill.paymentStatus === "PAID") return;
		setPaymentLoading(true);
		try {
			if (!await loadRazorpay()) throw new Error("Unable to load Razorpay Checkout. Check your internet connection.");
			const orderResponse = await fetch(`${API_URL}/api/create-order`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					amount: bill.total,
					receipt: bill.id
				})
			});
			const orderData = await orderResponse.json();
			if (!orderResponse.ok) throw new Error(orderData.error || "Unable to create payment order.");
			const razorpay = new window.Razorpay({
				key: orderData.keyId,
				amount: orderData.amount,
				currency: orderData.currency,
				name: "FreshCart",
				description: `Payment for ${bill.id}`,
				order_id: orderData.id,
				handler: async (response) => {
					try {
						const verifyResponse = await fetch(`${API_URL}/api/verify-payment`, {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify(response)
						});
						const verifyData = await verifyResponse.json();
						if (!verifyResponse.ok || !verifyData.verified) throw new Error(verifyData.error || "Payment verification failed.");
						updateBill({
							...bill,
							paymentStatus: "PAID",
							paymentId: response.razorpay_payment_id,
							razorpayOrderId: response.razorpay_order_id
						});
						alert("Payment successful! Your bill has been marked as PAID.");
					} catch (error) {
						alert(error instanceof Error ? error.message : "Payment verification failed.");
					}
				},
				modal: { ondismiss: () => setPaymentLoading(false) },
				theme: { color: "#2f855a" }
			});
			razorpay.on("payment.failed", (response) => {
				alert(response.error?.description || "Payment failed. Please try again.");
				setPaymentLoading(false);
			});
			razorpay.open();
		} catch (error) {
			alert(error instanceof Error ? error.message : "Unable to start payment.");
		} finally {
			setPaymentLoading(false);
		}
	};
	const clearCartAfterBill = () => {
		setCart({});
	};
	const printBill = (bill) => {
		const rows = bill.items.map((item) => `<tr><td>${item.name}</td><td>${item.quantity}</td><td>₹${item.price}</td><td>₹${item.amount}</td></tr>`).join("");
		const printWindow = window.open("", "_blank", "width=700,height=800");
		if (!printWindow) return;
		printWindow.document.write(`
      <html>
        <head>
          <title>${bill.id}</title>

          <style>
            body{
              font-family:Arial,sans-serif;
              padding:32px;
              color:#222
            }

            h1{
              text-align:center
            }

            .meta{
              margin-bottom:20px;
              color:#555
            }

            table{
              width:100%;
              border-collapse:collapse
            }

            th,td{
              padding:10px;
              border-bottom:1px solid #ddd;
              text-align:left
            }

            .total{
              text-align:right;
              margin-top:20px;
              font-size:18px;
              line-height:1.8
            }
          </style>
        </head>

        <body>
          <h1>FreshCart</h1>

          <div class="meta">
            <b>Bill:</b> ${bill.id}<br/>
            <b>Date:</b> ${bill.date}
          </div>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              ${rows}
            </tbody>
          </table>

          <div class="total">
            Subtotal: ₹${bill.subtotal.toFixed(2)}<br/>
            Tax (5%): ₹${bill.tax.toFixed(2)}<br/>
            <b>Total: ₹${bill.total.toFixed(2)}</b>
          </div>
        </body>
      </html>
    `);
		printWindow.document.close();
		printWindow.focus();
		printWindow.print();
	};
	const visible = cat === "All" ? products : products.filter((p) => p.category === cat);
	const forYou = (0, import_react.useMemo)(() => recommendForYou(b, hour), [b, hour]);
	const similar = (0, import_react.useMemo)(() => selected ? recommendSimilar(selected, b, hour) : [], [
		selected,
		b,
		hour
	]);
	const profile = (0, import_react.useMemo)(() => userProfile(b), [b]);
	const cartCount = Object.values(cart).reduce((a, n) => a + n, 0);
	const cartTotal = Object.entries(cart).reduce((sum, [id, quantity]) => {
		const product = productsById.get(Number(id));
		return sum + (product ? product.price * quantity : 0);
	}, 0);
	const topCats = Object.entries(profile.categoryAffinity).sort((a, c) => c[1] - a[1]).slice(0, 3);
	const nowUse = timeOfDayUse(hour);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-bold text-primary",
						children: "FreshCart"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowHistory(true),
							className: "flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-secondary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-4 w-4" }),
								"Bills",
								bills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-secondary px-2 text-xs",
									children: bills.length
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowCart(true),
							className: "relative flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBasket, { className: "h-4 w-4" }),
								"Cart",
								cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-accent px-2 text-xs text-accent-foreground",
									children: cartCount
								})
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-7xl px-6 pb-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "bg-hero mt-6 rounded-3xl p-8 text-primary-foreground shadow-soft",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-end justify-between gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-w-xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex items-center gap-2 text-sm opacity-80",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-4 w-4" }), "Smart recommendations"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-2 font-display text-4xl font-bold leading-tight",
										children: "Pick a product. We'll find its best matches."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 opacity-80",
										children: "Uses product features, price, clustering, classification, your shopping habits and the time of day."
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-primary-foreground/10 p-4 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mb-2 flex items-center gap-2 opacity-80",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }), "Time of day"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-1",
									children: TIMES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setHour(t.hour),
										className: `rounded-full px-3 py-1 ${timeOfDayUse(t.hour) === nowUse && Math.abs(t.hour - hour) < 4 ? "bg-accent text-accent-foreground" : "bg-primary-foreground/10"}`,
										children: t.label
									}, t.label))
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-6 grid gap-4 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Your top categories",
								value: topCats.length ? topCats.map(([c]) => c).join(", ") : "Browse to teach me"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Your usual spend per item",
								value: profile.avgPrice ? `₹${Math.round(profile.avgPrice)}` : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-2xl border border-border bg-card p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Activity learned"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-semibold",
									children: [
										Object.keys(b.views).length,
										" viewed ·",
										" ",
										b.basketHistory.length,
										" orders"
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => save(EMPTY),
									className: "flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3 w-3" }), "Reset"]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "flex items-center gap-2 font-display text-2xl font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-accent" }), "Recommended for you"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									"Based on your habits and what people need for",
									" ",
									nowUse === "home" ? "home" : nowUse,
									" right now."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex gap-4 overflow-x-auto pb-2",
								children: forYou.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniCard, {
									r,
									onOpen: open
								}, r.product.id))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: ["All", ...CATEGORIES].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setCat(c),
									className: `rounded-full border px-4 py-1.5 text-sm font-medium ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"}`,
									children: c
								}, c))
							}),
							productsLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-sm text-muted-foreground",
								role: "status",
								children: "Loading products from FreshCart..."
							}),
							!productsLoading && productsError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm",
								role: "alert",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: "Products could not be loaded."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1",
										children: productsError
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-muted-foreground",
										children: "Check your Supabase connection and the products table, then refresh this page."
									})
								]
							}),
							!productsLoading && !productsError && visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-sm text-muted-foreground",
								children: "No products found in this category."
							}),
							!productsLoading && !productsError && visible.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5",
								children: visible.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "group rounded-2xl border border-border bg-card p-3 transition hover:shadow-soft",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => open(p),
										className: "block w-full text-left",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "aspect-square overflow-hidden rounded-xl bg-muted",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: p.image,
													alt: p.name,
													loading: "lazy",
													className: "h-full w-full object-contain p-3 transition group-hover:scale-105"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 font-semibold",
												children: p.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground",
												children: [
													p.category,
													" · ",
													segment(p.price)
												]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-display text-lg font-bold text-primary",
											children: ["₹", p.price]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => addToCart(p),
											"aria-label": `Add ${p.name}`,
											className: "rounded-full bg-secondary p-2 text-secondary-foreground hover:bg-primary hover:text-primary-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
										})]
									})]
								}, p.id))
							})
						]
					})
				]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer, {
				onClose: () => setSelected(null),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: selected.image,
							alt: selected.name,
							className: "h-28 w-28 rounded-2xl bg-muted object-contain p-2"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-3xl font-bold",
								children: selected.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-xl text-primary",
								children: ["₹", selected.price]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap gap-1 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { children: selected.category }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { children: segment(selected.price) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tag, { children: ["Cluster #", (CLUSTER.get(selected.id) ?? 0) + 1] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tag, { children: ["Used for: ", classifyUse(selected)] }),
									selected.healthy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { children: "Healthy" }),
									selected.sweet && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { children: "Sweet" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => addToCart(selected),
								className: "mt-3 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground",
								children: "Add to cart"
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "mt-8 flex items-center gap-2 font-display text-xl font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-accent" }), "Similar products"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Matched on features, price, cluster and your habits."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 space-y-3",
						children: similar.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-2xl border border-border bg-card p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => open(r.product),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: r.product.image,
										alt: r.product.name,
										className: "h-16 w-16 rounded-xl bg-muted object-contain p-1"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => open(r.product),
											className: "font-semibold hover:underline",
											children: r.product.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground",
											children: [
												"₹",
												r.product.price,
												" ·",
												" ",
												r.reasons.join(" · ") || "Similar features"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1 h-1.5 overflow-hidden rounded-full bg-muted",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full rounded-full bg-primary",
												style: { width: `${Math.min(100, r.score * 100)}%` }
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm font-bold text-primary",
									children: [Math.round(r.score * 100), "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => addToCart(r.product),
									"aria-label": "Add",
									className: "rounded-full bg-secondary p-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
								})
							]
						}, r.product.id))
					})
				]
			}),
			showCart && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer, {
				onClose: () => setShowCart(false),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-3xl font-bold",
					children: "Your cart"
				}), cartCount === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground",
					children: "Your cart is empty."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 space-y-3",
						children: Object.entries(cart).map(([id, n]) => {
							const p = productsById.get(Number(id));
							if (!p) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 rounded-2xl border border-border bg-card p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: p.image,
										alt: p.name,
										className: "h-12 w-12 object-contain"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold",
											children: p.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground",
											children: ["₹", p.price]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => changeQty(p.id, -1),
										className: "rounded-full bg-secondary p-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-6 text-center",
										children: n
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => changeQty(p.id, 1),
										className: "rounded-full bg-secondary p-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
									})
								]
							}, id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-2xl border border-border bg-card p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-display text-xl font-bold",
									children: "Bill Details"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 space-y-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Items" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cartCount })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", cartTotal.toFixed(2)] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tax (5%)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", (cartTotal * .05).toFixed(2)] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex justify-between border-t border-border pt-3 text-lg font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-primary",
											children: ["₹", (cartTotal * 1.05).toFixed(2)]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: generateBill,
								className: "mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-4 w-4" }), "Generate Bill"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-center text-xs text-muted-foreground",
								children: "The generated bill is saved in Bill History."
							})
						]
					}),
					generatedBill && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 rounded-2xl border border-primary/30 bg-secondary/30 p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Generated successfully"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-display text-xl font-bold",
									children: generatedBill.id
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => printBill(generatedBill),
									className: "flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" }), "Print"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 space-y-2 text-sm",
								children: [generatedBill.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										item.name,
										" ×",
										" ",
										item.quantity
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", item.amount.toFixed(2)] })]
								}, item.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border pt-3 font-bold",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", generatedBill.total.toFixed(2)] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 flex justify-between text-sm font-normal",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Payment" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: generatedBill.paymentStatus === "PAID" ? "font-semibold text-green-600" : "font-semibold text-amber-600",
												children: generatedBill.paymentStatus ?? "UNPAID"
											})]
										}),
										generatedBill.paymentId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-2 break-all text-xs font-normal text-muted-foreground",
											children: [
												"Payment ID:",
												" ",
												generatedBill.paymentId
											]
										})
									]
								})]
							}),
							generatedBill.paymentStatus !== "PAID" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => payBill(generatedBill),
								disabled: paymentLoading,
								className: "mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground disabled:opacity-60",
								children: [paymentLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4" }), paymentLoading ? "Opening Payment..." : `Pay ₹${generatedBill.total.toFixed(2)}`]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-center justify-center gap-2 rounded-full bg-green-50 px-4 py-3 text-sm font-semibold text-green-700",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), "Payment completed"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: clearCartAfterBill,
								className: "mt-3 w-full rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary",
								children: "Clear Cart"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Orders teach the system which items you buy together."
					})
				] })]
			}),
			showHistory && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer, {
				onClose: () => setShowHistory(false),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-6 w-6 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-3xl font-bold",
						children: "Bill History"
					})]
				}), bills.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-muted-foreground",
					children: "No bills have been generated yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 space-y-4",
					children: bills.map((bill) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: bill.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: bill.date
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold text-primary",
									children: ["₹", bill.total.toFixed(2)]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 space-y-1 text-sm",
								children: bill.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										item.name,
										" ×",
										" ",
										item.quantity
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", item.amount.toFixed(2)] })]
								}, item.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded-full px-3 py-1 text-xs font-semibold ${bill.paymentStatus === "PAID" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`,
										children: bill.paymentStatus ?? "UNPAID"
									}),
									bill.paymentStatus !== "PAID" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => payBill(bill),
										disabled: paymentLoading,
										className: "flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground disabled:opacity-60",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4" }), "Pay Now"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => printBill(bill),
										className: "flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" }), "Print Bill"]
									})
								]
							})
						]
					}, bill.id))
				})]
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-semibold",
			children: value
		})]
	});
}
function Tag({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground",
		children
	});
}
function MiniCard({ r, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: () => onOpen(r.product),
		className: "w-40 shrink-0 rounded-2xl border border-border bg-card p-3 text-left hover:shadow-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: r.product.image,
				alt: r.product.name,
				className: "h-24 w-full object-contain"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-semibold",
				children: r.product.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-primary",
				children: ["₹", r.product.price]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-xs text-muted-foreground",
				children: r.reasons[0] || r.product.category
			})
		]
	});
}
function Drawer({ children, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 flex justify-end bg-foreground/30",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "h-full w-full max-w-xl overflow-y-auto bg-background p-6 shadow-soft",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onClose,
				"aria-label": "Close",
				className: "float-right rounded-full bg-muted p-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
			}), children]
		})
	});
}
//#endregion
export { Index as component };
