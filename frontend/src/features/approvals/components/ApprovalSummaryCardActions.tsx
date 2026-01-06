import { Button } from "@/common/ui/actions/button";
import { ApprovalActionModal } from "@/features/approvals/components/ApprovalActionModal";
import { BaseApprovalResponse } from "@/features/approvals/types";
import { CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";

export const ApprovalSummaryCardActions = ({
  approval,
}: {
  approval: BaseApprovalResponse;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject">("approve");

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="warning"
          size="sm"
          onClick={() => {
            setActionType("reject");
            setIsModalOpen(true);
          }}
        >
          <XIcon />
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setActionType("approve");
            setIsModalOpen(true);
          }}
        >
          <CheckIcon />
        </Button>
      </div>
      <ApprovalActionModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        actionType={actionType}
        approvals={approval}
        defaultNote=""
      />
    </>
  );
};
