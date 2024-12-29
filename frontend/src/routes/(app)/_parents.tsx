import { AppHeader } from "@/components/common/AppHeader";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_parents")({
  // Before loading, we check if the user is authenticated and has the correct group
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
    if (
      context.auth.user?.group !== "parent" &&
      context.auth.user?.group !== "admin"
    ) {
      throw redirect({
        to: "/unauthorized",
      });
    }
  },
  component: ParentsLayout,
});

function ParentsLayout() {
  return (
    <div>
      <AppHeader />
      <h1>Parents Layout</h1>
      <Outlet />
    </div>
  );
}
