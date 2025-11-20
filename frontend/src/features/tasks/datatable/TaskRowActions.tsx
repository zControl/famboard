import { ActionModal } from "@/components/composites/ActionModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TaskModal } from "@/features/tasks/components/TaskModal";
import { useTaskMutations } from "@/features/tasks/hooks/useTaskMutation";
import { Task } from "@/types/task";
import { Row } from "@tanstack/react-table";
import {
  CopyIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";

interface TaskRowActionProps {
  row: Row<Task>;
}

export const TaskRowActions = ({ row }: TaskRowActionProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const { deleteTaskMutation } = useTaskMutations();

  const handleEditTask = () => {
    setModalOpen(true);
  };

  const handleDuplicateTask = () => {
    // Implement duplication logic here
    console.log("Duplicate task:", row.original);
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
        title="Delete Task"
        description={`Are you sure you want to delete task "${row.original.title}"?`}
        onConfirm={() => handleConfirmDelete(true)}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};
