import { createTask, getTasks } from "@/features/tasks/api/taskApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTasks = () => {
  const queryClient = useQueryClient();

  const {data: tasks, isLoading, error} = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const addTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  })

/*   console.log("useTasks hook generated:")
  console.log("tasks", tasks); */

  return {
    tasks,
    addTaskMutation,
    isLoading,
    error,
  };
}