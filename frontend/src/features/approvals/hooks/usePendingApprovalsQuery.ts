import { approvalsApi } from "@/features/approvals/api/approvalsApi";
import { useQuery } from "@tanstack/react-query";

export const usePendingApprovalsQuery = () => {

  const {
    data: pendingApprovals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pending-approvals"],
    queryFn: approvalsApi.getPendingApprovals,
  });

  return {
    pendingApprovals,
    isLoading,
    error,
  };
};
