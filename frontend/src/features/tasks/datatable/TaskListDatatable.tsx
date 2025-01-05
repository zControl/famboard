import { DataTableCore } from "@/components/datatable/DataTableCore";
import { Card } from "@/components/ui/card";
import { AddTaskModal } from "@/features/tasks/components/AddTaskModal";
import { taskListColumns } from "@/features/tasks/datatable/TaskListColumns";
import { TaskListOptions } from "@/features/tasks/datatable/TaskListOptions";
import { useTasks } from "@/features/tasks/hooks/useTasks";

export const TaskListDatatable = () => {
  const { tasks } = useTasks();

  return (
    <Card className="p-2">
      <DataTableCore
        columns={taskListColumns}
        data={tasks || []}
        actions={<AddTaskModal />}
        options={<TaskListOptions />}
        caption="This is the main list of tasks."
      />
    </Card>
  );
};
