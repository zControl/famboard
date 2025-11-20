import { taskApi } from "@/features/tasks/api/taskApi";
import { useQuery } from "@tanstack/react-query";

export const useTaskById = (taskId: string) => useQuery({
  queryKey: ["taskById", taskId],
  queryFn: () => taskApi.getTask(taskId),
});