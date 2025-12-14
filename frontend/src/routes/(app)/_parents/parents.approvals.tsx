import { PageContainer } from "@/common/layout/PageContainer";
import { ApprovalListDatatable } from "@/features/approvals/datatable/ApprovalListDatatable";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_parents/parents/approvals")({
  component: ParentsApprovalsPage,
});

function ParentsApprovalsPage() {
  return (
    <PageContainer
      title="Parents | Approvals"
      description="Manage the overall task list and assginments."
    >
      <ApprovalListDatatable />
    </PageContainer>
  );
}
