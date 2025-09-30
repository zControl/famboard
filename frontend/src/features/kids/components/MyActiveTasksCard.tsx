import { Card } from "@/components/ui/card";
import { Coin } from "@/components/ui/coin";
import { StatLabel } from "@/components/ui/typography";
import { AssignedTaskCard } from "@/features/tasks/components/AssignedTaskCard";
import { UserAssignedTaskResponse } from "@/types/task";

interface MyActiveTasksCardProps {
  assignedTasks: UserAssignedTaskResponse[] | undefined;
}
export const MyActiveTasksCard = ({
  assignedTasks,
}: MyActiveTasksCardProps) => {
  return (
    <Card className="p-0 gap-0">
      <StatLabel>My Active Tasks</StatLabel>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
        {assignedTasks?.map((task) => (
          <AssignedTaskCard
            key={task.sequenceNumber}
            task={task}
            icon={<Coin value={task.pointValue} />}
          />
        ))}
      </div>
    </Card>
  );
};
