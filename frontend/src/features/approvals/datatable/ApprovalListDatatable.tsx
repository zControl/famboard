import { DataTableCore } from "@/common/datatable/DataTableCore";
import { Card } from "@/common/ui/surfaces/card";
import { approvalListColumns } from "@/features/approvals/datatable/ApprovalListColumns";
import { usePendingApprovalsQuery } from "@/features/approvals/hooks/usePendingApprovalsQuery";

export const ApprovalListDatatable = () => {
  const { pendingApprovals } = usePendingApprovalsQuery();

  return (
    <Card className="p-2">
      <DataTableCore
        columns={approvalListColumns}
        data={pendingApprovals?.data || []}
      />
    </Card>
  );
};
