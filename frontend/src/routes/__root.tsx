import { ErrorPage } from "@/components/common/ErrorPage";
import { NotFound } from "@/components/common/NotFound";
import { useTheme } from "@/components/common/theme/useTheme";
import { Toaster } from "@/components/ui/sonner";
import { AuthContext } from "@/features/auth/AuthContext";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
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
