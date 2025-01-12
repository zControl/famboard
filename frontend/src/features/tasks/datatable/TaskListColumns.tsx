import { TableHeaderSort } from "@/components/datatable/TableHeaderSort";
import { TableHeaderTitleSearch } from "@/components/datatable/TableHeaderTitleSearch";
import { RowActionAddAssignment } from "@/features/tasks/datatable/RowActionAddAssignment";
import { RowActionsMenu } from "@/features/tasks/datatable/RowActionsMenu";
import { TaskAssignmentsCell } from "@/features/tasks/datatable/TaskAssignmentsCell";
import { TaskAssignmentsHeader } from "@/features/tasks/datatable/TaskAssignmentsHeader";

import { Task } from "@/types/task";
import { ColumnDef } from "@tanstack/react-table";

export const taskListColumns: ColumnDef<Task>[] = [
  {
    accessorKey: "sequenceNumber",
    enableSorting: true,
    enableHiding: false,
    header: ({ column }) => <TableHeaderSort column={column} />,
    cell: ({ row }) => {
      const task = row.original;
      return task.sequenceNumber;
    },
  },
  {
    accessorKey: "assigned",
    header: ({ column }) => (
      <TaskAssignmentsHeader column={column} title="Assigned" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-row justify-between items-center space-x-4">
        <TaskAssignmentsCell row={row} /> <RowActionAddAssignment row={row} />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <TableHeaderTitleSearch column={column} title="Title" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <TableHeaderTitleSearch column={column} title="Description" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <TableHeaderTitleSearch column={column} title="Category" />
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
  {
    id: "actions",
    cell: ({ row }) => <RowActionsMenu row={row} />,
  },
];
