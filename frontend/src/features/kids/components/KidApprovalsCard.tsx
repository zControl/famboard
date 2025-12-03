import { Spinner } from "@/common/ui/feedback/spinner";
import { Card } from "@/common/ui/surfaces/card";
import { StatLabel } from "@/common/ui/typography/typography";
import { ApprovalTaskItem } from "@/features/kids/components/ApprovalTaskItem";
import { AssignedTaskCardProps } from "@/features/kids/types";

export const KidApprovalsCard = ({
  assignedTasks,
  loading,
}: AssignedTaskCardProps) => {
  const totalPossibePoints = assignedTasks.reduce(
    (total, task) => total + task.pointValue,
    0,
  );
  return (
    <Card className="p-0 gap-0">
      <div className="flex items-center justify-between">
        <StatLabel>
          {assignedTasks.length} pending approvals for {totalPossibePoints}{" "}
          points
        </StatLabel>
      </div>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
          {assignedTasks.map((task) => (
            <ApprovalTaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </Card>
  );
};
