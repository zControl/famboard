import { Button } from "@/components/ui/button";
import { ApprovalActionModal } from "@/features/approvals/components/ApprovalActionModal";
import { ApprovalResponse } from "@/features/tasks/types";
import { CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";

interface ApprovalRowActionsProps {
  approval: ApprovalResponse;
}

export const ApprovalRowActions = ({ approval }: ApprovalRowActionsProps) => {
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
