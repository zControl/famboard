import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAssignments } from "@/features/tasks/hooks/useAssignments";
import { useUserProfile } from "@/features/user/hooks/useUserProfile";
import { Task } from "@/types/task";
import { Row } from "@tanstack/react-table";
import { Edit2Icon } from "lucide-react";
import { useState } from "react";

interface TaskAssignmentsCellProps {
  row: Row<Task>;
}

export const TaskAssignmentsCell = ({ row }: TaskAssignmentsCellProps) => {
  const taskId = row.original.id;
  const { taskAssignments } = useAssignments(taskId);
  const [isHovered, setIsHovered] = useState(false);

  const handleEditClick = () => {
    console.log(`Editing assignments for task ${taskId}`);
  };

  return (
    <div
      className="flex flex-row justify-between relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex -space-x-2 overflow-hidden">
        {taskAssignments?.map((assignment) => (
          <AssignedUserAvatar key={assignment.id} userId={assignment.id} />
        ))}
      </div>
      {isHovered && (
        <div
          className="absolute inset-0 bg-background/80 flex items-center justify-center"
          onClick={handleEditClick}
        >
          <Edit2Icon className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};

const AssignedUserAvatar = ({ userId }: { userId: string }) => {
  const { data: userProfile, isLoading } = useUserProfile(userId);

  if (isLoading) return null; // or a loading placeholder

  return (
    <Avatar className="inline-block h-8 w-8 rounded-full ring-2">
      <AvatarImage src={userProfile?.avatarUrl} alt={userProfile?.username} />
      <AvatarFallback>{userProfile?.username?.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};
