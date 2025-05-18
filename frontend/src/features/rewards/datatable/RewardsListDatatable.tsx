import { DataTableCore } from "@/components/datatable/DataTableCore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { rewardsListColumns } from "@/features/rewards/datatable/RewardsListColumns";
import { useRewards } from "@/features/rewards/hooks/useRewards";
import { PlusIcon } from "lucide-react";

export const RewardsListDatatable = () => {
  const { rewards } = useRewards();

  const initialState = {
    columnVisibility: {
      title: true,
      description: true,
      rewardValue: true,
      note: true,
    },
    pagination: {
      pageIndex: 0,
      pageSize: 20,
    },
    sorting: [
      {
        id: "title",
        desc: false,
      },
    ],
    filters: [],
  };
  return (
    <Card className="p-2">
      <DataTableCore
        columns={rewardsListColumns}
        data={rewards || []}
        actions={
          <Button variant={"primary"} onClick={() => console.log("Add Reward")}>
            <PlusIcon />
            Add Reward
          </Button>
        }
        initialState={initialState}
      />
    </Card>
  );
};
