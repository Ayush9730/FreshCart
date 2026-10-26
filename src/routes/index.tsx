
import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getDashboardPath, getUserRole } from "@/lib/auth";

export const Route = createFileRoute("/")({
  component: HomeRedirect,
});

function HomeRedirect() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function redirectUser() {
      try {
        const role = await getUserRole();

        if (!active) return;

        if (!role) {
          await navigate({ to: "/login", replace: true });
        } else {
          await navigate({
            to: getDashboardPath(role),
            replace: true,
          });
        }
      } catch {
        if (active) {
          setError(
            "Unable to verify your session. Please try opening /login."
          );
        }
      }
    }

    void redirectUser();

    return () => {
      active = false;
    };
  }, [navigate]);

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <div className="text-center">
          <p role="alert">{error}</p>
          <a className="mt-4 inline-block underline" href="/login">
            Go to login
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p>Loading FreshCart...</p>
    </main>
  );
}
