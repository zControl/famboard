import { taskApi } from "@/features/tasks/api/taskApi";
import { Task } from "@/features/tasks/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useTaskMutations = () => {
  const queryClient = useQueryClient();

  const refreshTasks = () => {
    queryClient.resetQueries({ queryKey: ["tasks"] });
    queryClient.invalidateQueries({ queryKey: ["taskById"] });
    queryClient.invalidateQueries({ queryKey: ["taskBySequenceNumber"] });
  };

  const addTaskMutation = useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: refreshTasks,
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, task }: { taskId: string; task: Partial<Task> }) =>
      taskApi.updateTask(taskId, task),
    onSuccess: refreshTasks,
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) => taskApi.deleteTask(taskId),
    onSuccess: refreshTasks,
  });

  const duplicateTaskMutation = useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: refreshTasks,
  })

  const assignTaskMutation = useMutation({
    mutationFn: ({ taskId, userIds }: { taskId: string; userIds: string[] }) =>
      taskApi.assignUsersToTask(taskId, userIds),
    onSuccess: refreshTasks,
  });

  const assignTasksToUserMutation = useMutation({
    mutationFn: ({ userId, taskIds }: { userId: string; taskIds: string[] }) =>
      taskApi.assignTasksToUser(userId, taskIds),
    onSuccess: () => {
      refreshTasks();
      queryClient.invalidateQueries({ queryKey: ["assignedTasks"] });
      queryClient.invalidateQueries({ queryKey: ["approvalsByUser"] });
      queryClient.invalidateQueries({ queryKey: ["assignedTasksByUser"] });
    },
  });

  return {
    addTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    duplicateTaskMutation,
    assignTaskMutation,
    assignTasksToUserMutation,
  };
};