import { ErrorCard } from "@/common/error/ErrorCard";
import { Spinner } from "@/common/ui/feedback/spinner";
import { AssignedUserAvatar } from "@/features/tasks/components/AssignedUserAvatar";
import { AssignedUserName } from "@/features/tasks/components/AssignedUserName";
import { useTaskAssignments } from "@/features/tasks/hooks/useTaskAssignments";

interface AssignedAvatarGroupProps {
  taskId: string;
  limit?: number;
}

export const AssignedAvatarGroup = ({
  taskId,
  limit = 5,
}: AssignedAvatarGroupProps) => {
  const { taskAssignments, isLoading, isError } = useTaskAssignments(taskId);

  if (isLoading) return <Spinner size="sm" />;
  if (isError) return <ErrorCard message="Failed to load assignments." />;

  // Take only up to the limit
  const visibleAssignments = taskAssignments.slice(0, limit);
  const remainingCount = Math.max(0, taskAssignments.length - limit);

  return (
    <div className="flex py-2 space-x-2 justify-around">
      {visibleAssignments
        .filter(
          (assignment, index, self) =>
            index === self.findIndex((a) => a.username === assignment.username),
        )
        .map((assignment) => (
          <div
            key={assignment.username}
            className="flex flex-col gap-4 place-items-center"
          >
            <AssignedUserAvatar userId={assignment.id} />
            <AssignedUserName userId={assignment.id} />
          </div>
        ))}

      {remainingCount > 0 && (
        <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground text-xs font-medium">
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
