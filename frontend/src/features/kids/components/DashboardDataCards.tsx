import { Button } from "@/common/ui/actions/button";
import { StyledPiggyBankIcon } from "@/common/ui/display/styled-icons";
import { DataCard } from "@/common/ui/surfaces/DataCard";
import { Header2 } from "@/common/ui/typography/typography";
import TaskCategoryBadge from "@/features/tasks/components/TaskCategoryBadge";
import { TaskCategory } from "@/features/tasks/types";
import { useProfile } from "@/features/user/hooks/useProfile";
import { CheckCircle2Icon } from "lucide-react";

export const DashboardDataCards = () => {
  const { profile, isLoading: profileLoading } = useProfile();
  return (
    <div>
      <Header2 className="bg-linear-to-r from-primary to-chart-2 text-transparent bg-clip-text">
        Welcome, {profile?.firstName}!
      </Header2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <DataCard
          label="Earned Point Total"
          data={profile?.pointTotal}
          badge={<Button variant="outline">Redeem</Button>}
          message="Last updated: (2 days ago)"
          loading={profileLoading}
        />
        <DataCard
          label="Piggy Bank Balance"
          data={profile?.piggyBankDisplay}
          badge={<StyledPiggyBankIcon className="size-12" />}
          message="Last updated: (2 days ago)"
          loading={profileLoading}
        />
        <DataCard
          label="Screen Time"
          data={"YES? OR NO?"}
          badge={<CheckCircle2Icon />}
          message={"LINK TO SCREEN TIME"}
          loading={profileLoading}
        />
        <DataCard
          label="Fitness Challenges"
          badge={
            <TaskCategoryBadge category={TaskCategory.Fitness} size="sm" />
          }
          message="Earn points by completing challenges"
          loading={profileLoading}
        />
      </div>
    </div>
  );
};
