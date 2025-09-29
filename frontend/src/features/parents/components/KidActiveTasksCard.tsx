import { DataTableCore } from "@/components/datatable/DataTableCore";
import { Spinner } from "@/components/ui/spinner";
import { useUserAssignedTasks } from "@/features/tasks/hooks/useUserAssignedTasks";
import { ColumnDef } from "@tanstack/react-table";

interface CustomHeaderProps {
  title: string;
  className?: string;
}

export const CustomHeader = ({ title, className }: CustomHeaderProps) => (
  <div className={className}>{title}</div>
);

const activeTasksColumns: ColumnDef<{
  sequenceNumber: number;
  title: string;
}>[] = [
  {
    accessorKey: "title",
    header: () => <CustomHeader title="Title" />,
    cell: ({ row }) => <div>{row.original.title}</div>,
  },
];

export const KidActiveTasksCard = ({ userId }: { userId: string }) => {
  const { assignedTasks, isLoading } = useUserAssignedTasks(userId);
  return (
    <div className="w-full border rounded-lg px-2">
      {isLoading ? (
        <Spinner />
      ) : (
        <DataTableCore
          columns={activeTasksColumns}
          data={assignedTasks || []}
          title="Active Tasks"
          caption={assignedTasks?.length + " tasks"}
          showPagination={false}
          showColumnVisibility={false}
          headerClassName="bg-transparent"
        />
      )}
    </div>
  );
};
