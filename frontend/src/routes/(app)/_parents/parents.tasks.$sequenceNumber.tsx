import { PageContainer } from "@/components/common/PageContainer";
import { TaskTile } from "@/features/tasks/components/TaskTile";

import { useTaskBySequenceNumber } from "@/features/tasks/hooks/useTasks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(app)/_parents/parents/tasks/$sequenceNumber",
)({
  component: TaskPage,
});

function TaskPage() {
  const { sequenceNumber } = Route.useParams();
  const {
    data: task,
    isLoading,
    error,
  } = useTaskBySequenceNumber(sequenceNumber);
  return (
    <PageContainer
      title={`${task?.title || "Task"}`}
      description={`${task?.description || "Description"}`}
    >
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {task && <TaskTile task={task} sequenceNumber={sequenceNumber} />}
    </PageContainer>
  );
}
