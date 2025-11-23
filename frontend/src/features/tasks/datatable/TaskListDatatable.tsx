import { DataTableCore } from "@/common/datatable/DataTableCore";
import { TableOptions } from "@/common/datatable/TableOptions";
import { Button } from "@/common/ui/actions/button";
import { Card } from "@/common/ui/surfaces/card";
import { TaskModal } from "@/features/tasks/components/TaskModal";
import { taskListColumns } from "@/features/tasks/datatable/TaskListColumns";
import { useTasksQuery } from "@/features/tasks/hooks/useTasksQuery";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const TaskListDatatable = () => {
  const [open, setOpen] = useState(false);
  const { tasks, refreshTasks } = useTasksQuery();

  const initialState = {
    columnVisibility: {
      id: false,
      title: true,
      description: true,
      assigned: true,
      pointValue: true,
      frequency: true,
      category: true,
      status: true,
      note: true,
    },
    pagination: {
      pageIndex: 0,
      pageSize: 20,
    },
    filters: [],
  };

  return (
    <Card className="p-2">
      <DataTableCore
        columns={taskListColumns}
        data={tasks?.data || []}
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
