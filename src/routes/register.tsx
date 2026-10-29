
import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Leaf,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShoppingBasket,
  UserRound,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getDashboardPath, getUserRole } from "@/lib/auth";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name.trim(),
          },
        },
      });

      if (signupError) throw signupError;

      if (!data.session) {
        setMessage(
          "Your account has been created. Check your inbox for the confirmation email, confirm your address, and then sign in."
        );
        return;
      }

      // The database trigger creates the profile.
      // Public registration never assigns an admin role.
      const role = await getUserRole();

      if (!role) {
        throw new Error("Your profile could not be loaded. Please contact support.");
      }

      await navigate({
        to: getDashboardPath(role),
        replace: true,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
            A fresh start begins here
          </span>

          <h1 className="mt-8 font-display text-5xl font-bold leading-tight xl:text-6xl">
            Make everyday
            <br />
            shopping feel
            <br />
            a little brighter.
          </h1>

          <p className="mt-6 max-w-md text-base leading-8 text-white/80">
            Create your FreshCart account to explore groceries, build your
            basket, and discover products suited to your shopping preferences.
          </p>

          <div className="mt-10 overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=85"
              alt="Fresh vegetables and colourful produce at a grocery market"
              className="h-52 w-full rounded-2xl object-cover xl:h-64"
            />
            <div className="flex items-center gap-3 px-3 py-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                <CheckCircle2 size={22} />
              </span>
              <div>
                <p className="font-semibold">Your shopping journey starts here</p>
                <p className="mt-1 text-sm text-white/75">
                  One account for your FreshCart experience.
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

          <div className="mt-9">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary lg:hidden">
              <ShoppingBasket size={28} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Join FreshCart
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Let’s get started.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Create your account and discover a smarter way to shop for
              everyday groceries.
            </p>
          </div>

          <form onSubmit={handleRegister} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="register-name"
                className="mb-2 block text-sm font-semibold"
              >
                Full name
              </label>
              <div className="relative">
                <UserRound
                  size={19}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="register-name"
                  type="text"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-input bg-card pl-12 pr-4 outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="register-email"
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
                  id="register-email"
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
              <label
                htmlFor="register-password"
                className="mb-2 block text-sm font-semibold"
              >
                Create a password
              </label>
              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-input bg-card pl-12 pr-12 outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
                  placeholder="At least 8 characters"
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
              <p className="mt-2 text-xs text-muted-foreground">
                Use at least 8 characters for your password.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm leading-6 text-destructive"
              >
                {error}
              </div>
            )}

            {message && (
              <div
                role="status"
                className="rounded-2xl border border-primary/20 bg-secondary/70 p-4"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={21} />
                  <div>
                    <p className="font-semibold text-foreground">
                      Check your email
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {message}
                    </p>
                    <Link
                      to="/login"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                    >
                      Go to sign in <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
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
                  Creating your account...
                </>
              ) : (
                <>
                  Create my account <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">ALREADY A MEMBER?</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Link
            to="/login"
            className="flex h-14 w-full items-center justify-center rounded-2xl border border-border bg-card font-semibold transition hover:border-primary/40 hover:bg-secondary/50"
          >
            Sign in to your account
          </Link>

          <p className="mt-8 text-center text-xs leading-5 text-muted-foreground">
            Your account is created with the role assigned by the application's
            database. Public registration does not grant administrator access.
          </p>
        </div>
      </section>
    </main>
  );
}
