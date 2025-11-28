import { LabeledValue } from "@/common/ui/data/labeled-value";
import { InfoCard } from "@/common/ui/surfaces/InfoCard";
import { useUserStatistics } from "@/features/admin/hooks/useUserStatistics";
import { UsersIcon } from "lucide-react";

export const UserStatisticsCard = () => {
  const { totalUserCount, totalParentsCount, totalKidsCount } =
    useUserStatistics();
  return (
    <InfoCard
      title="Users"
      description="Basic user statistics"
      icon={<UsersIcon />}
      footer={<div>Footer</div>}
    >
      <LabeledValue
        title="Registered Users Count"
        value={totalUserCount}
        units="users"
      />
      <LabeledValue
        title="Users in Parent Group"
        value={totalParentsCount}
        units="parents"
      />
      <LabeledValue
        title="Users in Kid Group"
        value={totalKidsCount}
        units="kids"
      />
    </InfoCard>
  );
};
