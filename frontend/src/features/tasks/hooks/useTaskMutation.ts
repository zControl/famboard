import { taskApi } from "@/features/tasks/api/taskApi";
import { Task } from "@/types/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useTaskMutations = () => {
  const queryClient = useQueryClient();

  const refreshTasks = () => {
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
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

  const assignTaskMutation = useMutation({
    mutationFn: ({ taskId, userIds }: { taskId: string; userIds: string[] }) =>
      taskApi.assignUsersToTask(taskId, userIds),
    onSuccess: refreshTasks,
  });

  return {
    addTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    assignTaskMutation,
  };
};