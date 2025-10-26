import { DataTableCore } from "@/components/datatable/DataTableCore";
import { ColumnTitle } from "@/components/datatable/headers/ColumnTitle";
import { Spinner } from "@/components/ui/spinner";
import { useUserAssignedTasks } from "@/features/tasks/hooks/useUserAssignedTasks";
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

export const KidActiveTasksCard = ({ userId }: { userId: string }) => {
  const { assignedTasks, isLoading } = useUserAssignedTasks(userId);
  return (
    <div className="w-full border rounded-lg">
      {isLoading ? (
        <Spinner />
      ) : (
        <DataTableCore
          columns={activeTasksColumns}
          data={assignedTasks || []}
          title="Active Tasks"
          showPagination={false}
          showColumnVisibility={false}
          headerClassName="bg-transparent"
        />
      )}
    </div>
  );
};
