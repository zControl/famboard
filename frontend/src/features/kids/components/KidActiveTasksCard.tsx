import { Spinner } from "@/common/ui/feedback/spinner";
import { StatLabel } from "@/common/ui/typography/typography";
import { AssignedTaskItem } from "@/features/kids/components/AssignedTaskItem";
import { useAssignedTasksByUser } from "@/features/tasks/hooks/useAssignedTasksByUser";

export const KidActiveTasksCard = ({ userId }: { userId: string }) => {
  const { assignedTasks, isLoading } = useAssignedTasksByUser(userId);
  return (
    <>
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <>
          <StatLabel>You have {assignedTasks.length} active tasks</StatLabel>
          <div className="flex flex-col gap-4 p-2">
            {assignedTasks.map((task) => (
              <AssignedTaskItem key={task.id} task={task} />
            ))}
          </div>
        </>
      )}
    </>
  );
};
