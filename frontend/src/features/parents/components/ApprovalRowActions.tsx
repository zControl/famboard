import { ActionModal } from "@/components/composites/ActionModal";
import { Button } from "@/components/ui/button";
import { ApprovalResponse } from "@/types/task";
import { CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";

interface ApprovalRowActionsProps {
  approval: ApprovalResponse;
}

export const ApprovalRowActions = ({ approval }: ApprovalRowActionsProps) => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleApprove = () => {
    setConfirmModalOpen(true);
    console.log("this is where we do the approve mutation .");
  };

  const handleReject = () => {
    setConfirmModalOpen(true);
  };

  const handleConfirmApprove = (approval: ApprovalResponse) => {
    console.log(
      "this is where we do the confirm mutation for .",
      approval.approvalId,
    );
    setConfirmModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="warning" size="sm" onClick={handleReject}>
          <XIcon />
        </Button>
        <Button variant="primary" size="sm" onClick={handleApprove}>
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
