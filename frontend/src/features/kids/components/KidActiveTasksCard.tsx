import { Spinner } from "@/common/ui/feedback/spinner";
import { Card } from "@/common/ui/surfaces/card";
import { StatLabel } from "@/common/ui/typography/typography";
import { AssignedTaskItem } from "@/features/kids/components/AssignedTaskItem";
import { AssignedTaskCardProps } from "@/features/kids/types";

export const KidActiveTasksCard = ({
  assignedTasks,
  loading,
}: AssignedTaskCardProps) => {
  return (
    <Card className="p-0 gap-0">
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <>
          <StatLabel>You have {assignedTasks.length} active tasks</StatLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            {assignedTasks.map((task) => (
              <AssignedTaskItem key={task.id} task={task} />
            ))}
          </div>
        </>
      )}
    </Card>
  );
};
