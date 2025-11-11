import { taskApi } from "@/features/tasks/api/taskApi";
import { AssignedUserResponse } from "@/types/task";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook to fetch the users assigned to a task.
 *
 * @param taskId The ID of the task to fetch assignments for.
 * @returns An object containing the assigned users, a boolean indicating whether the data is loading, and a boolean indicating whether the query encountered an error.
 */
export const useAssignments = (taskId: string) => {
  const { data: taskAssignments, isLoading, isError, refetch } = useQuery<AssignedUserResponse[], Error>({
    queryKey: ["task-assignments", taskId],
    queryFn: () => taskApi.getAssignedUsers(taskId),
  });

  return {
    taskAssignments: taskAssignments || [],
    isLoading,
    isError,
    refetch,
  }
};