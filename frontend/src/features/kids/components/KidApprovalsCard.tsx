import { Spinner } from "@/common/ui/feedback/spinner";
import { StatLabel } from "@/common/ui/typography/typography";
import { ApprovalTaskItem } from "@/features/kids/components/ApprovalTaskItem";
import { useAssignedTasksByUser } from "@/features/tasks/hooks/useAssignedTasksByUser";

export const KidApprovalsCard = ({ userId }: { userId: string }) => {
  const { isLoading, pendingApprovalTasks } = useAssignedTasksByUser(userId);
  const totalPossiblePoints = pendingApprovalTasks.reduce(
    (total, task) => total + task.pointValue,
    0,
  );
  return (
    <>
      <div className="flex items-center justify-between">
        <StatLabel>
          You have {pendingApprovalTasks.length} pending approvals for{" "}
          {totalPossiblePoints} points
        </StatLabel>
      </div>
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
          {pendingApprovalTasks.map((task) => (
            <ApprovalTaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </>
  );
};
