import { AppHeader } from "@/common/layout/AppHeader";
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
    <>
      <AppHeader />
      <div className="flex flex-row">
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
}
