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
    <>
      <AppHeader />
      <div className="flex flex-row">
        {/* <div className="max-w-[200px] border border-purple-500">
          left
        </div> */}
        <div className="flex-1">
          <Outlet />
        </div>
        {/* <div className="max-w-[200px] border border-purple-500">right</div> */}
      </div>
    </>
  );
}
