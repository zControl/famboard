import { Coin } from "@/common/ui/display/coin";
import { LabeledValue } from "@/common/ui/display/labeled-value";
import { Input } from "@/common/ui/fields/input";
import { ActionModal } from "@/common/ui/overlay/ActionModal";
import { Textarea } from "@/common/ui/typography/textarea";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useApprovals } from "@/features/parents/hooks/useApprovals";
import { ApprovalResponse } from "@/features/tasks/types";
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
  const [bonusPoints, setBonusPoints] = useState<number | undefined>(undefined);

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
        // Calculate bonus per task for bulk approvals
        const bonusPerTask = bonusPoints
          ? Math.round((bonusPoints / approvalsCount) * 100) / 100
          : undefined;
        const promises = approvals.map(
          (approval) =>
            new Promise<void>((resolve) => {
              mutation(
                {
                  approvalId: approval.approvalId,
                  parentId: user.id,
                  bonusPoints: bonusPerTask,
                  note,
                },
                {
                  onSuccess: () => {
                    resolve();
                  },
                  onError: (error) => {
                    console.error(error);
                    resolve();
                  },
                },
              );
            }),
        );

        // Wait for all mutations to complete
        await Promise.all(promises);
        toast.success(successMessage);
      } else {
        // Single approval
        mutation(
          {
            approvalId: (approvals as ApprovalResponse).approvalId,
            parentId: user.id,
            bonusPoints,
            note,
          },
          {
            onSuccess: () => {
              toast.success(successMessage);
            },
          },
        );
      }

      onOpenChange(false);
      setNote("");
      setBonusPoints(undefined);
      if (onComplete) onComplete();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelAction = () => {
    setNote("");
    setBonusPoints(undefined);
    onOpenChange(false);
  };

  // Calculate total base points for bulk approvals
  const totalBasePoints = Array.isArray(approvals)
    ? approvals.reduce(
        (sum, approval) => sum + (approval.pointsPossible || 0),
        0,
      )
    : approvals.pointsPossible;

  return (
    <ActionModal
      open={isOpen}
      onOpenChange={onOpenChange}
      title={
        actionType === "approve"
          ? isBulkAction
            ? `Approve ${approvalsCount} Tasks?`
            : `Approve ${approvals.taskTitle}?`
          : "Reject Task?"
      }
      onConfirm={handleConfirmAction}
      onCancel={handleCancelAction}
    >
      {/* Task Summary Section */}
      {actionType === "approve" && (
        <div className="space-y-4">
          <LabeledValue
            label="Base Points"
            value={<Coin value={totalBasePoints} />}
          />
          <LabeledValue
            label="Add Bonus Points"
            value={
              <Input
                type="number"
                step={1}
                min={0}
                max={100}
                defaultValue={0}
                onChange={(e) =>
                  setBonusPoints(
                    e.target.value ? parseInt(e.target.value) : undefined,
                  )
                }
                className="w-24 text-center rounded border p-1"
              />
            }
          />
          <LabeledValue
            label="Points Awarded"
            value={<Coin value={totalBasePoints + (bonusPoints || 0)} />}
          />
        </div>
      )}

      {/* Note Section */}
      <Textarea
        placeholder="Add a note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full min-h-20 my-4"
        maxLength={300}
      />
    </ActionModal>
  );
};
