
import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const { data, error: signupError } =
        await supabase.auth.signUp({
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
          "Account created. Check your email to confirm your account, then sign in."
        );
        return;
      }

      // The database trigger creates the profile.
      // Registration never assigns an admin role.
      const role = await getUserRole();

      if (!role) {
        throw new Error("Your profile could not be loaded.");
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
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
        <Link to="/" className="text-sm text-primary hover:underline">
          ← Back to FreshCart
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-foreground">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Join FreshCart for smarter grocery shopping.
        </p>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Full name
            </label>
            <input
              id="name"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="register-email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="register-email"
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
            <label htmlFor="register-password" className="mb-1 block text-sm font-medium">
              Password
            </label>
            <input
              id="register-password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2"
              placeholder="At least 8 characters"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          {message && (
            <p role="status" className="text-sm text-primary">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
