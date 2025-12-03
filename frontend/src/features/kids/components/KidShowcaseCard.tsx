import {
  StyledCalendar1Icon,
  StyledCalendarCheckIcon,
  StyledFlameIcon,
  StyledGemIcon,
  StyledPiggyBankIcon,
  StyledTrophyIcon,
} from "@/common/ui/display/styled-icons";
import { Spinner } from "@/common/ui/feedback/spinner";
import { Card } from "@/common/ui/surfaces/card";
import {
  Header2,
  StatLabel,
  StatValue,
} from "@/common/ui/typography/typography";
import { useApprovalCounts } from "@/features/approvals/hooks/useApprovalCounts";
import { UserProfile } from "@/features/user/types";

interface KidShowcaseCardProps {
  profile: UserProfile | null | undefined;
  loading?: boolean;
}

export const KidShowcaseCard = ({ profile, loading }: KidShowcaseCardProps) => {
  const { daily, weekly, monthly } = useApprovalCounts(profile?.userId || "");
  return (
    <Card className="p-0">
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <div className="flex flex-col justify-start gap-2">
          <Header2 className="bg-linear-to-r from-primary to-chart-2 text-transparent bg-clip-text">
            Welcome, {profile?.firstName}!
          </Header2>
          <div className="flex flex-row items-center px-4">
            <StyledPiggyBankIcon />
            <StatLabel>Coins:</StatLabel>
            <StatValue>{profile?.pointTotal}</StatValue>
          </div>
          <div className="flex flex-row items-center px-4">
            <StyledGemIcon />
            <StatLabel>Gems:</StatLabel>
            <StatValue>100</StatValue>
          </div>
          <div className="flex flex-row items-center px-4">
            <StyledCalendarCheckIcon />
            <StatLabel>Daily Completed:</StatLabel>
            <StatValue>{daily}</StatValue>
          </div>
          <div className="flex flex-row items-center px-4">
            <StyledCalendar1Icon />
            <StatLabel>Weekly Completed:</StatLabel>
            <StatValue>{weekly}</StatValue>
          </div>
          <div className="flex flex-row items-center px-4">
            <StyledCalendarCheckIcon />
            <StatLabel>Monthly Completed:</StatLabel>
            <StatValue>{monthly}</StatValue>
          </div>
          <div className="flex flex-row items-center px-4">
            <StyledTrophyIcon />
            <StatLabel>Achievements:</StatLabel>
          </div>
          <div>
            <div className="flex flex-col justify-start px-16 pt-0 gap-0">
              <StatValue>|list|</StatValue>
              <StatValue>|of|</StatValue>
              <StatValue>|achievements|</StatValue>
            </div>
          </div>
          <div className="flex flex-row items-center px-4">
            <StyledFlameIcon />
            <StatLabel>Streaks:</StatLabel>
          </div>
          <div className="flex flex-col justify-start px-16 pt-0">
            <StatValue>|list|</StatValue>
            <StatValue>|streaks|</StatValue>
          </div>
        </div>
      )}
    </Card>
  );
};
