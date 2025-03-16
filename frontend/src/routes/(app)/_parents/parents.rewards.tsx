import { PageContainer } from "@/components/common/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_parents/parents/rewards")({
  component: ParentsRewardsPage,
});

function ParentsRewardsPage() {
  return (
    <PageContainer
      title="Parents | Rewards"
      description="Manage the rewards that can be earned."
    >
      <div className="w-full">
        This page will have a table that lists all the rewards that can be
        earned.
      </div>
      <div className="w-full">You can create new rewards.</div>
      <div className="grid grid-cols-1 border border-blue-500">
        <div className="w-full border border-red-500">
          Rewards Data Table Here
        </div>
      </div>
    </PageContainer>
  );
}
