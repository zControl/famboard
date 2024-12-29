import { PageContainer } from "@/components/common/PageContainer";
import { sampleTasks } from "@/seed/tasks/sample-tasks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_parents/parents/tasks")({
  component: ParentsTasksPage,
});

function ParentsTasksPage() {
  return (
    <PageContainer title="Parents | Tasks" description="Manage each kid here.">
      <div className="w-full">
        This page will have a table that lists all the tasks that can be
        assigned.
      </div>
      <div className="w-full">
        You can filter on a task, and categorize them.
      </div>
      <div className="grid grid-cols-1 border border-blue-500">
        <div className="w-full border border-red-500">
          Tasks Data Table Here
        </div>
        <div>
          map over the items
          {sampleTasks.map((task) => (
            <div key={task.id}>
              <div>{task.id}</div>
              <div>{task.title}</div>
              <div>{task.category}</div>
              <div>{task.frequency}</div>
              <div>{task.difficulty}</div>
              <div>{task.status}</div>
              <div>{task.priority}</div>
              <div>{task.description}</div>
              <div>{task.note}</div>
              <div>{task.tags?.entries()}</div>
              <div>{task.assignedTo}</div>
              <div>{task.comments?.entries()}</div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
