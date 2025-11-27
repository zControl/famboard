import { taskApi } from "@/features/tasks/api/taskApi";
import { AssignedTaskResponse } from "@/features/tasks/types";
import { useQuery } from "@tanstack/react-query";

export const useAssignedTasks = (userId: string) => {
  const { data: tasks, isLoading, isError, refetch } = useQuery<AssignedTaskResponse, Error>({
    queryKey: ["assigned-tasks-by-user", userId],
    queryFn: () => taskApi.getAssignedTasks(userId),
    refetchInterval: 10000, // This will update the assigned tasks every 10 seconds
    enabled: !!userId, // Only run the query if userId exists
  });

  // Get current date (start of day)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter tasks that are currently assigned based on their frequency and assignedAt date
  const currentlyAssignedTasks = tasks?.data.filter(task => {
    if (task.status !== "ASSIGNED") return false;

    const assignedDate = new Date(task.assignedAt);

    switch (task.frequency) {
      case "DAILY":
        // Show if assigned today
        return assignedDate.toDateString() === today.toDateString();

      case "WEEKLY": {
        // Show if assigned within the current week
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6); // End of week (Saturday)
        return assignedDate >= weekStart && assignedDate <= weekEnd;
      }

      case "MONTHLY":
        // Show if assigned within the current month
        return assignedDate.getMonth() === today.getMonth() &&
          assignedDate.getFullYear() === today.getFullYear();

      case "ONCE":
        // For one-time tasks, always show if they're assigned
        return true;

      case "REPEAT":
        // For repeat tasks, always show if they're assigned
        return true;

      default:
        return false;
    }
  });

  const dailyTasks = tasks?.data.filter((task) => task.frequency === "DAILY");
  const weeklyTasks = tasks?.data.filter((task) => task.frequency === "WEEKLY");
  const pendingApprovalTasks = tasks?.data.filter((task) => task.status === "PENDING_APPROVAL");
  const completedTasks = tasks?.data.filter((task) => task.status === "COMPLETED");
  const assignedTasks = currentlyAssignedTasks;

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