import { InfoCard } from "@/components/composites/InfoCard";
import { Card } from "@/components/ui/card";
import { Coin } from "@/components/ui/coin";
import { BlockQuote, Header4 } from "@/components/ui/typography";
import { useUserAssignedTasks } from "@/features/tasks/hooks/useUserAssignedTasks";
import { useProfile } from "@/features/user/hooks/useProfile";

export const MyApprovalsCard = () => {
  const { profile } = useProfile();
  const { assignedTasks } = useUserAssignedTasks(profile?.userId || "");

  const pendingTasks = assignedTasks?.filter(
    (task) => task.status === "PENDING",
  );
  return (
    <Card className="p-0">
      <Header4 color="accent">Waiting for Approval</Header4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 p-2">
        {pendingTasks?.map((task) => (
          <InfoCard
            title={task.title}
            description={`#${task.sequenceNumber}`}
            key={task.sequenceNumber}
            icon={<Coin value={task.pointValue} />}
          >
            <BlockQuote>approval workflow TBD</BlockQuote>
          </InfoCard>
        ))}
      </div>
    </Card>
  );
};
