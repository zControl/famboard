import { AscDescSortHeader } from "@/common/datatable/headers/AscDescSortHeader";
import { ColumnTitle } from "@/common/datatable/headers/ColumnTitle";
import { SearchInputHeader } from "@/common/datatable/headers/SearchInputHeader";
import { formatDate } from "@/common/utils/formatDate";
import { timeAgo } from "@/common/utils/timeAgo";
import { ApprovalStatusFilterButtons } from "@/features/approvals/datatable/ApprovalStatusFilterButtons";
import { BaseApprovalResponse } from "@/features/approvals/types";
import { UserAvatar } from "@/features/user/components/UserAvatar";
import { ColumnDef } from "@tanstack/react-table";
import { CalendarArrowDownIcon, CalendarArrowUpIcon } from "lucide-react";

export const approvalListColumns: ColumnDef<BaseApprovalResponse>[] = [
  {
    accessorKey: "approvedAt",
    header: ({ column }) => (
      <div className="flex text-left">
        <AscDescSortHeader
          column={column}
          ascIcon={CalendarArrowUpIcon}
          ascText="Oldest"
          descIcon={CalendarArrowDownIcon}
          descText="Newest"
        />
        <ColumnTitle title="Approved" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <div className="text-left">
          {row.original.approvedAt
            ? formatDate(row.original.approvedAt)
            : "N/A"}
        </div>
        <div className="text-xs text-muted-foreground">
          {row.original.approvedAt ? timeAgo(row.original.approvedAt) : ""}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "taskTitle",
    header: ({ column }) => <SearchInputHeader title="Task" column={column} />,
    cell: ({ row }) => <div>{row.original.taskTitle}</div>,
  },
  {
    accessorKey: "taskDescription",
    header: ({ column }) => (
      <SearchInputHeader title="Description" column={column} />
    ),
    cell: ({ row }) => <div>{row.original.taskDescription}</div>,
  },
  {
    accessorKey: "pointsAwarded",
    header: () => <ColumnTitle title="Awarded" className="text-center" />,
    cell: ({ row }) => (
      <div className="text-center">{row.original.pointsAwarded}</div>
    ),
  },

  {
    accessorKey: "approvalStatus",
    header: ({ column }) => <ApprovalStatusFilterButtons column={column} />,
    cell: ({ row }) => (
      <div className=" text-center">{row.original.approvalStatus}</div>
    ),
  },
  {
    accessorKey: "userAvatarUrl",
    header: () => <div className="text-center">User</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <UserAvatar url={row.original.userAvatarUrl} />
      </div>
    ),
  },
];
