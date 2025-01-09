import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAssignedUsers } from "@/features/tasks/api/taskApi";
import { useUserProfile } from "@/features/user/hooks/useUserProfile";
import { Task } from "@/types/task";
import { useQuery } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";

interface TaskAssignmentsCellProps {
  row: Row<Task>;
}

export const TaskAssignmentsCell = ({ row }: TaskAssignmentsCellProps) => {
  const taskId = row.original.id;
  const { data: taskAssignments } = useQuery({
    queryKey: ["task-assignments", taskId],
    queryFn: () => getAssignedUsers(taskId),
  });
  return (
    <div className="flex -space-x-2 overflow-hidden">
      {taskAssignments?.map((assignment) => (
        <UserAvatar key={assignment.id} userId={assignment.id} />
      ))}
    </div>
  );
};

const UserAvatar = ({ userId }: { userId: string }) => {
  const { data: userProfile, isLoading } = useUserProfile(userId);

  if (isLoading) return null; // or a loading placeholder

  return (
    <Avatar className="inline-block h-8 w-8 rounded-full ring-2">
      <AvatarImage src={userProfile?.avatarUrl} alt={userProfile?.username} />
      <AvatarFallback>{userProfile?.username?.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};
