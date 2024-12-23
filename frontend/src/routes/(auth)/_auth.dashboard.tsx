import { useAuth } from "@/features/auth/hooks/useAuth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const auth = useAuth();

  return (
    <section className="grid gap-2 p-2">
      <p>Hi {auth.user?.username}!</p>
      <p>You are currently on the dashboard route.</p>
    </section>
  );
}
