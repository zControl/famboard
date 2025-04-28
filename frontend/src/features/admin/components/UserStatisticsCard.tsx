import { InfoCard } from "@/components/composites/InfoCard";
import { LabeledValue } from "@/components/ui/labeled-value";
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
        label="Registered Users Count"
        value={totalUserCount}
        units="users"
      />
      <LabeledValue
        label="Users in Parent Group"
        value={totalParentsCount}
        units="parents"
      />
      <LabeledValue
        label="Users in Kid Group"
        value={totalKidsCount}
        units="kids"
      />
    </InfoCard>
  );
};
