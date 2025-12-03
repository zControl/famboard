import { taskApi } from "@/features/tasks/api/taskApi";
import { useQuery } from "@tanstack/react-query";

export const useApprovalsByUser = (userId: string) => {
  const {
    data: approvalsList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["approvals-by-user", userId],
    queryFn: () => taskApi.getApprovalsByUser(userId),
    enabled: !!userId,
  });

  return {
    approvalsList,
    isLoading,
    error,
  };
};
