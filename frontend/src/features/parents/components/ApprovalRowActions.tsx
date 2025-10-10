import { ActionModal } from "@/components/composites/ActionModal";
import { Button } from "@/components/ui/button";
import { useApprovals } from "@/features/parents/hooks/useApprovals";
import { ApprovalResponse } from "@/types/task";
import { CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";

interface ApprovalRowActionsProps {
  approval: ApprovalResponse;
}

export const ApprovalRowActions = ({ approval }: ApprovalRowActionsProps) => {
  const { approveTaskMutation } = useApprovals();
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleConfirmApprove = (approval: ApprovalResponse) => {
    approveTaskMutation(approval.approvalId);
    setConfirmModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="warning"
          size="sm"
          onClick={() => setConfirmModalOpen(true)}
        >
          <XIcon />
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setConfirmModalOpen(true)}
        >
          <CheckIcon />
        </Button>
      </div>
      <ActionModal
        open={isConfirmModalOpen}
        onOpenChange={setConfirmModalOpen}
        title="Approve or Reject?"
        description={`We need to confirm the approve or reject here."?`}
        onConfirm={() => handleConfirmApprove(approval)}
        onCancel={() => setConfirmModalOpen(false)}
      />
    </>
  );
};
