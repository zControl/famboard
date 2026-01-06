import { DataTableCore } from "@/common/datatable/DataTableCore";
import { Checkbox } from "@/common/ui/fields/checkbox";
import { ActionModal } from "@/common/ui/overlay/ActionModal";
import { useAssignedTasksByUser } from "@/features/tasks/hooks/useAssignedTasksByUser";
import { useTaskMutations } from "@/features/tasks/hooks/useTaskMutations";
import { useTasksQuery } from "@/features/tasks/hooks/useTasksQuery";
import { AssignedTask, Task } from "@/features/tasks/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface TaskAssignmentModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  username?: string;
  onComplete?: () => void;
}

export const TaskAssignmentModal = ({
  isOpen,
  onOpenChange,
  userId,
  username,
  onComplete,
}: TaskAssignmentModalProps) => {
  const { tasks, refreshTasks } = useTasksQuery();
  const { tasks: assignedTasks } = useAssignedTasksByUser(userId);
  const { assignTasksToUserMutation } = useTaskMutations();
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(
    new Set(),
  );

  // Filter out tasks that are already assigned to the user
  const availableTasks = useMemo(() => {
    if (!tasks?.data || !assignedTasks) return [];

    const assignedTaskIds = assignedTasks.map(
      (task: AssignedTask) => task.taskId,
    );
    return tasks.data.filter(
      (task: Task) => !assignedTaskIds.includes(task.id),
    );
  }, [tasks?.data, assignedTasks]);

  const handleTaskToggle = (taskId: string) => {
    setSelectedTaskIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (!availableTasks) return;

    if (selectedTaskIds.size === availableTasks.length) {
      setSelectedTaskIds(new Set());
    } else {
      setSelectedTaskIds(
        new Set(availableTasks.map((task: Task) => task.id) || []),
      );
    }
  };

  const taskSelectionColumns: ColumnDef<Task>[] = [
    {
      id: "select",
      header: () => (
        <Checkbox
          checked={
            availableTasks.length > 0 &&
            selectedTaskIds.size === availableTasks.length
          }
          onCheckedChange={handleSelectAll}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedTaskIds.has(row.original.id)}
          onCheckedChange={() => handleTaskToggle(row.original.id)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 48,
    },
    {
      accessorKey: "title",
      header: "",
      cell: ({ row }) => (
        <div
          className="font-medium truncate max-w-xs"
          title={row.original.title}
        >
          {row.original.title}
        </div>
      ),
    },
  ];

  const handleAssignTasks = () => {
    if (selectedTaskIds.size === 0) {
      toast.error("Please select at least one task to assign");
      return;
    }

    assignTasksToUserMutation.mutate(
      { userId, taskIds: Array.from(selectedTaskIds) },
      {
        onSuccess: () => {
          toast.success(
            `Assigned ${selectedTaskIds.size} task(s) to ${username || "user"}`,
          );
          setSelectedTaskIds(new Set());
          onOpenChange(false);
          refreshTasks();
          if (onComplete) onComplete();
        },
        onError: (error) => {
          console.error("Error assigning tasks:", error);
          toast.error("Failed to assign tasks");
        },
      },
    );
  };

  const handleCancel = () => {
    setSelectedTaskIds(new Set());
    onOpenChange(false);
  };

  const initialState = {
    columnVisibility: {
      id: false,
      select: true,
      title: true,
    },
    filters: [],
  };

  return (
    <ActionModal
      open={isOpen}
      onOpenChange={onOpenChange}
      title={`Assign Tasks to ${username || "User"}`}
      description="Select tasks to assign to this user"
      onConfirm={handleAssignTasks}
      onCancel={handleCancel}
    >
      <div className="w-full max-w-2xl">
        <div className="max-h-120 overflow-auto">
          <DataTableCore
            columns={taskSelectionColumns}
            data={availableTasks}
            initialState={initialState}
            showPagination={false}
            showColumnVisibility={false}
          />
        </div>
        {selectedTaskIds.size > 0 && (
          <div className="mt-4 text-sm text-muted-foreground">
            {selectedTaskIds.size} task(s) selected
          </div>
        )}
      </div>
    </ActionModal>
  );
};
