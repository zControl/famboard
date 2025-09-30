import { PageContainer } from "@/components/common/PageContainer";
import { KidShowcaseCard } from "@/features/kids/components/KidShowcaseCard";
import { MyActiveTasksCard } from "@/features/kids/components/MyActiveTasksCard";
import { MyApprovalsCard } from "@/features/kids/components/MyApprovalsCard";
import { useUserAssignedTasks } from "@/features/tasks/hooks/useUserAssignedTasks";
import { useProfile } from "@/features/user/hooks/useProfile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_kids/kids/")({
  component: KidsIndexPage,
});

function KidsIndexPage() {
  const { profile, isLoading } = useProfile();
  const { assignedTasks } = useUserAssignedTasks(profile?.userId || "");

  return (
    <PageContainer
      title={profile?.firstName || "Dashboard"}
      description="This is the dashboard for a kid user!"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div id="left">
          <KidShowcaseCard profile={profile} loading={isLoading} />
        </div>
        <div id="right" className="flex flex-col gap-6">
          <MyActiveTasksCard assignedTasks={assignedTasks} />
          <MyApprovalsCard assignedTasks={assignedTasks} />
        </div>
      </div>
    </PageContainer>
  );
}
