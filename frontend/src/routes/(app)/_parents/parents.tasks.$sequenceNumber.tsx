import { ErrorCard } from "@/common/error/ErrorCard";
import { PageContainer } from "@/common/layout/PageContainer";
import { Spinner } from "@/common/ui/feedback/spinner";
import { TaskTile } from "@/features/tasks/components/TaskTile";

import { useTaskBySequenceNumber } from "@/features/tasks/hooks/useTaskBySequenceNumber";
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

  if (isLoading)
    return (
      <PageContainer title="Loading...">
        <Spinner size="xl" />
      </PageContainer>
    );

  if (error)
    return (
      <PageContainer title="Error">
        <ErrorCard error={error ? error : new Error("Something went wrong")} />
      </PageContainer>
    );

  if (!task)
    return (
      <PageContainer title="Not Found">
        <ErrorCard error={new Error("Task not found")} />
      </PageContainer>
    );

  return (
    <PageContainer title={task.title} description={task.description}>
      <TaskTile task={task} />
    </PageContainer>
  );
}
