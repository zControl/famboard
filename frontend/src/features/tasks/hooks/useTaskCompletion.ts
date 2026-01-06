import { taskApi } from "@/features/tasks/api/taskApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CompleteTaskParams {
  taskId: string;
  userId: string;
  pointsPossible: number;
  note?: string;
}

export const useTaskCompletion = () => {
  const queryClient = useQueryClient();
  const completeTaskMutation = useMutation({
    mutationFn: ({ taskId, userId, pointsPossible, note }: CompleteTaskParams) =>
      taskApi.completeTask(taskId, userId, pointsPossible, note),

    // When the mutation succeeds, invalidate relevant queries
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assigned-tasks-by-user"] });

    },
  });

  return {
    completeTaskMutation,
    isCompleting: completeTaskMutation.isPending,
    error: completeTaskMutation.error,
  };
};