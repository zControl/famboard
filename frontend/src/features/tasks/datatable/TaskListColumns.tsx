import { SearchInputHeader } from "@/components/datatable/headers/SearchInputHeader";
import { SupremeColumnHeader } from "@/components/datatable/headers/SupremeColumnHeader";
import { Coin } from "@/components/ui/coin";
import { CustomLink } from "@/components/ui/custom-link";
import { EditableTextCell } from "@/features/tasks/datatable/EditableTextCell";
import { TaskAssignmentsCell } from "@/features/tasks/datatable/TaskAssignmentsCell";
import { TaskAssignmentsHeader } from "@/features/tasks/datatable/TaskAssignmentsHeader";
import { TaskCategoryCell } from "@/features/tasks/datatable/TaskCategoryCell";
import { TaskFrequencyCell } from "@/features/tasks/datatable/TaskFrequencyCell";
import { TaskRowActions } from "@/features/tasks/datatable/TaskRowActions";

import { Task, TaskCategory, TaskFrequency } from "@/types/task";
import { enumToArray } from "@/utils/enumToArray";
import { ColumnDef } from "@tanstack/react-table";

export const taskListColumns: ColumnDef<Task>[] = [
  {
    id: "actions",
    cell: ({ row }) => <TaskRowActions row={row} />,
  },
  {
    accessorKey: "assigned",
    filterFn: "arrIncludesSome",
    enableSorting: false,
    header: ({ column }) => (
      <TaskAssignmentsHeader column={column} title="Assigned" />
    ),
    cell: ({ row }) => <TaskAssignmentsCell row={row} />,
  },
  {
    accessorKey: "category",
    filterFn: "arrIncludesSome",
    header: ({ column }) => (
      <SupremeColumnHeader
        column={column}
        title="Type"
        options={enumToArray(TaskCategory)}
      />
    ),
    cell: ({ row }) => <TaskCategoryCell row={row} />,
  },

  {
    accessorKey: "title",
    header: ({ column }) => <SearchInputHeader column={column} title="Title" />,
    cell: ({ row }) => (
      <CustomLink
        to={`/parents/tasks/${row.original.sequenceNumber}`}
        size="lg"
      >
        {row.original.title}
      </CustomLink>
    ),
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
      <SupremeColumnHeader column={column} title="Coins" />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center text-center">
        <Coin value={row.original.pointValue} />
      </div>
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
    cell: ({ row }) => <TaskFrequencyCell row={row} />,
  },
  {
    accessorKey: "note",
    header: ({ column }) => <SearchInputHeader column={column} title="Notes" />,
    cell: ({ row }) => <EditableTextCell row={row} accessor="note" />,
  },
];
