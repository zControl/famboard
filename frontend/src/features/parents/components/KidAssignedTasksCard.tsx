import { DataTableCore } from "@/common/datatable/DataTableCore";
import { ColumnTitle } from "@/common/datatable/headers/ColumnTitle";
import { Spinner } from "@/common/ui/feedback/spinner";
import { useAssignedTasksByUser } from "@/features/tasks/hooks/useAssignedTasksByUser";
import { ColumnDef } from "@tanstack/react-table";

const activeTasksColumns: ColumnDef<{
  title: string;
}>[] = [
  {
    accessorKey: "title",
    header: () => <ColumnTitle title="Title" />,
    cell: ({ row }) => <div>{row.original.title}</div>,
  },
];

export const AssignedTasksDatatable = ({ userId }: { userId: string }) => {
  const { assignedTasks, isLoading } = useAssignedTasksByUser(userId);
  return (
    <div className="w-full border rounded-lg">
      {isLoading ? (
        <Spinner />
      ) : (
        <DataTableCore
          columns={activeTasksColumns}
          data={assignedTasks || []}
          title="Assigned"
          showPagination={false}
          showColumnVisibility={false}
          headerClassName="bg-transparent"
        />
      )}
    </div>
  );
};
