import { RowActionsMenu } from "@/components/datatable/cells/RowActionsMenu";
import { SelectOptionCell } from "@/components/datatable/cells/SelectOptionCell";
import { AscDescSortHeader } from "@/components/datatable/headers/AscDescSortHeader";
import { ColumFilterDropdown } from "@/components/datatable/headers/ColumFilterDropdown";
import { ColumnTitle } from "@/components/datatable/headers/ColumnTitle";
import { SearchInputHeader } from "@/components/datatable/headers/SearchInputHeader";
import { SupremeColumnHeader } from "@/components/datatable/headers/SupremeColumnHeader";
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
    enableColumnFilter: true,
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
      <div className="flex items-center px-2 justify-between border-l border-blue-500">
        <ColumnTitle title="Category" />
        <div className="flex items-center">
          <ColumFilterDropdown
            column={column}
            options={Object.values(TaskCategory).map((category) => ({
              value: category,
              label: category,
            }))}
          />
          <AscDescSortHeader column={column} />
        </div>
      </div>
    ),
    cell: ({ row }) => (
      <div className="border-l border-blue-500">
        <SelectOptionCell
          row={row}
          options={Object.values(TaskCategory).map((category) => ({
            value: category,
            label: category,
          }))}
        />
      </div>
    ),
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "frequency",
    enableSorting: false,
    enableColumnFilter: false,
    header: ({ column }) => (
      <SupremeColumnHeader column={column} title="Frequency" />
    ),
  },
  {
    accessorKey: "difficulty",
    enableSorting: true,
    enableColumnFilter: false,
    header: ({ column }) => (
      <SupremeColumnHeader column={column} title="Difficulty" />
    ),
  },
  {
    accessorKey: "status",
    enableSorting: false,
    enableColumnFilter: true,
    header: ({ column }) => (
      <SupremeColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "priority",
    enableSorting: true,
    enableColumnFilter: true,
    header: ({ column }) => (
      <SupremeColumnHeader column={column} title="Priority" />
    ),
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
