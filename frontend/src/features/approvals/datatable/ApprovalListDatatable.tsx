import { DataTableCore } from "@/common/datatable/DataTableCore";
import { Card } from "@/common/ui/surfaces/card";
import { approvalListColumns } from "@/features/approvals/datatable/ApprovalListColumns";
import { useApprovals } from "@/features/parents/hooks/useApprovals";

export const ApprovalListDatatable = () => {
  const { approvalsList } = useApprovals();

  return (
    <Card className="p-2">
      <DataTableCore
        columns={approvalListColumns}
        data={approvalsList?.data || []}
      />
    </Card>
  );
};
