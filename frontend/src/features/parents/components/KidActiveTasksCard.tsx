import { DataTableCore } from "@/components/datatable/DataTableCore";
import { Card } from "@/components/ui/card";
import { useUserAssignedTasks } from "@/features/tasks/hooks/useUserAssignedTasks";
import { ColumnDef } from "@tanstack/react-table";

const activeTasksColumns: ColumnDef<{
  sequenceNumber: number;
  title: string;
}>[] = [
  {
    header: "Task",
    accessorKey: "sequenceNumber",
    cell: ({ row }) => <div>{row.original.sequenceNumber}</div>,
  },
  {
    header: "Title",
    accessorKey: "title",
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
        caption="This is the main list of tasks."
        showPagination={false}
        showColumnVisibility={false}
      />
    </Card>
  );
};
