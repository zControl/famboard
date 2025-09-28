import { DataTableCore } from "@/components/datatable/DataTableCore";
import { TableOptions } from "@/components/datatable/TableOptions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TaskModal } from "@/features/tasks/components/TaskModal";
import { taskListColumns } from "@/features/tasks/datatable/TaskListColumns";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const TaskListDatatable = () => {
  const [open, setOpen] = useState(false);
  const { tasks, refreshTasks } = useTasks();

  const initialState = {
    columnVisibility: {
      id: false,
      sequenceNumber: true,
      title: true,
      description: true,
      assigned: true,
      pointValue: true,
      note: false,
      frequency: true,
      category: true,
      status: false,
      difficulty: true,
      priority: true,
    },
    pagination: {
      pageIndex: 0,
      pageSize: 20,
    },
    sorting: [
      {
        id: "sequenceNumber",
        desc: false,
      },
    ],
    filters: [],
  };

  return (
    <Card className="p-2">
      <DataTableCore
        columns={taskListColumns}
        data={tasks || []}
        options={<TableOptions onRefresh={refreshTasks} />}
        actions={
          <Button variant={"primary"} onClick={() => setOpen(true)}>
            <PlusIcon />
            Add Task
          </Button>
        }
        initialState={initialState}
      />
      <TaskModal modalOpen={open} onModalOpenChange={setOpen} />
    </Card>
  );
};
