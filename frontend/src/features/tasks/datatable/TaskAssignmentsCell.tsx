import { ActionModal } from "@/common/ui/overlay/ActionModal";
import { AssignedUserAvatar } from "@/features/tasks/components/AssignedUserAvatar";
import { AssignedUserSelection } from "@/features/tasks/components/AssignedUserSelection";
import { useTaskMutations } from "@/features/tasks/hooks/useTaskMutations";
import { Task } from "@/features/tasks/types";
import { Row } from "@tanstack/react-table";
import { Edit2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";

interface TaskAssignmentsCellProps {
  row: Row<Task>;
}

export const TaskAssignmentsCell = ({ row }: TaskAssignmentsCellProps) => {
  const assignments = row.original.assignments;
  const { assignTaskMutation } = useTaskMutations();
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKids, setSelectedKids] = useState<string[]>([]);

  const hasAssignments = assignments && assignments.length > 0;

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
        },
      },
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSelectedKidsChange = (newSelectedKids: string[]) => {
    // Only update if the selection actually changed
    if (JSON.stringify(newSelectedKids) !== JSON.stringify(selectedKids)) {
      setSelectedKids(newSelectedKids);
    }
  };

  return (
    <>
      <div
        className="rounded-md relative w-full h-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div>
          {hasAssignments ? (
            <div className="flex -space-x-2 overflow-hidden p-2">
              {assignments
                .filter(
                  (assignment, index, self) =>
                    index ===
                    self.findIndex((a) => a.user.id === assignment.user.id),
                )
                .map((assignment) => {
                  return (
                    <AssignedUserAvatar
                      key={assignment.id}
                      userId={assignment.user.id}
                    />
                  );
                })}
            </div>
          ) : (
            <div className="text-card-foreground p-2">None</div>
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
          assignments={assignments}
          onSelectedKidsChange={handleSelectedKidsChange}
        />
      </ActionModal>
    </>
  );
};
