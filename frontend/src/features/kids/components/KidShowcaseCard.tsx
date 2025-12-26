import {
  StyledFlameIcon,
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
import TaskFrequencyBadge from "@/features/tasks/components/TaskFrequencyBadge";
import { TaskFrequency } from "@/features/tasks/types";

export const KidShowcaseCard = ({ userId }: { userId: string }) => {
  const { daily, weekly, monthly, isLoading } = useApprovalCounts(userId);
  return (
    <Card className="p-0">
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <div className="flex flex-col justify-start gap-4">
          <Header2 className="bg-linear-to-r from-primary to-chart-2 text-transparent bg-clip-text">
            Showcase
          </Header2>
          <div className="flex flex-row items-center px-4">
            <TaskFrequencyBadge size="sm" frequency={TaskFrequency.Daily} />
            <StatLabel>Today:</StatLabel>
            <StatValue>{daily}</StatValue>
          </div>
          <div className="flex flex-row items-center px-4">
            <TaskFrequencyBadge size="sm" frequency={TaskFrequency.Weekly} />
            <StatLabel>This Week:</StatLabel>
            <StatValue>{weekly}</StatValue>
          </div>
          <div className="flex flex-row items-center px-4">
            <TaskFrequencyBadge size="sm" frequency={TaskFrequency.Monthly} />
            <StatLabel>This Month:</StatLabel>
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
