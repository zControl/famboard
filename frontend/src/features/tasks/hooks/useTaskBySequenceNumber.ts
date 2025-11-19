import { taskApi } from "@/features/tasks/api/taskApi";
import { useQuery } from "@tanstack/react-query";

export const useTaskBySequenceNumber = (sequenceNumber: string) => useQuery({
  queryKey: ["taskBySequenceNumber", sequenceNumber],
  queryFn: () => taskApi.getTaskBySequenceNumber(sequenceNumber),
});