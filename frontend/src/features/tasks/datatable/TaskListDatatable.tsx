import { DataTableCore } from "@/components/datatable/DataTableCore";
import { Card } from "@/components/ui/card";
import { AddTaskModal } from "@/features/tasks/components/AddTaskModal";
import { TaskListActions } from "@/features/tasks/datatable/TaskListActions";
import { taskListColumns } from "@/features/tasks/datatable/TaskListColumns";
import { useTasks } from "@/features/tasks/hooks/useTasks";

export const TaskListDatatable = () => {
  const { tasks } = useTasks();

  return (
    <Card className="p-2">
      <DataTableCore
        columns={taskListColumns}
        data={tasks || []}
        actions={<AddTaskModal />}
        options={<TaskListActions />}
      />
    </Card>
  );
};
