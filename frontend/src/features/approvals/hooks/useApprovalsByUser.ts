import { approvalsApi } from "@/features/approvals/api/approvalsApi";
import { useQuery } from "@tanstack/react-query";

export const useApprovalsByUser = (userId: string) => {
  const {
    data: approvalsByUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["approvals-by-user", userId],
    queryFn: () => approvalsApi.getApprovalsByUser(userId),
    enabled: !!userId,
  });

  return {
    approvalsByUser,
    isLoading,
    error,
  };
};
