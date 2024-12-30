import { PageContainer } from "@/components/common/PageContainer";
import { KidSummaryTile } from "@/features/parents/components/KidSummaryTile";
import { useKidManager } from "@/features/parents/hooks/useKidManager";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_parents/parents/manage")({
  component: ParentsManagePage,
});

function ParentsManagePage() {
  const { kidIds, isLoadingIds, idsError } = useKidManager();

  if (isLoadingIds) return <div>Loading...</div>;
  if (idsError) return <div>Error fetching kid ids</div>;

  return (
    <PageContainer title="Parents | Manage" description="Manage each kid here.">
      <div className="flex flex-col gap-4">
        {kidIds && kidIds.length > 0 ? (
          kidIds.map((kidId) => <KidSummaryTile key={kidId} id={kidId} />)
        ) : (
          <div>No kids found</div>
        )}
      </div>
    </PageContainer>
  );
}
