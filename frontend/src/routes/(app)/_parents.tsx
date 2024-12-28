import { AppHeader } from "@/components/common/AppHeader";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_parents")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }

    // Only parent and admin users can access this route
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
