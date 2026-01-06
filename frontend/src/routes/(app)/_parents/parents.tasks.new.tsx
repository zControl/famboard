import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_parents/parents/tasks/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div>This is where we will have a big form to create a new task.</div>
      Hello "/(app)/_parents/parents/tasks/new"!
    </div>
  );
}
