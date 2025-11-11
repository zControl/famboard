import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { StatLabel } from "@/components/ui/typography";
import { AssignedTaskCard } from "@/features/kids/components/AssignedTaskCard";
import { AssignedTask } from "@/types/task";

interface MyActiveTasksCardProps {
  assignedTasks: AssignedTask[] | undefined;
  loading: boolean;
}
export const MyActiveTasksCard = ({
  assignedTasks,
  loading,
}: MyActiveTasksCardProps) => {
  return (
    <Card className="p-0 gap-0">
      <StatLabel>My Active Tasks</StatLabel>
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
