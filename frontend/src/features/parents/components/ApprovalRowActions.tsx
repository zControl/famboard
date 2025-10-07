import { ActionModal } from "@/components/composites/ActionModal";
import { Button } from "@/components/ui/button";
import { TaskCompletionResponse } from "@/types/task";
import { CheckSquare2Icon, XSquareIcon } from "lucide-react";
import { useState } from "react";

interface ApprovalRowActionsProps {
  approval: TaskCompletionResponse;
}

export const ApprovalRowActions = ({ approval }: ApprovalRowActionsProps) => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleApprove = () => {
    setConfirmModalOpen(true);
  };

  const handleReject = () => {
    setConfirmModalOpen(true);
  };

  const handleConfirmApprove = (
    confirmed: boolean,
    approval: TaskCompletionResponse,
  ) => {
    console.log(
      "this is where we do the confirm mutation for .",
      confirmed,
      approval.approvalId,
    );
    setConfirmModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="destructive" size="sm" onClick={handleReject}>
          <XSquareIcon />
        </Button>
        <Button variant="secondary" size="sm" onClick={handleApprove}>
          <CheckSquare2Icon />
        </Button>
      </div>
      <ActionModal
        open={isConfirmModalOpen}
        onOpenChange={setConfirmModalOpen}
        title="Approve or Reject?"
        description={`We need to confirm the approve or reject here."?`}
        onConfirm={() => handleConfirmApprove(true, approval)}
        onCancel={() => setConfirmModalOpen(false)}
      />
    </>
  );
};
