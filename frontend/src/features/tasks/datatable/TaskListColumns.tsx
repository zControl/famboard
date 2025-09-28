import { SelectOptionCell } from "@/components/datatable/cells/SelectOptionCell";
import { AscDescSortHeader } from "@/components/datatable/headers/AscDescSortHeader";
import { SearchInputHeader } from "@/components/datatable/headers/SearchInputHeader";
import { SupremeColumnHeader } from "@/components/datatable/headers/SupremeColumnHeader";
import { Coin } from "@/components/ui/coin";
import { CustomLink } from "@/components/ui/custom-link";
import { EditableTextCell } from "@/features/tasks/datatable/EditableTextCell";
import { TaskAssignmentsCell } from "@/features/tasks/datatable/TaskAssignmentsCell";
import { TaskAssignmentsHeader } from "@/features/tasks/datatable/TaskAssignmentsHeader";
import { TaskRowActions } from "@/features/tasks/datatable/TaskRowActions";

import {
  Task,
  TaskCategory,
  TaskDifficulty,
  TaskFrequency,
  TaskPriority,
  TaskStatus,
} from "@/types/task";
import { enumToArray } from "@/utils/enumToArray";
import { ColumnDef } from "@tanstack/react-table";

export const taskListColumns: ColumnDef<Task>[] = [
  {
    id: "actions",
    cell: ({ row }) => <TaskRowActions row={row} />,
  },
  {
    accessorKey: "sequenceNumber",
    enableSorting: true,
    enableHiding: false,
    header: ({ column }) => <AscDescSortHeader column={column} />,
    cell: ({ row }) => (
      <CustomLink
        to={`/parents/tasks/${row.original.sequenceNumber}`}
        size="lg"
      >
        {row.original.sequenceNumber}
      </CustomLink>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SearchInputHeader column={column} title="Title" />,
    cell: ({ row }) => <EditableTextCell row={row} accessor="title" />,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <SearchInputHeader column={column} title="Description" />
    ),
    cell: ({ row }) => <EditableTextCell row={row} accessor="description" />,
  },
  {
    accessorKey: "pointValue",
    header: ({ column }) => (
      <SupremeColumnHeader column={column} title="Points" />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center text-center">
        <Coin value={row.original.pointValue} />
      </div>
    ),
  },
  {
    accessorKey: "assignedUserIds",
    filterFn: "arrIncludesSome",
    enableSorting: false,
    header: ({ column }) => (
      <TaskAssignmentsHeader column={column} title="Assigned" />
    ),
    cell: ({ row }) => <TaskAssignmentsCell row={row} />,
  },

  {
    accessorKey: "note",
    header: ({ column }) => <SearchInputHeader column={column} title="Notes" />,
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
];
