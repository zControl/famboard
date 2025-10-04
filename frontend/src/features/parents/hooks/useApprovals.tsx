import { taskApi } from "@/features/tasks/api/taskApi";
import { useQuery } from "@tanstack/react-query";

export const useApprovals = () => {
  const {
    data: approvalsList,
    isLoading: isLoadingApprovals,
    error: approvalsError,
  } = useQuery({
    queryKey: ["approvals"],
    queryFn: taskApi.getPendingCompletions,
  });

  return {
    approvalsList,
    isLoadingApprovals,
    approvalsError,
  };
};
