import { ButtonLink } from "@/components/composites/ButtonLink";
import { InfoCard } from "@/components/composites/InfoCard";
import { LogsIcon, PlusSquareIcon, SquareLibraryIcon } from "lucide-react";

export const TasksSummaryCard = () => {
  return (
    <InfoCard title="Tasks" description="Tasks summary" icon={<LogsIcon />}>
      <div className="flex flex-col space-y-2">
        <div className="text-lg font-bold">Tasks Summary</div>
        <div className="text-sm text-gray-500">This is a summary of tasks.</div>
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
