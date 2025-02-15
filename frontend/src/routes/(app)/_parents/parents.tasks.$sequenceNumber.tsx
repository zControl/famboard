import { getTask } from "@/features/tasks/api/taskApi";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(app)/_parents/parents/tasks/$sequenceNumber",
)({
  loader: async ({ params }) => {
    const taskDetails = getTask(params.sequenceNumber);
    return taskDetails;
  },
  component: TaskPage,
});

function TaskPage() {
  const { sequenceNumber } = Route.useParams();
  const { ...task } = Route.useLoaderData();
  return (
    <>
      <div>Task ID: {sequenceNumber}</div>
      <div>Task from loader data: {task.id}</div>
      <div>Title from loader data: {task.title}</div>
    </>
  );
}
