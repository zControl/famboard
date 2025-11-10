import { taskApi } from "@/features/tasks/api/taskApi";
import { AssignedTaskResponse } from "@/types/task";
import { useQuery } from "@tanstack/react-query";

export const useAssignedTasks = (userId: string) => {
  const { data: tasks, isLoading, isError, refetch } = useQuery<AssignedTaskResponse, Error>({
    queryKey: ["assigned-tasks-by-user", userId],
    queryFn: () => taskApi.getAssignedTasks(userId),
    enabled: !!userId, // Only run the query if userId exists
  });

  const dailyTasks = tasks?.data.filter((task) => task.frequency === "DAILY");
  const weeklyTasks = tasks?.data.filter((task) => task.frequency === "WEEKLY");
  const pendingApprovalTasks = tasks?.data.filter((task) => task.status === "PENDING_APPROVAL");
  const completedTasks = tasks?.data.filter((task) => task.status === "COMPLETED");
  const assignedTasks = tasks?.data.filter((task) => task.status === "ASSIGNED");

  return {
    tasks: tasks?.data || [],
    dailyTasks,
    weeklyTasks,
    pendingApprovalTasks,
    completedTasks,
    assignedTasks,
    isLoading,
    isError,
    refetch,
  };
};