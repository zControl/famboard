import { ActionModal } from "@/components/composites/ActionModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AssignTaskForm } from "@/features/tasks/components/AssignTaskForm";
import { useAssignments } from "@/features/tasks/hooks/useAssignments";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useUserProfile } from "@/features/user/hooks/useUserProfile";
import { Task } from "@/types/task";
import { Row } from "@tanstack/react-table";
import { Edit2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";

interface TaskAssignmentsCellProps {
  row: Row<Task>;
}

export const TaskAssignmentsCell = ({ row }: TaskAssignmentsCellProps) => {
  const taskId = row.original.id;
  const { taskAssignments } = useAssignments(taskId);
  const { assignTaskMutation } = useTasks();
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKids, setSelectedKids] = useState<string[]>([]);

  const hasAssignments = taskAssignments && taskAssignments.length > 0;

  const handleRowClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    console.log("Assigning task for", row.original.id, "to", selectedKids);
    assignTaskMutation.mutate(
      {
        taskId: row.original.id,
        userIds: selectedKids,
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedKids([]);
        },
      },
    );
  };

  const handleCancel = () => {
    console.log(
      `Cancelled ${hasAssignments ? "editing" : "adding"} assignments for task ${taskId}`,
    );
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="rounded-md relative w-full h-8"
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
            onClick={handleRowClick}
          >
            {hasAssignments ? (
              <Edit2Icon className="h-4 w-4" />
            ) : (
              <PlusIcon className="h-4 w-4" />
            )}
          </div>
        )}
      </div>
      <ActionModal
        title={hasAssignments ? "Edit Assignments" : "Add Assignments"}
        description={
          hasAssignments
            ? "Modify the assignments for this task."
            : "Add new assignments to this task."
        }
        open={isModalOpen}
        onOpenChange={() => {
          setIsModalOpen(false);
          setSelectedKids([]);
        }}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      >
        <AssignTaskForm row={row} onSelectedKidsChange={setSelectedKids} />
      </ActionModal>
    </>
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
