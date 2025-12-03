import { Button } from "@/common/ui/actions/button";
import { ActionModal } from "@/common/ui/overlay/ActionModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/ui/overlay/dropdown-menu";
import { TaskModal } from "@/features/tasks/components/TaskModal";
import { useTaskMutations } from "@/features/tasks/hooks/useTaskMutations";
import { Task } from "@/features/tasks/types";
import { Row } from "@tanstack/react-table";
import {
  CopyIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TaskRowActionProps {
  row: Row<Task>;
}

export const TaskRowActions = ({ row }: TaskRowActionProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const { deleteTaskMutation, duplicateTaskMutation } = useTaskMutations();

  const handleEditTask = () => {
    setModalOpen(true);
  };

  const handleDuplicateTask = () => {
    // Create a copy of the original task, omitting the id
    const { id, ...originalTask } = row.original;

    // Modify title to indicate it's a duplicate
    const newTask = {
      ...originalTask,
      title: `${originalTask.title} (Copy)`,
    };

    duplicateTaskMutation.mutate(newTask, {
      onSuccess: () => {
        toast.success("Task duplicated!");
      },
      onError: (error) => {
        console.error("Error duplicating task:", error);
      },
    });
  };

  const handleDeleteTask = () => {
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleEditTask}>
            <PencilIcon className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleDeleteTask}>
            <Trash2Icon className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleDuplicateTask}>
            <CopyIcon className="mr-2 h-4 w-4" />
            Duplicate
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
        title={`Delete ${row.original.title} ?`}
        description={`This will also delete any assignments and approvals for this task.`}
        onConfirm={() => handleConfirmDelete(true)}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};
