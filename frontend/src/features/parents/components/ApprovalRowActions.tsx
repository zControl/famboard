import { ActionModal } from "@/components/composites/ActionModal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useApprovals } from "@/features/parents/hooks/useApprovals";
import { ApprovalResponse } from "@/types/task";
import { CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ApprovalRowActionsProps {
  approval: ApprovalResponse;
}

export const ApprovalRowActions = ({ approval }: ApprovalRowActionsProps) => {
  const { user } = useAuth();
  const { approveTaskMutation, rejectTaskMutation } = useApprovals();
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject">("approve");
  const [note, setNote] = useState("Default Note");

  const handleConfirmAction = () => {
    if (actionType === "approve") {
      approveTaskMutation(
        {
          approvalId: approval.approvalId,
          parentId: user?.id || "",
          note,
        },
        {
          onSuccess: () => {
            toast.success("Task approved!");
            setNote("");
          },
          onError: (error) => {
            toast.error("Error, please try again.");
            console.error(error);
          },
        },
      );
    } else {
      rejectTaskMutation(
        {
          approvalId: approval.approvalId,
          parentId: user?.id || "",
          note,
        },
        {
          onSuccess: () => {
            toast.success("Task rejected!");
            setNote("");
          },
          onError: (error) => {
            toast.error("Error, please try again.");
            console.error(error);
          },
        },
      );
    }
    setConfirmModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="warning"
          size="sm"
          onClick={() => {
            setActionType("reject");
            setConfirmModalOpen(true);
          }}
        >
          <XIcon />
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setActionType("approve");
            setConfirmModalOpen(true);
          }}
        >
          <CheckIcon />
        </Button>
      </div>
      <ActionModal
        open={isConfirmModalOpen}
        onOpenChange={setConfirmModalOpen}
        title={actionType === "approve" ? "Approve Task?" : "Reject Task?"}
        description={`Are you sure you want to ${actionType} this task?`}
        onConfirm={() => handleConfirmAction()}
        onCancel={() => setConfirmModalOpen(false)}
      >
        <Textarea
          placeholder="Leave a note if you want...."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full min-h-20 mt-4"
          maxLength={300}
        />
      </ActionModal>
    </>
  );
};
