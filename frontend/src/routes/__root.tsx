import { NotFoundPage } from "@/common/error/NotFoundPage";
import { useTheme } from "@/common/theme/useTheme";
import { Toaster } from "@/common/ui/feedback/sonner";
import { AuthContext } from "@/features/auth/AuthContext";
import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  ErrorComponent,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../globals.css";

interface AppRouterContext {
  auth: AuthContext;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<AppRouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorComponent,
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
