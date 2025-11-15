import { ErrorCard } from "@/components/common/ErrorCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ApprovalActionModal } from "@/features/approvals/components/ApprovalActionModal";
import { TaskApprovalCard } from "@/features/parents/components/TaskApprovalCard";
import { useUserApprovals } from "@/features/tasks/hooks/useUserApprovals";
import { PartyPopperIcon } from "lucide-react";
import { useState } from "react";

export const KidApprovalsCard = ({ userId }: { userId: string }) => {
  const { approvalsList, isLoading, error } = useUserApprovals(userId);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  if (error) return <ErrorCard message="Error getting user approval list." />;

  const handleApprovalAll = () => {
    setConfirmModalOpen(true);
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

      {approvalsList?.data && (
        <ApprovalActionModal
          isOpen={isConfirmModalOpen}
          onOpenChange={setConfirmModalOpen}
          actionType="approve"
          approvals={approvalsList.data}
        />
      )}
    </Card>
  );
};
