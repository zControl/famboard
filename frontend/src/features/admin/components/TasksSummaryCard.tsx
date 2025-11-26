import { ErrorCard } from "@/common/error/ErrorCard";
import { InfoCard } from "@/common/ui/surfaces/InfoCard";
import { useTasksQuery } from "@/features/tasks/hooks/useTasksQuery";
import { LogsIcon } from "lucide-react";

export const TasksSummaryCard = () => {
  const { tasks, isLoading, error } = useTasksQuery();
  if (error)
    return (
      <ErrorCard message="Getting tasks summary has failed." error={error} />
    );

  return (
    <InfoCard
      title="Tasks Summary"
      description="Shows summary of active tasks."
      icon={<LogsIcon />}
      loading={isLoading}
    >
      <div className="flex flex-col space-y-2">
        <div className="text-sm">
          <p>Total Tasks: {tasks?.count}</p>
        </div>
      </div>
    </InfoCard>
  );
};
