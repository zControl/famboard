import { PageContainer } from "@/common/layout/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_parents/parents/achievements")({
  component: ParentsAchievementsPage,
});

function ParentsAchievementsPage() {
  return (
    <PageContainer
      title="Parents | Achievements"
      description="Manage the overall task list and assginments."
    >
      <div>This is where the achievements page will be.</div>
    </PageContainer>
  );
}
