import { PageContainer } from "@/common/layout/PageContainer";
import { RewardsListDatatable } from "@/features/rewards/datatable/RewardsListDatatable";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_parents/parents/rewards_")({
  component: ParentsRewardsPage,
});

function ParentsRewardsPage() {
  return (
    <PageContainer
      title="Parents | Rewards"
      description="Manage the rewards that can be earned."
    >
      <RewardsListDatatable />
    </PageContainer>
  );
}
