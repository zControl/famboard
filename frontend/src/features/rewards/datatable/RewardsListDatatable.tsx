import { DataTableCore } from "@/common/datatable/DataTableCore";
import { TableOptions } from "@/common/datatable/TableOptions";
import { Button } from "@/common/ui/actions/button";
import { Card } from "@/common/ui/surfaces/card";
import { RewardModal } from "@/features/rewards/components/RewardModal";
import { rewardsListColumns } from "@/features/rewards/datatable/RewardsListColumns";
import { useRewards } from "@/features/rewards/hooks/useRewards";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const RewardsListDatatable = () => {
  const [open, setOpen] = useState(false);
  const { rewards, refreshRewards } = useRewards();

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
        data={rewards?.data || []}
        options={<TableOptions onRefresh={refreshRewards} />}
        actions={
          <Button variant={"primary"} onClick={() => setOpen(true)}>
            <PlusIcon />
            Add Reward
          </Button>
        }
        initialState={initialState}
      />
      <RewardModal modalOpen={open} onModalOpenChange={setOpen} />
    </Card>
  );
};
