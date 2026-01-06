import { DataTableCore } from "@/common/datatable/DataTableCore";
import { Card } from "@/common/ui/surfaces/card";
import { approvalListColumns } from "@/features/approvals/datatable/ApprovalListColumns";
import { useApprovalsQuery } from "@/features/approvals/hooks/useApprovalsQuery";

export const ApprovalListDatatable = () => {
  const { approvals } = useApprovalsQuery();

  const initialState = {
    pagination: {
      pageIndex: 0,
      pageSize: 20,
    },
    sorting: [
      {
        id: "approvedAt",
        desc: true,
      },
    ],
    columnFilters: [
      {
        id: "approvalStatus",
        value: "PENDING_APPROVAL",
      },
    ],
  };

  return (
    <Card className="p-2">
      <DataTableCore
        columns={approvalListColumns}
        data={approvals?.data || []}
        initialState={initialState}
      />
    </Card>
  );
};
