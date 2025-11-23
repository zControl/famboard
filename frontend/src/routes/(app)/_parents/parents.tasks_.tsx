import { PageContainer } from "@/common/layout/PageContainer";
import { TaskListDatatable } from "@/features/tasks/datatable/TaskListDatatable";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_parents/parents/tasks_")({
  component: ParentsTasksPage,
});

function ParentsTasksPage() {
  return (
    <PageContainer
      title="Parents | Tasks"
      description="Manage the overall task list and assginments."
    >
      <TaskListDatatable />
    </PageContainer>
  );
}
