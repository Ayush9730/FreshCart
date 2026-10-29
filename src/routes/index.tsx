
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Leaf,
  ShoppingBasket,
  Sparkles,
  Truck,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const categories = [
  { emoji: "🍎", name: "Fruits", description: "Fresh and juicy" },
  { emoji: "🥦", name: "Vegetables", description: "Everyday essentials" },
  { emoji: "🥛", name: "Dairy", description: "Daily goodness" },
  { emoji: "🍞", name: "Bakery", description: "Fresh favourites" },
  { emoji: "🥣", name: "Breakfast", description: "Start your day" },
  { emoji: "🍿", name: "Snacks", description: "Little treats" },
];

function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <ShoppingBasket size={24} />
            </span>
            <span>
              <span className="block font-display text-2xl font-bold tracking-tight">
                FreshCart
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Smarter everyday shopping
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            <a href="#categories" className="transition hover:text-primary">
              Categories
            </a>
            <a href="#how-it-works" className="transition hover:text-primary">
              How it works
            </a>
            <a href="#why-freshcart" className="transition hover:text-primary">
              Why FreshCart
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="rounded-full px-4 py-2.5 text-sm font-semibold transition hover:bg-secondary"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:opacity-90"
            >
              Get started <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative">
        <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-secondary/70 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:py-28">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-4 py-2 text-sm font-semibold text-primary shadow-sm">
              <Sparkles size={16} />
              Grocery shopping, made more personal
            </div>

            <h1 className="max-w-2xl font-display text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Good food.
              <br />
              <span className="text-primary">Better choices.</span>
              <br />
              Your kind of cart.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              Discover everyday groceries with a smarter shopping experience.
              Explore your favourites, find new picks, and build a cart that
              fits your routine.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:opacity-90"
              >
                Start shopping <ArrowRight size={18} />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card px-7 py-4 font-semibold transition hover:bg-secondary"
              >
                I have an account
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-primary" />
                Personalised recommendations
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-primary" />
                Simple online checkout
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute inset-6 rounded-[3rem] bg-primary/10 blur-2xl" />
            <div className="relative rounded-[2.5rem] border border-white/60 bg-card p-4 shadow-2xl sm:p-6">
              <div className="overflow-hidden rounded-[2rem] bg-secondary/60">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1100&q=85"
                  alt="A colourful selection of fresh vegetables and groceries"
                  className="h-72 w-full object-cover sm:h-96"
                />
              </div>

              <div className="relative mx-2 -mt-12 rounded-3xl border border-border/70 bg-card p-5 shadow-xl sm:mx-4 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Your shopping companion
                    </span>
                    <h2 className="mt-2 font-display text-2xl font-bold">
                      A cart that gets you
                    </h2>
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <Leaf size={25} />
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Explore products and discover recommendations based on your
                  shopping preferences.
                </p>

                <div className="mt-5 flex items-center gap-3 rounded-2xl bg-secondary/60 p-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-card text-xl">
                    🥑
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">Discover your next favourite</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Explore more in every aisle
                    </p>
                  </div>
                  <Sparkles size={18} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="absolute -left-4 top-12 hidden items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-lg sm:flex">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                <ShoppingBasket size={22} />
              </span>
              <div>
                <p className="font-semibold">Your everyday basket</p>
                <p className="text-xs text-muted-foreground">
                  All your essentials in one place
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="border-y border-border/70 bg-card/60">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Explore the aisles
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                Something for every day
              </h2>
              <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
                From fresh produce to pantry staples, explore the categories
                that make everyday shopping easier.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 font-semibold text-primary transition hover:gap-3"
            >
              Explore FreshCart <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to="/login"
                className="group rounded-3xl border border-border/80 bg-background p-5 transition duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-3xl transition group-hover:scale-105">
                  {category.emoji}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">
                  {category.name}
                </h3>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
            Shopping, simplified
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Three steps to a better basket
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: <ShoppingBasket size={25} />,
              number: "01",
              title: "Explore products",
              description:
                "Browse grocery categories and find the everyday essentials you need.",
            },
            {
              icon: <Sparkles size={25} />,
              number: "02",
              title: "Find your favourites",
              description:
                "Use FreshCart's recommendation experience to discover relevant products.",
            },
            {
              icon: <Truck size={25} />,
              number: "03",
              title: "Checkout with ease",
              description:
                "Build your basket and follow the available checkout process.",
            },
          ].map((step) => (
            <article
              key={step.number}
              className="rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-lg sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
                  {step.icon}
                </span>
                <span className="font-display text-4xl font-bold text-primary/20">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-7 font-display text-2xl font-bold">
                {step.title}
              </h3>
              <p className="mt-3 leading-7 text-muted-foreground">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="why-freshcart" className="px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 rounded-[2rem] bg-hero p-8 text-primary-foreground sm:p-12 lg:flex-row lg:items-center lg:p-16">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] opacity-80">
              Make room for smarter shopping
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
              Your next grocery run starts here.
            </h2>
            <p className="mt-4 max-w-xl leading-7 opacity-85">
              Get started with FreshCart and explore a more personal way to
              shop for your everyday needs.
            </p>
          </div>
          <Link
            to="/register"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-background px-7 py-4 font-bold text-foreground transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Create your account <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-9 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Link to="/" className="font-display text-xl font-bold">
              FreshCart
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              A smarter way to explore everyday groceries.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
            <Link to="/login" className="transition hover:text-primary">
              Login
            </Link>
            <Link to="/register" className="transition hover:text-primary">
              Register
            </Link>
            <a href="mailto:support@freshcart.example" className="transition hover:text-primary">
              Contact
            </a>
          </div>
        </div>
        <div className="border-t border-border/70 px-5 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} FreshCart. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
