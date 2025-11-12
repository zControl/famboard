import { ActionModal } from "@/components/composites/ActionModal";
import { Textarea } from "@/components/ui/textarea";
import { Header3 } from "@/components/ui/typography";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useApprovals } from "@/features/parents/hooks/useApprovals";
import { ApprovalResponse } from "@/types/task";
import { useState } from "react";
import { toast } from "sonner";

interface ApprovalActionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  actionType: "approve" | "reject";
  approvals: ApprovalResponse | ApprovalResponse[];
  onComplete?: () => void;
  defaultNote?: string;
}

export const ApprovalActionModal = ({
  isOpen,
  onOpenChange,
  actionType,
  approvals,
  onComplete,
  defaultNote = "",
}: ApprovalActionModalProps) => {
  const { user } = useAuth();
  const { approveTaskMutation, rejectTaskMutation } = useApprovals();
  const [note, setNote] = useState(defaultNote);

  const isBulkAction = Array.isArray(approvals);
  const approvalsCount = isBulkAction ? approvals.length : 1;

  const handleConfirmAction = async () => {
    if (!user?.id) return;

    const mutation =
      actionType === "approve" ? approveTaskMutation : rejectTaskMutation;
    const successMessage =
      actionType === "approve"
        ? isBulkAction
          ? `Approved all ${approvalsCount} tasks!`
          : "Task approved!"
        : "Task rejected!";

    try {
      if (isBulkAction) {
        // Track completion for all mutations
        let completed = 0;
        let errors = 0;

        const promises = approvals.map(
          (approval, index) =>
            new Promise<void>((resolve) => {
              console.log(
                `Starting mutation for approval ${index}: ${approval.approvalId}`,
              );
              mutation(
                {
                  approvalId: approval.approvalId,
                  parentId: user.id,
                  note,
                },
                {
                  onSuccess: () => {
                    completed++;
                    resolve();
                  },
                  onError: (error) => {
                    errors++;
                    console.error(error);
                    resolve();
                  },
                },
              );
            }),
        );

        // Wait for all mutations to complete
        await Promise.all(promises);

        if (errors > 0) {
          toast.error(`${errors} tasks failed to process. Please try again.`);
        }

        if (completed > 0) {
          console.log("showing toast for", completed);
          toast.success(
            `${actionType === "approve" ? "Approved" : "Rejected"} ${completed} tasks!`,
          );
        }
      } else {
        // Single approval
        mutation(
          {
            approvalId: (approvals as ApprovalResponse).approvalId,
            parentId: user.id,
            note,
          },
          {
            onSuccess: () => {
              console.log("we got OnSuccess from single mutation");
              toast.success(successMessage);
              setNote("");
            },
          },
        );
      }

      onOpenChange(false);
      if (onComplete) onComplete();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <ActionModal
      open={isOpen}
      onOpenChange={onOpenChange}
      title={
        actionType === "approve"
          ? isBulkAction
            ? "Approve All Tasks?"
            : "Approve Task?"
          : "Reject Task?"
      }
      description={`Are you sure you want to ${actionType} ${isBulkAction ? "all these tasks" : "this task"}?`}
      onConfirm={handleConfirmAction}
      onCancel={() => onOpenChange(false)}
    >
      <Header3>Add a note (optional)</Header3>
      <Textarea
        placeholder="Leave a note if you want..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full min-h-20 mt-4"
        maxLength={300}
      />
    </ActionModal>
  );
};
