// frontend/src/features/tasks/hooks/useTaskCompletion.ts
import { taskApi } from "@/features/tasks/api/taskApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CompleteTaskParams {
  taskId: string;
  userId: string;
  note?: string;
}

export const useTaskCompletion = () => {
  const queryClient = useQueryClient();
  const completeTaskMutation = useMutation({
    mutationFn: ({ taskId, userId, note }: CompleteTaskParams) =>
      taskApi.completeTask(taskId, userId, note),

    // When the mutation succeeds, invalidate relevant queries
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-assigned-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task-completions"] });
    },
  });

  return {
    completeTaskMutation,
    isCompleting: completeTaskMutation.isPending,
    error: completeTaskMutation.error,
  };
};