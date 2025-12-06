import { DataTableCore } from "@/common/datatable/DataTableCore";
import { Button } from "@/common/ui/actions/button";
import { Card } from "@/common/ui/surfaces/card";
import { approvalListColumns } from "@/features/approvals/datatable/ApprovalListColumns";
import { useApprovalsQuery } from "@/features/approvals/hooks/useApprovalsQuery";
import {} from "@/features/approvals/hooks/usePendingApprovalsQuery";

export const ApprovalListDatatable = () => {
  const { approvals } = useApprovalsQuery();

  const initialState = {
    pagination: {
      pageIndex: 0,
      pageSize: 20,
    },
  };

  return (
    <Card className="p-2">
      <DataTableCore
        columns={approvalListColumns}
        data={approvals?.data || []}
        options={<div>Search</div>}
        actions={<Button>Pending Filter</Button>}
        initialState={initialState}
      />
    </Card>
  );
};
