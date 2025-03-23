import { taskApi } from "@/features/tasks/api/taskApi";
import { UserAssignedTaskResponse } from "@/types/task";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook to fetch the tasks assigned to a user.
 *
 * @param userId The ID of the user to fetch assigned tasks for.
 * @returns An object containing the assigned tasks, a boolean indicating whether the data is loading, a boolean indicating whether the query encountered an error, and a function to refetch the data.
 */
export const useUserAssignedTasks = (userId: string) => {
  const { data: assignedTasks, isLoading, isError, refetch } = useQuery<UserAssignedTaskResponse[], Error>({
    queryKey: ["user-assigned-tasks", userId],
    queryFn: () => taskApi.getAssignedTasks(userId),
  });

  return {
    assignedTasks,
    isLoading,
    isError,
    refetch,
  };
};