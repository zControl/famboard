import { DataTableCore } from "@/components/datatable/DataTableCore";
import { Card } from "@/components/ui/card";
import { TaskModal } from "@/features/tasks/components/TaskModal";
import { taskListColumns } from "@/features/tasks/datatable/TaskListColumns";
import { TaskListOptions } from "@/features/tasks/datatable/TaskListOptions";
import { useTasks } from "@/features/tasks/hooks/useTasks";

export const TaskListDatatable = () => {
  const { tasks } = useTasks();

  const initialState = {
    columnVisibility: {
      id: false,
      sequenceNumber: true,
      title: true,
      description: true,
      assigned: true,
      pointValue: true,
      note: false,
      frequency: false,
      category: false,
      status: false,
      difficulty: false,
      priority: false,
    },
    sorting: [
      {
        id: "sequenceNumber",
        desc: false,
      },
    ],
  };

  return (
    <Card className="p-2">
      <DataTableCore
        columns={taskListColumns}
        data={tasks || []}
        actions={<TaskModal />}
        options={<TaskListOptions />}
        initialState={initialState}
      />
    </Card>
  );
};
