import { StyledPiggyBankIcon } from "@/common/ui/display/styled-icons";
import { DataCard } from "@/common/ui/surfaces/DataCard";
import { Header2 } from "@/common/ui/typography/typography";
import { useProfile } from "@/features/user/hooks/useProfile";

export const DashboardDataCards = () => {
  const { profile, isLoading: profileLoading } = useProfile();
  return (
    <div>
      <Header2 className="bg-linear-to-r from-primary to-chart-2 text-transparent bg-clip-text">
        Welcome, {profile?.firstName}!
      </Header2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <DataCard
          label="Point Total"
          data={profile?.pointTotal}
          badge={"action"}
          loading={profileLoading}
        />
        <DataCard
          label="Piggy Bank Balance"
          data={profile?.piggyBankDisplay}
          badge={<StyledPiggyBankIcon className="size-16" />}
          loading={profileLoading}
        />
        <DataCard
          label="Goal Progress"
          data={profile?.piggyBankDisplay}
          badge={<StyledPiggyBankIcon className="size-16" />}
          loading={profileLoading}
        />
        <DataCard
          label="Fitness Challenges"
          badge={<StyledPiggyBankIcon className="size-16" />}
          message="Earn points by completing challenges"
          loading={profileLoading}
        />
      </div>
    </div>
  );
};
