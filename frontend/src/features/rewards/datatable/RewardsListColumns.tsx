import { Reward } from "@/features/rewards/types";
import { ColumnDef } from "@tanstack/react-table";
import { RewardsRowActions } from "./RewardsRowActions";

export const rewardsListColumns: ColumnDef<Reward>[] = [
  {
    id: "actions",
    cell: ({ row }) => <RewardsRowActions row={row} />,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "rewardValue",
    header: "Value",
  },
  {
    accessorKey: "note",
    header: "Note",
  },
];
