import { DataTableCore } from "@/components/datatable/DataTableCore";
import { SupremeColumnHeader } from "@/components/datatable/headers/SupremeColumnHeader";
import { Spinner } from "@/components/ui/spinner";
import { useUserAssignedTasks } from "@/features/tasks/hooks/useUserAssignedTasks";
import { ColumnDef } from "@tanstack/react-table";

const activeTasksColumns: ColumnDef<{
  sequenceNumber: number;
  title: string;
}>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <SupremeColumnHeader column={column} title="Task Name" />
    ),
    cell: ({ row }) => <div>{row.original.title}</div>,
  },
];

export const KidApprovalsCard = ({ userId }: { userId: string }) => {
  const { assignedTasks, isLoading } = useUserAssignedTasks(userId);
  return (
    <div className="w-full border rounded-lg px-2">
      {isLoading ? (
        <Spinner />
      ) : (
        <DataTableCore
          columns={activeTasksColumns}
          data={assignedTasks || []}
          title="Waiting Approval - THIS IS NOT CORRECT."
          caption={assignedTasks?.length + " approvals"}
          showPagination={false}
          showColumnVisibility={false}
          headerClassName="bg-transparent"
        />
      )}
    </div>
  );
};
