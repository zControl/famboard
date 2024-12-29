import { PageContainer } from "@/components/common/PageContainer";
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
      <div className="w-full">
        You will be able to create new and approve completed tasks.
      </div>
      <div className="grid grid-cols-1 border border-blue-500">
        <div className="w-full border border-red-500">Kid #1 Tile</div>
        <div className="w-full border border-red-500">Kid #2 Tile</div>
        <div className="w-full border border-red-500">Kid #3 Tile</div>
      </div>
    </PageContainer>
  );
}
