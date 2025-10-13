import { ErrorCard } from "@/components/common/ErrorCard";
import { ActionModal } from "@/components/composites/ActionModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { TaskApprovalCard } from "@/features/parents/components/TaskApprovalCard";
import { useApprovals } from "@/features/parents/hooks/useApprovals";
import { useUserApprovals } from "@/features/tasks/hooks/useUserApprovals";
import { PartyPopperIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const KidApprovalsCard = ({ userId }: { userId: string }) => {
  const { approvalsList, isLoading, error } = useUserApprovals(userId);
  const { approveTaskMutation } = useApprovals();
  const { user } = useAuth();
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [note, setNote] = useState("Bulk approved");

  if (error) return <ErrorCard message="Error getting user approval list." />;

  const handleApprovalAll = () => {
    setConfirmModalOpen(true);
  };

  const handleConfirmApproveAll = () => {
    if (!user || !approvalsList?.data?.length) return;

    approvalsList.data.forEach((approval) => {
      approveTaskMutation(
        {
          approvalId: approval.approvalId,
          parentId: user.id,
          note,
        },
        {
          onSuccess: () => {
            // Individual success handling if needed
          },
          onError: (error) => {
            console.error(error);
          },
        },
      );
    });

    toast.success(`Approved all ${approvalsList.count} tasks!`);
    setConfirmModalOpen(false);
  };

  return (
    <Card className="p-4">
      <div className="flex justify-end">
        <Button
          variant={"secondary"}
          size={"lg"}
          disabled={approvalsList?.count === 0}
          onClick={handleApprovalAll}
        >
          {approvalsList?.count === 0
            ? "No Approvals"
            : `Approve All (${approvalsList?.count})`}
        </Button>
      </div>

      <ActionModal
        title="Approve All Tasks"
        description={`Are you sure you want to approve all ${approvalsList?.count || 0} tasks?`}
        open={isConfirmModalOpen}
        onOpenChange={setConfirmModalOpen}
        onCancel={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirmApproveAll}
      >
        <div className="py-4">
          <p className="mb-2">Add a note (optional):</p>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note for all approvals"
          />
        </div>
      </ActionModal>

      {isLoading ? (
        <Spinner />
      ) : approvalsList?.count === 0 ? (
        <CardContent className="flex flex-col items-center justify-center">
          <PartyPopperIcon className="size-48 text-highlight" />
        </CardContent>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
          {approvalsList?.data.map((approval) => (
            <TaskApprovalCard key={approval.approvalId} approval={approval} />
          ))}
        </div>
      )}
    </Card>
  );
};
