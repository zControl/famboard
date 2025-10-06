import { DataTableCore } from "@/components/datatable/DataTableCore";
import { ColumnTitle } from "@/components/datatable/headers/ColumnTitle";
import { Spinner } from "@/components/ui/spinner";
import { ApprovalRowActions } from "@/features/parents/components/ApprovalRowActions";
import { useUserApprovals } from "@/features/tasks/hooks/useUserApprovals";
import { TaskCompletionResponse } from "@/types/task";
import { ColumnDef } from "@tanstack/react-table";

const activeApprovalsColumns: ColumnDef<TaskCompletionResponse>[] = [
  {
    accessorKey: "title",
    header: () => <ColumnTitle title="Title" />,
    cell: ({ row }) => <div>{row.original.taskTitle}</div>,
  },
  {
    accessorKey: "description",
    header: () => <ColumnTitle title="Description" />,
    cell: ({ row }) => <div>{row.original.taskDescription}</div>,
  },
  {
    accessorKey: "completed",
    header: () => <ColumnTitle title="Completed" />,
    cell: ({ row }) => {
      const completedDate = new Date(row.original.completedAt);
      return <div>{completedDate.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: () => <ColumnTitle title="Actions" />,
    cell: ({ row }) => <ApprovalRowActions row={row} />,
  },
];

export const KidApprovalsCard = ({ userId }: { userId: string }) => {
  const { approvalsList, isLoading, error } = useUserApprovals(userId);
  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading approvals</div>;
  return (
    <div className="w-full border rounded-lg">
      {isLoading ? (
        <Spinner />
      ) : (
        <DataTableCore
          columns={activeApprovalsColumns}
          data={approvalsList?.data || []}
          title="Needs Approval"
          showPagination={false}
          showColumnVisibility={false}
          headerClassName="bg-transparent"
        />
      )}
    </div>
  );
};
