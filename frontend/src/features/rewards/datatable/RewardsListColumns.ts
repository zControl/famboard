import { Reward } from "@/features/rewards/types";
import { ColumnDef } from "@tanstack/react-table";

export const rewardsListColumns: ColumnDef<Reward>[] = [
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
    header: "Reward Value",
  },
  {
    accessorKey: "note",
    header: "Note",
  },
]