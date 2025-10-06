import { taskApi } from "@/features/tasks/api/taskApi";
import { useQuery } from "@tanstack/react-query";

export const useUserApprovals = (userId: string) => {
  const {
    data: approvalsList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user-approvals", userId],
    queryFn: () => taskApi.getPendingCompletionsByUser(userId),
    enabled: !!userId,
  });

  return {
    approvalsList,
    isLoading,
    error,
  };
};
