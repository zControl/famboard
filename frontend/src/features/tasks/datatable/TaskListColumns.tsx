import { TableHeaderTitleSearch } from "@/components/datatable/TableHeaderTitleSearch";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task } from "@/types/task";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const taskListColumns: ColumnDef<Task>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(task.title)}
            >
              Copy task title
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit?</DropdownMenuItem>
            <DropdownMenuItem>Assign?</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
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
