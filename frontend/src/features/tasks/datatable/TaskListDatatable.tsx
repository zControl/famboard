import { DataTableCore } from "@/components/composites/DataTableCore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { AddTaskModal } from "@/features/tasks/components/AddTaskModal";
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

  const columns = [
    {
      header: "Actions",
      cell: () => {
        return (
          <>
            <span>Actions</span>
          </>
        );
      },
    },
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Frequency",
      accessorKey: "frequency",
    },
    {
      header: "Difficulty",
      accessorKey: "difficulty",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Priority",
      accessorKey: "priority",
    },
    {
      header: "Note",
      accessorKey: "note",
    },
  ];

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
          columns={columns}
          data={data || []}
        />
      )}
    </Card>
  );
};
