import { ErrorCard } from "@/components/common/ErrorCard";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { TaskApprovalCard } from "@/features/parents/components/TaskApprovalCard";
import { useUserApprovals } from "@/features/tasks/hooks/useUserApprovals";

export const KidApprovalsCard = ({ userId }: { userId: string }) => {
  const { approvalsList, isLoading, error } = useUserApprovals(userId);
  if (error) return <ErrorCard message="Error getting user approval list." />;
  return (
    <Card>
      <div className="flex justify-end">Approval All</div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {approvalsList?.data.map((approval) => (
            <TaskApprovalCard key={approval.approvalId} approval={approval} />
          ))}
        </>
      )}
    </Card>
  );
};
