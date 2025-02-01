import { DataTableCore } from "@/components/datatable/DataTableCore";
import { SupremeColumnHeader } from "@/components/datatable/headers/SupremeColumnHeader";
import { Card } from "@/components/ui/card";
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
    accessorKey: "sequenceNumber",
    enableColumnFilter: false,
    header: ({ column }) => (
      <SupremeColumnHeader
        column={column}
        title="Task"
        className="text-blue-600 font-bold"
      />
    ),
    cell: ({ row }) => <div>{row.original.sequenceNumber}</div>,
  },
  {
    accessorKey: "title",
    header: () => (
      <CustomHeader title="Title" className="text-blue-600 font-bold" />
    ),
    cell: ({ row }) => <div>{row.original.title}</div>,
  },
];

export const KidActiveTasksCard = ({ userId }: { userId: string }) => {
  const { assignedTasks, isLoading } = useUserAssignedTasks(userId);
  if (isLoading) return <div>Loading...</div>;
  return (
    <Card className="rounded-none w-full">
      <DataTableCore
        columns={activeTasksColumns}
        data={assignedTasks || []}
        caption={assignedTasks?.length + " tasks"}
        showPagination={false}
        showColumnVisibility={false}
        headerClassName="bg-transparent"
      />
    </Card>
  );
};
