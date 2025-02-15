import { DataTableCore } from "@/components/datatable/DataTableCore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TaskModal } from "@/features/tasks/components/TaskModal";
import { taskListColumns } from "@/features/tasks/datatable/TaskListColumns";
import { TaskListOptions } from "@/features/tasks/datatable/TaskListOptions";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useState } from "react";

export const TaskListDatatable = () => {
  const [open, setOpen] = useState(false);
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
        options={<TaskListOptions />}
        actions={
          <Button variant={"primary"} onClick={() => setOpen(true)}>
            Add Task
          </Button>
        }
        initialState={initialState}
      />
      <TaskModal modalOpen={open} onModalOpenChange={setOpen} />
    </Card>
  );
};
