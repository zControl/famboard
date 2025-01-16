import { RowActionsMenu } from "@/components/datatable/cells/RowActionsMenu";
import { SelectOptionCell } from "@/components/datatable/cells/SelectOptionCell";
import { AscDescSortHeader } from "@/components/datatable/headers/AscDescSortHeader";
import { SearchInputHeader } from "@/components/datatable/headers/SearchInputHeader";
import { TaskAssignmentsCell } from "@/features/tasks/datatable/TaskAssignmentsCell";
import { TaskAssignmentsHeader } from "@/features/tasks/datatable/TaskAssignmentsHeader";

import { Task, TaskCategory } from "@/types/task";
import { ColumnDef } from "@tanstack/react-table";

export const taskListColumns: ColumnDef<Task>[] = [
  {
    accessorKey: "sequenceNumber",
    enableSorting: true,
    enableHiding: false,
    header: ({ column }) => <AscDescSortHeader column={column} />,
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
        <TaskAssignmentsCell row={row} />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SearchInputHeader column={column} title="Title" />,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <SearchInputHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <SearchInputHeader column={column} title="Category" />
    ),
    cell: ({ row }) => (
      <SelectOptionCell
        row={row}
        options={Object.values(TaskCategory).map((category) => ({
          value: category,
          label: category,
        }))}
      />
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
