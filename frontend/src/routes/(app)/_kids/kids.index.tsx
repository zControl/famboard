import { PageContainer } from "@/common/layout/PageContainer";
import { Spinner } from "@/common/ui/feedback/spinner";
import { KidShowcaseCard } from "@/features/kids/components/KidShowcaseCard";
import { MyActiveTasksCard } from "@/features/kids/components/MyActiveTasksCard";
import { MyApprovalsCard } from "@/features/kids/components/MyApprovalsCard";
import { useAssignedTasks } from "@/features/tasks/hooks/useAssignedTasks";
import { useProfile } from "@/features/user/hooks/useProfile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_kids/kids/")({
  component: KidsIndexPage,
});

function KidsIndexPage() {
  const { profile, isLoading: profileLoading } = useProfile();

  const { assignedTasks, isLoading, pendingApprovalTasks } = useAssignedTasks(
    profile?.userId ? profile.userId : "",
  );

  // Wait for profile to load before rendering content that depends on it
  if (profileLoading) {
    return (
      <PageContainer title="Loading..." description="Loading your dashboard">
        <Spinner size="xl" />
      </PageContainer>
    );
  }

  // Handle case where profile failed to load
  if (!profile) {
    return (
      <PageContainer title="Dashboard" description="Unable to load profile">
        <div>Unable to load your profile information.</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={profile.firstName || "Dashboard"}
      description="This is the dashboard for a kid user!"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div id="left">
          <KidShowcaseCard profile={profile} loading={profileLoading} />
        </div>
        <div id="right" className="flex flex-col gap-6">
          <MyActiveTasksCard
            assignedTasks={assignedTasks}
            loading={isLoading}
          />
          <MyApprovalsCard assignedTasks={pendingApprovalTasks} />
        </div>
      </div>
    </PageContainer>
  );
}
