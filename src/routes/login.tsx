
import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Leaf,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShoppingBasket,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getDashboardPath, getUserRole } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        <LoaderCircle className="mr-3 animate-spin text-primary" size={22} />
        <p className="text-sm font-medium text-muted-foreground">
          Checking your session...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background lg:grid lg:grid-cols-2">
      <section className="relative hidden min-h-screen overflow-hidden bg-hero p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div className="absolute -right-28 top-28 h-80 w-80 rounded-full border border-white/15" />
        <div className="absolute -right-12 top-44 h-64 w-64 rounded-full border border-white/15" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        <Link to="/" className="relative z-10 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
            <ShoppingBasket size={27} />
          </span>
          <span>
            <span className="block font-display text-2xl font-bold">FreshCart</span>
            <span className="text-xs tracking-wide text-white/75">
              Smarter everyday shopping
            </span>
          </span>
        </Link>

        <div className="relative z-10 max-w-xl py-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
            <Leaf size={16} />
            Your everyday grocery companion
          </span>
          <h1 className="mt-8 font-display text-5xl font-bold leading-tight xl:text-6xl">
            A little smarter.
            <br />
            A little fresher.
            <br />
            Every day.
          </h1>
          <p className="mt-6 max-w-md text-base leading-8 text-white/80">
            Your favourites, your routine, your shopping experience. Sign in
            and pick up where you left off.
          </p>

          <div className="mt-10 overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=85"
              alt="Fresh colourful vegetables at a grocery market"
              className="h-52 w-full rounded-2xl object-cover xl:h-64"
            />
            <div className="flex items-center gap-3 px-3 py-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                <ShoppingBasket size={22} />
              </span>
              <div>
                <p className="font-semibold">Welcome to your FreshCart</p>
                <p className="mt-1 text-sm text-white/75">
                  Good choices start with a simple basket.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/65">
          FreshCart · Your everyday shopping companion
        </p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft size={16} />
            Back to FreshCart
          </Link>

          <div className="mt-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary lg:hidden">
              <ShoppingBasket size={28} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Welcome back
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Good to see you.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Sign in to explore your groceries and personalised
              recommendations.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-9 space-y-5">
            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-sm font-semibold"
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={19}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="login-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-input bg-card pl-12 pr-4 outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="login-password"
                  className="text-sm font-semibold"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-input bg-card pl-12 pr-12 outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm leading-6 text-destructive"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 font-bold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle size={19} className="animate-spin" />
                  Signing you in...
                </>
              ) : (
                <>
                  Sign in to FreshCart <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">NEW TO FRESHCART?</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Link
            to="/register"
            className="flex h-14 w-full items-center justify-center rounded-2xl border border-border bg-card font-semibold transition hover:border-primary/40 hover:bg-secondary/50"
          >
            Create an account
          </Link>

          <p className="mt-8 text-center text-xs leading-5 text-muted-foreground">
            By signing in, you can access your FreshCart account and shopping
            features.
          </p>
        </div>
      </section>
    </main>
  );
}
