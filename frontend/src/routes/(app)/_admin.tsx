import { AppHeader } from "@/components/common/AppHeader";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_admin")({
  // Before loading, we check if the user is authenticated and has the correct group
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
    if (context.auth.user?.group !== "admin") {
      throw redirect({
        to: "/unauthorized",
      });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <>
      <AppHeader />
      <div>
        <h1>Admin</h1>
        <h2>Admin Layout</h2>
        <h3>We are awesome.</h3>
      </div>
      <Outlet />
    </>
  );
}
