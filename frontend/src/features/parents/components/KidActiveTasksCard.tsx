import { DataTableCore } from "@/components/datatable/DataTableCore";
import { Card } from "@/components/ui/card";
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

const sampleData = [
  {
    sequenceNumber: 9,
    title: "adv",
  },
  {
    sequenceNumber: 12,
    title: "Clean kitchen",
  },
];

export const KidActiveTasksCard = ({ userId }: { userId: string }) => {
  return (
    <Card className="rounded-none w-full">
      Active Tasks for {userId}
      <DataTableCore
        columns={activeTasksColumns}
        data={sampleData || []}
        caption="This is the main list of tasks."
        showPagination={false}
        showColumnVisibility={false}
      />
    </Card>
  );
};
