import { PageContainer } from "@/components/common/PageContainer";
import { Header4 } from "@/components/ui/typography";
import { AssignedTaskCard } from "@/features/kids/components/AssignedTaskCard";
import { KidShowcaseCard } from "@/features/kids/components/KidShowcaseCard";
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
          <Header4>Welcome, {profile?.firstName}</Header4>
          <KidShowcaseCard />
        </div>
        <div id="right">
          <div>
            <Header4>Due This Week</Header4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AssignedTaskCard />
              <AssignedTaskCard />
            </div>
          </div>
          <div>
            <Header4>Due This Week</Header4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AssignedTaskCard />
              <AssignedTaskCard />
            </div>
          </div>
        </div>
      </div>
      <div>Second Section.</div>
    </PageContainer>
  );
}
