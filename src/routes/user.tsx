
import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { getDashboardPath, getUserRole } from "@/lib/auth";

export const Route = createFileRoute("/user")({
  component: UserDashboard,
});

function UserDashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    async function checkAccess() {
      try {
        const role = await getUserRole();

        if (!active) return;

        if (!role) {
          await navigate({ to: "/login", replace: true });
          return;
        }

        if (role !== "customer") {
          await navigate({
            to: getDashboardPath(role),
            replace: true,
          });
          return;
        }

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (active) {
          setName(user?.user_metadata?.["full_name"] ?? "Customer");
        }
      } catch {
        if (active) {
          await navigate({ to: "/login", replace: true });
        }
      } finally {
        if (active) {
          setChecking(false);
        }
      }
    }

    void checkAccess();

    return () => {
      active = false;
    };
  }, [navigate]);

  async function logout() {
    await supabase.auth.signOut();
    await navigate({ to: "/login", replace: true });
  }

  if (checking) {
    return <main className="p-8">Checking your account...</main>;
  }

  return (
    <main className="min-h-screen bg-background p-6 md:p-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            to="/shop"
            className="text-sm text-primary hover:underline"
          >
            Shop Groceries
          </Link>

          <h1 className="mt-3 text-3xl font-bold">
            Hello, {name}!
          </h1>

          <p className="mt-2 text-muted-foreground">
            Welcome to your customer dashboard.
          </p>
        </div>

        <button
          onClick={logout}
          className="rounded-lg border border-input px-4 py-2"
        >
          Sign out
        </button>
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/shop"
          className="rounded-xl border border-border bg-card p-6 hover:border-primary"
        >
          <h2 className="text-xl font-semibold">
            Shop groceries
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Browse products and discover recommendations.
          </p>
        </Link>

        <article className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">My orders</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Order history will be connected to PostgreSQL in a later step.
          </p>
        </article>

        <article className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">
            My recommendations
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Your personalised shopping experience will be integrated here.
          </p>
        </article>
      </section>
    </main>
  );
}
