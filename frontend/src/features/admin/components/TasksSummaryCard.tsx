import { ErrorCard } from "@/common/error/ErrorCard";
import { ButtonLink } from "@/components/composites/ButtonLink";
import { InfoCard } from "@/components/composites/InfoCard";
import { useTasksQuery } from "@/features/tasks/hooks/useTasksQuery";
import { LogsIcon, PlusSquareIcon, SquareLibraryIcon } from "lucide-react";

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
        <div className="flex flex-row space-x-2">
          <ButtonLink href="/tasks" icon={<SquareLibraryIcon />}>
            View All Tasks
          </ButtonLink>
          <ButtonLink href="/tasks/create" icon={<PlusSquareIcon />}>
            Create Task
          </ButtonLink>
        </div>
      </div>
    </InfoCard>
  );
};
