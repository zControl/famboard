import { RowActionsMenu } from "@/components/datatable/cells/RowActionsMenu";
import { SelectOptionCell } from "@/components/datatable/cells/SelectOptionCell";
import { AscDescSortHeader } from "@/components/datatable/headers/AscDescSortHeader";
import { SearchInputHeader } from "@/components/datatable/headers/SearchInputHeader";
import { SupremeColumnHeader } from "@/components/datatable/headers/SupremeColumnHeader";
import { TaskAssignmentsCell } from "@/features/tasks/datatable/TaskAssignmentsCell";
import { TaskAssignmentsHeader } from "@/features/tasks/datatable/TaskAssignmentsHeader";

import {
  Task,
  TaskCategory,
  TaskDifficulty,
  TaskFrequency,
  TaskPriority,
  TaskStatus,
} from "@/types/task";
import { enumToArray } from "@/utils/typeConverters";
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
    filterFn: "arrIncludesSome",
    header: ({ column }) => (
      <SupremeColumnHeader
        column={column}
        title="Category"
        options={enumToArray(TaskCategory)}
      />
    ),
    cell: ({ row }) => (
      <SelectOptionCell
        initialValue={row.original.category}
        options={enumToArray(TaskCategory)}
      />
    ),
  },
  {
    accessorKey: "frequency",
    filterFn: "arrIncludesSome",
    header: ({ column }) => (
      <SupremeColumnHeader
        column={column}
        title="Frequency"
        options={enumToArray(TaskFrequency)}
      />
    ),
    cell: ({ row }) => (
      <SelectOptionCell
        initialValue={row.original.frequency}
        options={enumToArray(TaskFrequency)}
      />
    ),
  },
  {
    accessorKey: "difficulty",
    filterFn: "arrIncludesSome",
    header: ({ column }) => (
      <SupremeColumnHeader
        column={column}
        title="Difficulty"
        options={enumToArray(TaskDifficulty)}
      />
    ),
    cell: ({ row }) => (
      <SelectOptionCell
        initialValue={row.original.difficulty}
        options={enumToArray(TaskDifficulty)}
      />
    ),
  },
  {
    accessorKey: "status",
    filterFn: "arrIncludesSome",
    header: ({ column }) => (
      <SupremeColumnHeader
        column={column}
        title="Status"
        options={enumToArray(TaskStatus)}
      />
    ),
    cell: ({ row }) => (
      <SelectOptionCell
        initialValue={row.original.status}
        options={enumToArray(TaskStatus)}
      />
    ),
  },
  {
    accessorKey: "priority",
    filterFn: "arrIncludesSome",
    header: ({ column }) => (
      <SupremeColumnHeader
        column={column}
        title="Priority"
        options={enumToArray(TaskPriority)}
      />
    ),
    cell: ({ row }) => (
      <SelectOptionCell
        initialValue={row.original.priority}
        options={enumToArray(TaskPriority)}
      />
    ),
  },
  {
    accessorKey: "note",
    header: ({ column }) => <SearchInputHeader column={column} title="Notes" />,
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActionsMenu row={row} />,
  },
];
