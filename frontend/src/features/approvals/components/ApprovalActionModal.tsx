import { ActionModal } from "@/components/composites/ActionModal";
import { Card, CardContent } from "@/components/ui/card";
import { LabeledValue } from "@/components/ui/labeled-value";
import { Textarea } from "@/components/ui/textarea";
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
              console.log("Processing approval ID:", approval.approvalId);
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
      if (onComplete) onComplete();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ActionModal
      open={isOpen}
      onOpenChange={onOpenChange}
      title={
        actionType === "approve"
          ? isBulkAction
            ? `Approve ${approvalsCount} Tasks?`
            : "Approve Task?"
          : "Reject Task?"
      }
      onConfirm={handleConfirmAction}
      onCancel={() => onOpenChange(false)}
    >
      {/* Task Summary Section */}
      <Card>
        <CardContent>
          {!isBulkAction ? (
            <div className="space-y-2">
              <LabeledValue
                label="Task Title"
                value={approvals.taskTitle || "Unnamed Task"}
              />
              {actionType === "approve" && (
                <div className="mt-4 space-y-2">
                  <LabeledValue
                    label="Task Points"
                    value={approvals.pointsPossible}
                  />
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Bonus Points:</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={bonusPoints !== undefined ? bonusPoints : ""}
                        onChange={(e) =>
                          setBonusPoints(
                            e.target.value
                              ? parseInt(e.target.value)
                              : undefined,
                          )
                        }
                        className="w-16 text-center rounded border p-1"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-primary font-medium">
                    <span>Total Points:</span>
                    <span>{approvals.pointsPossible + (bonusPoints || 0)}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {/* Calculate total points from all approvals */}
              {(() => {
                const totalBasePoints = Array.isArray(approvals)
                  ? approvals.reduce(
                      (sum, approval) => sum + (approval.pointsPossible || 0),
                      0,
                    )
                  : 0;

                return (
                  <div className="flex justify-between">
                    <span className="font-medium">Total Possible Points:</span>
                    <span>{totalBasePoints}</span>
                  </div>
                );
              })()}

              {actionType === "approve" && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Bonus Points:</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={bonusPoints !== undefined ? bonusPoints : ""}
                        onChange={(e) =>
                          setBonusPoints(
                            e.target.value
                              ? parseInt(e.target.value)
                              : undefined,
                          )
                        }
                        className="w-16 text-center rounded border p-1"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>

                  {/* Display per-task bonus */}
                  {bonusPoints && bonusPoints > 0 && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Bonus per task:</span>
                      <span>
                        {Math.round((bonusPoints / approvalsCount) * 100) / 100}{" "}
                        points
                      </span>
                    </div>
                  )}

                  {/* Calculate and display total points */}
                  {(() => {
                    const totalBasePoints = Array.isArray(approvals)
                      ? approvals.reduce(
                          (sum, approval) =>
                            sum + (approval.pointsPossible || 0),
                          0,
                        )
                      : 0;

                    return (
                      <div className="flex justify-between text-primary font-medium">
                        <span>Total Points:</span>
                        <span>{totalBasePoints + (bonusPoints || 0)}</span>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Note Section */}
      <Textarea
        placeholder="Add a note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full min-h-20 mt-2"
        maxLength={300}
      />
    </ActionModal>
  );
};
