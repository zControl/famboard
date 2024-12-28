import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_parents/parents/manage")({
  component: ParentsManagePage,
});

function ParentsManagePage() {
  return (
    <div>
      <p>This is the parents manage page. Only parents have access.</p>
    </div>
  );
}
