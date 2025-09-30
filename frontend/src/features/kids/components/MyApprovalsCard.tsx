import { InfoCard } from "@/components/composites/InfoCard";
import { Card } from "@/components/ui/card";
import { BlockQuote, StatLabel } from "@/components/ui/typography";
import { UserAssignedTaskResponse } from "@/types/task";
import { CheckCircleIcon } from "lucide-react";

interface MyActiveTasksCardProps {
  assignedTasks: UserAssignedTaskResponse[] | undefined;
}

export const MyApprovalsCard = ({ assignedTasks }: MyActiveTasksCardProps) => {
  const pendingTasks = assignedTasks?.filter(
    (task) => task.status === "PENDING",
  );
  return (
    <Card className="p-0 gap-0">
      <StatLabel>Waiting for Approval</StatLabel>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 p-2">
        {pendingTasks?.map((task) => (
          <InfoCard
            key={task.sequenceNumber}
            title={task.title}
            description={task.status}
            icon={<CheckCircleIcon />}
          >
            <BlockQuote>approval workflow TBD</BlockQuote>
          </InfoCard>
        ))}
      </div>
    </Card>
  );
};
