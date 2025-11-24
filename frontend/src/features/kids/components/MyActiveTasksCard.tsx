import { Spinner } from "@/common/ui/feedback/spinner";
import { Card } from "@/common/ui/surfaces/card";
import { StatLabel } from "@/common/ui/typography/typography";
import { AssignedTaskCard } from "@/features/kids/components/AssignedTaskCard";
import { AssignedTaskCardProps } from "@/features/kids/types";

export const MyActiveTasksCard = ({
  assignedTasks,
  loading,
}: AssignedTaskCardProps) => {
  return (
    <Card className="p-0 gap-0">
      <StatLabel>My Active Tasks ({assignedTasks?.length})</StatLabel>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
          {assignedTasks?.map((task) => (
            <AssignedTaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </Card>
  );
};
