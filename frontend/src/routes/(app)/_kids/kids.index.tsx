import { ErrorCard } from "@/common/error/ErrorCard";
import { PageContainer } from "@/common/layout/PageContainer";
import { Separator } from "@/common/ui/display/separator";
import { StyledPiggyBankIcon } from "@/common/ui/display/styled-icons";
import { Skeleton } from "@/common/ui/feedback/skeleton";
import { DataCard } from "@/common/ui/surfaces/DataCard";
import { Header2 } from "@/common/ui/typography/typography";
import { KidActiveTasksCard } from "@/features/kids/components/KidActiveTasksCard";
import { KidApprovalsCard } from "@/features/kids/components/KidApprovalsCard";
import { KidShowcaseCard } from "@/features/kids/components/KidShowcaseCard";
import { useAssignedTasksByUser } from "@/features/tasks/hooks/useAssignedTasksByUser";
import { useProfile } from "@/features/user/hooks/useProfile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_kids/kids/")({
  component: KidsIndexPage,
});

function KidsIndexPage() {
  const { profile, isLoading: profileLoading } = useProfile();

  const { assignedTasks, isLoading, pendingApprovalTasks } =
    useAssignedTasksByUser(profile?.userId ? profile.userId : "");

  // Wait for profile to load before rendering content that depends on it
  if (!profileLoading && !profile) {
    return (
      <PageContainer title="Dashboard" description="Profile error, try again">
        <ErrorCard title="Unable to load profile" message="Please try again." />
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={profile?.firstName || "Dashboard"}
      description="This is the dashboard for a kid user!"
    >
      {profileLoading ? (
        <Skeleton className="h-12 w-64 mb-4" />
      ) : (
        <Header2 className="bg-linear-to-r from-primary to-chart-2 text-transparent bg-clip-text">
          Welcome, {profile?.firstName}!
        </Header2>
      )}
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
          data={profile?.piggyBankDisplay}
          badge={<StyledPiggyBankIcon className="size-16" />}
          loading={profileLoading}
        />
      </div>
      <Separator className="my-4" />
      <div className="flex flex-row">
        <div className="w-2/3">
          <KidActiveTasksCard
            assignedTasks={assignedTasks}
            loading={isLoading}
          />
          <KidApprovalsCard
            assignedTasks={pendingApprovalTasks}
            loading={isLoading}
          />
        </div>
        <div className="w-1/3">
          <KidShowcaseCard profile={profile} loading={profileLoading} />
        </div>
      </div>
    </PageContainer>
  );
}
