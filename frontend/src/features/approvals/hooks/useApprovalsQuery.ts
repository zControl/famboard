import { approvalsApi } from "@/features/approvals/api/approvalsApi";
import { useQuery } from "@tanstack/react-query";

export const useApprovalsQuery = () => {
  const {
    data: approvals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["approvals"],
    queryFn: () => approvalsApi.getAllApprovals(),
  });

  return {
    approvals,
    isLoading,
    error,
  };
};