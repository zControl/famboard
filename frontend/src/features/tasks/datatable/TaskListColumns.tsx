import { TableHeaderTitleSearch } from "@/components/datatable/TableHeaderTitleSearch";
import { RowActionsMenu } from "@/features/tasks/datatable/RowActionsMenu";
import { TaskAssignmentsCell } from "@/features/tasks/datatable/TaskAssignmentsCell";

import { Task } from "@/types/task";
import { ColumnDef } from "@tanstack/react-table";

export const taskListColumns: ColumnDef<Task>[] = [
  {
    id: "actions",
    cell: ({ row }) => <RowActionsMenu row={row} />,
  },
  {
    header: "Number",
    accessorKey: "sequenceNumber",
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) => {
      const task = row.original;
      return task.sequenceNumber;
    },
  },
  {
    header: "Assigned",
    accessorKey: "assignedTo",
    cell: ({ row }) => <TaskAssignmentsCell row={row} />,
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
    accessorKey: "category",
    header: ({ column }) => (
      <>
        <TableHeaderTitleSearch column={column} title="Category" />
      </>
    ),
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
