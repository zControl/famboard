import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_parents/parents/tasks/$taskId")({
  component: PostComponent,
});

function PostComponent() {
  // In a component!
  const { taskId } = Route.useParams();
  return <div>Task ID: {taskId}</div>;
}
