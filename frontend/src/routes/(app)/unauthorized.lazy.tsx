import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(app)/unauthorized")({
  component: UnauthorizedPage,
});

function UnauthorizedPage() {
  return (
    <div>
      Hello, this is the unauthorized page.
      <div>You do not have access to this page.</div>
    </div>
  );
}
