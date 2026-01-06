import { SearchInputHeader } from "@/common/datatable/headers/SearchInputHeader";
import { SupremeColumnHeader } from "@/common/datatable/headers/SupremeColumnHeader";
import { Coin } from "@/common/ui/display/coin";
import { CustomLink } from "@/common/ui/navigation/custom-link";
import { EditableTextCell } from "@/features/tasks/datatable/EditableTextCell";
import { TaskAssignmentsCell } from "@/features/tasks/datatable/TaskAssignmentsCell";
import { TaskAssignmentsHeader } from "@/features/tasks/datatable/TaskAssignmentsHeader";
import { TaskCategoryCell } from "@/features/tasks/datatable/TaskCategoryCell";
import { TaskFrequencyCell } from "@/features/tasks/datatable/TaskFrequencyCell";
import { TaskRowActions } from "@/features/tasks/datatable/TaskRowActions";

import { enumToArray } from "@/common/utils/enumToArray";
import { Task, TaskCategory, TaskFrequency } from "@/features/tasks/types";
import { ColumnDef } from "@tanstack/react-table";

export const taskListColumns: ColumnDef<Task>[] = [
  {
    id: "actions",
    cell: ({ row }) => <TaskRowActions row={row} />,
  },

  {
    accessorKey: "frequency",
    filterFn: "arrIncludesSome",
    header: ({ column }) => (
      <SupremeColumnHeader
        column={column}
        title="Repeat"
        options={enumToArray(TaskFrequency)}
      />
    ),
    cell: ({ row }) => <TaskFrequencyCell row={row} />,
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
    id: "assigned",
    accessorFn: (row) => row.assignments.map((a) => a.user.id),
    filterFn: "arrIncludesSome",
    header: ({ column }) => (
      <TaskAssignmentsHeader column={column} title="Assigned" />
    ),
    cell: ({ row }) => <TaskAssignmentsCell row={row} />,
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
    accessorKey: "note",
    header: ({ column }) => <SearchInputHeader column={column} title="Notes" />,
    cell: ({ row }) => <EditableTextCell row={row} accessor="note" />,
  },
];
