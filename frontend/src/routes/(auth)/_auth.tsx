import { AppHeader } from "@/components/common/AppHeader";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <>
      <AppHeader />
      <div className="p-2 h-full">
        <h1>Authenticated Route</h1>
        <p>This route's content is only visible to authenticated users.</p>
        <hr />
        <Outlet />
      </div>
    </>
  );
}
