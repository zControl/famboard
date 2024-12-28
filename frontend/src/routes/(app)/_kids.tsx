import { AppHeader } from "@/components/common/AppHeader";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_kids")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: KidsLayout,
});

function KidsLayout() {
  return (
    <div>
      <AppHeader />
      <h1>Kids Layout</h1>
      <Outlet />
    </div>
  );
}
