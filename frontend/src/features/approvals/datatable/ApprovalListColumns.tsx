import { formatDate } from "@/common/utils/formatDate";
import { BaseApprovalResponse } from "@/features/approvals/types";
import { UserAvatar } from "@/features/user/components/UserAvatar";
import { ColumnDef } from "@tanstack/react-table";

export const approvalListColumns: ColumnDef<BaseApprovalResponse>[] = [
  {
    accessorKey: "userAvatarUrl",
    header: "Completed By",
    cell: ({ row }) => <UserAvatar url={row.original.userAvatarUrl} />,
  },
  {
    accessorKey: "taskTitle",
    header: "Task",
    cell: ({ row }) => <div>{row.original.taskTitle}</div>,
  },
  {
    accessorKey: "approvalStatus",
    header: "Status",
    cell: ({ row }) => <div>{row.original.approvalStatus}</div>,
  },
  {
    accessorKey: "approvedAt",
    header: "Approved At",
    cell: ({ row }) => <div>{formatDate(row.original.approvedAt)}</div>,
  },
  {
    accessorKey: "approvedByAvatarUrl",
    header: "Approved By",
    cell: ({ row }) => <UserAvatar url={row.original.approvedByAvatarUrl} />,
  },
];
