import { DataTableCore } from "@/components/composites/DataTableCore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { AddTaskModal } from "@/features/tasks/components/AddTaskModal";
import { taskListColumns } from "@/features/tasks/datatable/TaskListColumns";
import { Task } from "@/types/task";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";

export const TaskListDatatable = () => {
  const queryClient = useQueryClient();

  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: async (): Promise<Task[]> => {
      const res = await fetch("http://localhost:3000/v1/tasks");
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      return await res.json();
    },
  });

  const Actions = () => {
    return (
      <Button
        variant={"ghost"}
        onClick={() => queryClient.invalidateQueries({ queryKey: ["tasks"] })}
      >
        <RefreshCcw />
      </Button>
    );
  };

  return (
    <Card className="p-2">
      {isPending && <Spinner size="lg" />}
      {isError && (
        <div>An error has occurred: {error?.message || "Unknown error"}</div>
      )}
      {!isError && !isPending && !isFetching && (
        <DataTableCore
          actions={<Actions />}
          toolbar={<AddTaskModal />}
          columns={taskListColumns}
          data={data || []}
        />
      )}
    </Card>
  );
};
