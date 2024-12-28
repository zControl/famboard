import { AppHeader } from "@/components/common/AppHeader";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_parents")({
  /**
   * This function is a TanStack Router "beforeLoad" hook, which gets called
   * whenever a user tries to access the route at "/(app)/_parents". The purpose
   * of this hook is to verify that the user is allowed to access this route.
   *
   * Specifically, we check two conditions:
   *
   * 1. Is the user logged in? If not, redirect them to the login page.
   * 2. Is the user in the "parent" or "admin" group? If not, redirect them to
   *    the unauthorized page.
   *
   * If either of these conditions is false, we throw a redirect to the
   * appropriate page.
   */
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        /**
         * If the user isn't logged in, redirect them to the login page.
         */
        to: "/login",
      });
    }

    if (
      context.auth.user?.group !== "parent" &&
      context.auth.user?.group !== "admin"
    ) {
      throw redirect({
        /**
         * If the user is logged in but not in the "parent" or "admin" group,
         * redirect them to the unauthorized page.
         */
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
