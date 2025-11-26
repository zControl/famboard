import { InfoCard } from "@/common/ui/surfaces/InfoCard";
import { HandCoinsIcon } from "lucide-react";

export const RewardsSummaryCard = () => {
  return (
    <InfoCard
      title="Rewards"
      description="Total Rewards"
      icon={<HandCoinsIcon />}
    >
      <div className="flex flex-col space-y-2">
        <h2 className="text-lg font-semibold">Total Rewards</h2>
        <p className="text-sm text-gray-500">
          Total rewards earned by users in the last month.
        </p>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold">1,234</div>
          <div className="text-sm text-green-500">+10% from last month</div>
        </div>
      </div>
    </InfoCard>
  );
};
