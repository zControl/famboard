import { taskApi } from "@/features/tasks/api/taskApi";
import { AssignedTaskResponse } from "@/features/tasks/types";
import { useQuery } from "@tanstack/react-query";

export const useAssignedTasksByUser = (userId: string) => {
  const { data: tasks, isLoading, isError, refetch } = useQuery<AssignedTaskResponse, Error>({
    queryKey: ["assigned-tasks-by-user", userId],
    queryFn: () => taskApi.getAssignedTasks(userId),
    refetchInterval: 10000, // This will update the assigned tasks every 10 seconds
    enabled: !!userId, // Only run the query if userId exists
  });

  // "Assigned" means: the occurrence has started (assignedAt is not in the future)
  // and it's still in ASSIGNED status. This allows missed tasks to carry over.
  const now = new Date();
  const currentlyAssignedTasks =
    tasks?.data.filter((task) => {
      if (task.status !== "ASSIGNED") return false;
      const assignedDate = new Date(task.assignedAt);
      return assignedDate <= now;
    }) || [];

  const dailyTasks = tasks?.data.filter((task) => task.frequency === "DAILY") || [];
  const weeklyTasks = tasks?.data.filter((task) => task.frequency === "WEEKLY") || [];
  const monthlyTasks = tasks?.data.filter((task) => task.frequency === "MONTHLY") || [];
  const pendingApprovalTasks = tasks?.data.filter((task) => task.status === "PENDING_APPROVAL") || [];
  const assignedTasks = currentlyAssignedTasks;

  return {
    tasks: tasks?.data || [],
    dailyTasks,
    weeklyTasks,
    monthlyTasks,
    pendingApprovalTasks,
    assignedTasks,
    isLoading,
    isError,
    refetch,
  };
};