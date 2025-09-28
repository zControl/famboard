import { ActionModal } from "@/components/composites/ActionModal";
import { AssignedUserAvatar } from "@/features/tasks/components/AssignedUserAvatar";
import { AssignedUserSelection } from "@/features/tasks/components/AssignedUserSelection";
import { useAssignments } from "@/features/tasks/hooks/useAssignments";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { Task } from "@/types/task";
import { Row } from "@tanstack/react-table";
import { Edit2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";

interface TaskAssignmentsCellProps {
  row: Row<Task>;
}

export const TaskAssignmentsCell = ({ row }: TaskAssignmentsCellProps) => {
  const taskId = row.original.id;
  const { taskAssignments, refetch } = useAssignments(taskId);
  const { assignTaskMutation, queryClient } = useTasks();
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKids, setSelectedKids] = useState<string[]>([]);

  const hasAssignments = taskAssignments && taskAssignments.length > 0;

  const handleRowClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    assignTaskMutation.mutate(
      {
        taskId: row.original.id,
        userIds: selectedKids,
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedKids([]);
          queryClient.invalidateQueries({ queryKey: ["tasks", taskId] });
          refetch();
        },
      },
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="rounded-md relative w-full h-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex -space-x-2 overflow-hidden p-2">
          {hasAssignments ? (
            <div className="flex -space-x-2 overflow-hidden p-2">
              {taskAssignments.map((assignment) => (
                <AssignedUserAvatar
                  key={assignment.id}
                  userId={assignment.id}
                />
              ))}
            </div>
          ) : (
            <div className="text-card-foreground p-2">No assignments</div>
          )}
        </div>
        {isHovered && (
          <div
            className="absolute inset-0 bg-background/60 flex items-center justify-center"
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
        title="Current Assignments"
        description={`Task: ${row.original.title}`}
        open={isModalOpen}
        onOpenChange={() => {
          setIsModalOpen(false);
          setSelectedKids([]);
        }}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      >
        <AssignedUserSelection
          row={row}
          onSelectedKidsChange={setSelectedKids}
        />
      </ActionModal>
    </>
  );
};
