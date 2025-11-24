import { Spinner } from "@/common/ui/feedback/spinner";
import { Card } from "@/common/ui/surfaces/card";
import { StatLabel } from "@/common/ui/typography/typography";
import { ApprovalTaskCard } from "@/features/kids/components/ApprovalTaskCard";
import { AssignedTaskCardProps } from "@/features/kids/types";

export const MyApprovalsCard = ({
  assignedTasks,
  loading,
}: AssignedTaskCardProps) => {
  return (
    <Card className="p-0 gap-0">
      <StatLabel>Waiting for Approval ({assignedTasks?.length})</StatLabel>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
          {assignedTasks?.map((task) => (
            <ApprovalTaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </Card>
  );
};
