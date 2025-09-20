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
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { Task } from "@/types/task";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleEdit}>Edit</DropdownMenuItem>
          <DropdownMenuItem onSelect={handleDeleteTask}>
            Delete
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
