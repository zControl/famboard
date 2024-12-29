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
