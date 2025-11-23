import { PageContainer } from "@/common/layout/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_parents/parents/routines")({
  component: ParentsRoutinesPage,
});

function ParentsRoutinesPage() {
  return (
    <PageContainer
      title="Parents | Routines"
      description="Manage the overall task list and assginments."
    >
      <div>This is where the routines page will be.</div>
    </PageContainer>
  );
}
