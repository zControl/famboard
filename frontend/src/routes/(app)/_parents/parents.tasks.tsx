import { PageContainer } from "@/components/common/PageContainer";
import { TaskListDatatable } from "@/features/tasks/datatable/TaskListDatatable";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_parents/parents/tasks")({
  component: ParentsTasksPage,
});

function ParentsTasksPage() {
  return (
    <PageContainer title="Parents | Tasks" description="Manage each kid here.">
      <TaskListDatatable />
    </PageContainer>
  );
}
