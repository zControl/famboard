import { UnauthorizedPage } from "@/common/error/UnauthorizedPage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(app)/unauthorized")({
  component: UnauthorizedPage,
});
