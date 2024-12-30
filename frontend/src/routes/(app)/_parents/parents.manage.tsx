import { PageContainer } from "@/components/common/PageContainer";
import { KidSummaryTile } from "@/features/parents/components/KidSummaryTile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_parents/parents/manage")({
  component: ParentsManagePage,
});

function ParentsManagePage() {
  return (
    <PageContainer title="Parents | Manage" description="Manage each kid here.">
      <div className="w-full">
        This page will have a tile for each kid. It will display their card, and
        their assigned tasks, and other info about their staus.
      </div>
      <div>
        We will have to get the list of kids, and render one of these summary
        tiles for each kid from a map.
      </div>
      <div>
        The approach would be to use this page to fetch the list of kids and
        "core" data about them. Then, the SummaryTile will take the kid data as
        props and fetch the specific data for the fields.
      </div>
      <div>
        For now, we just create and format the card fields, then add data and
        make it reusable later.
      </div>
      <KidSummaryTile id="123" />
    </PageContainer>
  );
}
