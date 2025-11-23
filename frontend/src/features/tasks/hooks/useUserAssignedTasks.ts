import { taskApi } from "@/features/tasks/api/taskApi";
import { UserAssignedTaskResponse } from "@/features/tasks/types";
import { useQuery } from "@tanstack/react-query";

export const useUserAssignedTasks = (userId: string) => {
  const { data: assignedTasks, isLoading, isError, refetch } = useQuery<UserAssignedTaskResponse[], Error>({
    queryKey: ["user-assigned-tasks", userId],
    queryFn: () => taskApi.getUserAssignedTasks(userId),
    enabled: !!userId, // Only run the query if userId exists
  });

  const dailyTasks = assignedTasks?.filter((task) => task.frequency === "DAILY");
  const weeklyTasks = assignedTasks?.filter((task) => task.frequency === "WEEKLY");

  return {
    assignedTasks,
    dailyTasks,
    weeklyTasks,
    isLoading,
    isError,
    refetch,
  };
};