import { InfoCard } from "@/components/composites/InfoCard";
import { Card } from "@/components/ui/card";
import { BlockQuote, StatLabel } from "@/components/ui/typography";
import { AssignedTask } from "@/types/task";
import { CheckCircleIcon } from "lucide-react";

interface MyActiveTasksCardProps {
  assignedTasks: AssignedTask[] | undefined;
}

export const MyApprovalsCard = ({ assignedTasks }: MyActiveTasksCardProps) => {
  return (
    <Card className="p-0 gap-0">
      <StatLabel>Waiting for Approval</StatLabel>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 p-2">
        {assignedTasks?.map((task) => (
          <InfoCard
            key={task.id}
            title={task.title}
            description="These are all the assigned tasks. We still need to only get the ones for approval here."
            icon={<CheckCircleIcon />}
          >
            <BlockQuote>approval workflow TBD</BlockQuote>
          </InfoCard>
        ))}
      </div>
    </Card>
  );
};
