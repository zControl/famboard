import { ActionModal } from "@/components/composites/ActionModal";
import { Button } from "@/components/ui/button";
import { TaskModal } from "@/features/tasks/components/TaskModal";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { Task } from "@/types/task";
import { Row } from "@tanstack/react-table";
import { CopyIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

interface TaskRowActionProps {
  row: Row<Task>;
}

export const TaskRowActions = ({ row }: TaskRowActionProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const { deleteTaskMutation } = useTasks();

  const handleEdit = () => {
    setModalOpen(true);
  };

  const handleDuplicate = () => {
    // Implement duplication logic here
    console.log("Duplicate task:", row.original);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = (confirmed: boolean) => {
    if (confirmed) {
      deleteTaskMutation.mutate(row.original.id);
    }
    setDeleteModalOpen(false);
  };

  return (
    <div className="flex items-center">
      <Button variant="highlight" size="icon" onClick={handleDelete}>
        <Trash2Icon />
      </Button>
      <Button variant="highlight" size="icon" onClick={handleEdit}>
        <PencilIcon />
      </Button>
      <Button variant="highlight" size="icon" onClick={handleDuplicate}>
        <CopyIcon className="size-4" />
      </Button>
      {isModalOpen && (
        <TaskModal
          modalOpen={isModalOpen}
          onModalOpenChange={setModalOpen}
          existingTask={row.original}
        />
      )}

      <ActionModal
        open={isDeleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Delete Task"
        description={`Are you sure you want to delete task "${row.original.title}"?`}
        onConfirm={() => handleConfirmDelete(true)}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};
