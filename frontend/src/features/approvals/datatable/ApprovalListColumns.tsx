import { ApprovalResponse } from "@/features/approvals/types";
import { ColumnDef } from "@tanstack/react-table";

export const approvalListColumns: ColumnDef<ApprovalResponse>[] = [
  {
    accessorKey: "taskTitle",
    header: "Task",
    cell: ({ row }) => <div>{row.original.taskTitle}</div>,
  },
  {
    accessorKey: "taskDescription",
    header: "Description",
    cell: ({ row }) => <div>{row.original.taskDescription}</div>,
  },
  {
    accessorKey: "taskCategory",
    header: "Category",
    cell: ({ row }) => <div>{row.original.taskCategory}</div>,
  },
];
