import { Card } from "@/components/ui/card";
import { Task } from "@/types/task";
import { createApiClient } from "@/utils/apiClient";
import { API_ENDPOINTS } from "@/utils/apiEndpoints";
import { useQuery } from "@tanstack/react-query";

export const KidActiveTasksCard = ({ userId }: { userId: string }) => {
  const apiClient = createApiClient(API_ENDPOINTS.BASE);
  const { data } = useQuery({
    queryKey: ["kid-tasks", userId],
    queryFn: async () => {
      const response = await apiClient.get<Task[]>(`/tasks/user/${userId}`);
      return response;
    },
  });
  return (
    <Card className="rounded-none w-full">
      <ul>
        {data?.map((task) => (
          <>
            <li key={task.title}>{task.title}</li>
          </>
        ))}
      </ul>
    </Card>
  );
};
