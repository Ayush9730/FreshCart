
import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { getDashboardPath, getUserRole } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!active) return;

        if (session) {
          const role = await getUserRole();

          if (active && role) {
            await navigate({
              to: getDashboardPath(role),
              replace: true,
            });
            return;
          }
        }
      } catch {
        if (active) {
          setError("Unable to load your account. Please try again.");
        }
      } finally {
        if (active) setCheckingSession(false);
      }
    }

    void checkSession();

    return () => {
      active = false;
    };
  }, [navigate]);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError) throw loginError;

      const role = await getUserRole();

      if (!role) {
        await supabase.auth.signOut();
        throw new Error("Your account profile could not be found.");
      }

      await navigate({
        to: getDashboardPath(role),
        replace: true,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed. Check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Checking your session...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
        <Link to="/" className="text-sm text-primary hover:underline">
          ← Back to FreshCart
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-foreground">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to continue to FreshCart.
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label htmlFor="login-email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="login-password" className="mb-1 block text-sm font-medium">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2"
              placeholder="Your password"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New to FreshCart?{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}
