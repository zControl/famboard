import { ActionModal } from "@/components/composites/ActionModal";
import { Button } from "@/components/ui/button";
import { TaskCompletionResponse } from "@/types/task";
import { Row } from "@tanstack/react-table";
import { CheckSquare2Icon, XSquareIcon } from "lucide-react";
import { useState } from "react";

interface TaskRowActionProps {
  row: Row<TaskCompletionResponse>;
}

export const ApprovalRowActions = ({ row }: TaskRowActionProps) => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleApprove = () => {
    setConfirmModalOpen(true);
  };

  const handleReject = () => {
    setConfirmModalOpen(true);
  };

  const handleConfirmApprove = (
    confirmed: boolean,
    row: Row<TaskCompletionResponse>,
  ) => {
    console.log(
      "this is where we do the confirm mutation for .",
      confirmed,
      row.original.approvalId,
    );
    setConfirmModalOpen(false);
  };

  return (
    <div className="flex items-center">
      <Button variant="highlight" size="icon" onClick={handleReject}>
        <XSquareIcon />
      </Button>
      <Button variant="highlight" size="icon" onClick={handleApprove}>
        <CheckSquare2Icon />
      </Button>

      <ActionModal
        open={isConfirmModalOpen}
        onOpenChange={setConfirmModalOpen}
        title="Approve or Reject?"
        description={`We need to confirm the approve or reject here."?`}
        onConfirm={() => handleConfirmApprove(true, row)}
        onCancel={() => setConfirmModalOpen(false)}
      />
    </div>
  );
};
