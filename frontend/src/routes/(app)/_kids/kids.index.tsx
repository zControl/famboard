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
  const { profile } = useProfile();
  const { assignedTasks } = useUserAssignedTasks(profile?.userId || "");
  console.log("assignedTasks", assignedTasks);

  return (
    <PageContainer
      title={profile?.firstName || "Dashboard"}
      description="This is the dashbaord for a kid user!"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div id="left">
          <KidShowcaseCard />
        </div>
        <div id="right">
          <MyActiveTasksCard />
          <MyApprovalsCard />
        </div>
      </div>
    </PageContainer>
  );
}
