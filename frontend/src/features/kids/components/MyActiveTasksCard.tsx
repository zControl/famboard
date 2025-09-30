import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Coin } from "@/components/ui/coin";
import { Header4, StatLabel } from "@/components/ui/typography";
import { AssignedTaskCard } from "@/features/tasks/components/AssignedTaskCard";
import { useUserAssignedTasks } from "@/features/tasks/hooks/useUserAssignedTasks";
import { useProfile } from "@/features/user/hooks/useProfile";

export const MyActiveTasksCard = () => {
  const { profile } = useProfile();
  const { assignedTasks } = useUserAssignedTasks(profile?.userId || "");
  return (
    <Card className="p-0">
      <Header4 color="accent">My Active Tasks</Header4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 p-2">
        {assignedTasks?.map((task) => (
          <AssignedTaskCard
            key={task.sequenceNumber}
            task={task}
            icon={<Coin value={task.pointValue} />}
          >
            <StatLabel>#{task.sequenceNumber}</StatLabel>
            <Badge variant="secondary">{task.category}</Badge>
          </AssignedTaskCard>
        ))}
      </div>
    </Card>
  );
};
