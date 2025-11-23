import { ErrorPage } from "@/common/error/ErrorPage";
import { NotFound } from "@/common/layout/NotFound";
import { useTheme } from "@/common/theme/useTheme";
import { Toaster } from "@/common/ui/feedback/sonner";
import { AuthContext } from "@/features/auth/AuthContext";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../globals.css";

interface AppRouterContext {
  auth: AuthContext;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<AppRouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFound,
  errorComponent: ErrorPage,
});

function RootLayout() {
  const { theme } = useTheme();
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
      <Toaster
        closeButton
        position="top-center"
        richColors
        theme={theme}
        toastOptions={{}}
      />
    </>
  );
}
