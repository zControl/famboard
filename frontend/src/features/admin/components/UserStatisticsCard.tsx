import { InfoCard } from "@/components/composites/InfoCard";
import { useUserStatistics } from "@/features/admin/hooks/useUserStatistics";
import { ChartBarStackedIcon } from "lucide-react";

export const UserStatisticsCard = () => {
  const { totalUserCount, totalParentsCount, totalKidsCount } =
    useUserStatistics();
  return (
    <InfoCard
      title="Users"
      description="Basic user statistics"
      icon={<ChartBarStackedIcon />}
    >
      <div>Total Users: {totalUserCount}</div>
      <div>Total Parents: {totalParentsCount}</div>
      <div>Total Kids: {totalKidsCount}</div>
    </InfoCard>
  );
};
