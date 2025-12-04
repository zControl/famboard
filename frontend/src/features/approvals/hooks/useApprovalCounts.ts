import { approvalsApi } from "@/features/approvals/api/approvalsApi";
import { useQueries } from "@tanstack/react-query";

export type ApprovalCountsResponse = {
  daily: number;
  weekly: number;
  monthly: number;
  isLoading: boolean;
  isError: boolean;
};

export const useApprovalCounts = (userId: string): ApprovalCountsResponse => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["approval-count", "daily", userId],
        queryFn: () => approvalsApi.getApprovalCounts("daily", userId),
        enabled: !!userId,
      },
      {
        queryKey: ["approval-count", "weekly", userId],
        queryFn: () => approvalsApi.getApprovalCounts("weekly", userId),
        enabled: !!userId,
      },
      {
        queryKey: ["approval-count", "monthly", userId],
        queryFn: () => approvalsApi.getApprovalCounts("monthly", userId),
        enabled: !!userId,
      },
    ],
  });

  return {
    daily: queries[0].data ?? 0,
    weekly: queries[1].data ?? 0,
    monthly: queries[2].data ?? 0,
    isLoading: queries.some(query => query.isLoading),
    isError: queries.some(query => query.isError),
  };
};