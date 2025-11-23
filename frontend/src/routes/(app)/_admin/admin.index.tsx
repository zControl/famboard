import { PageContainer } from "@/common/layout/PageContainer";
import { ActivityLogSummaryCard } from "@/features/admin/components/ActivityLogSummaryCard";
import { RewardsSummaryCard } from "@/features/admin/components/RewardsSummaryCard";
import { StatusBar } from "@/features/admin/components/StatusBar";
import { TasksSummaryCard } from "@/features/admin/components/TasksSummaryCard";
import { UserStatisticsCard } from "@/features/admin/components/UserStatisticsCard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_admin/admin/")({
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  return (
    <PageContainer
      title="Admin | Dashboard"
      description="Shows admin cards and common admin functions"
    >
      <StatusBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UserStatisticsCard />
        <TasksSummaryCard />
        <RewardsSummaryCard />
        <ActivityLogSummaryCard />
      </div>
      <div>DEBUG MESSAGES</div>
    </PageContainer>
  );
}
