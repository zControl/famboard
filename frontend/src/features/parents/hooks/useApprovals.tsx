import { taskApi } from "@/features/tasks/api/taskApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useApprovals = () => {
  const queryClient = useQueryClient();

  const {
    data: approvalsList,
    isLoading: isLoadingApprovals,
    error: approvalsError,
  } = useQuery({
    queryKey: ["approvals"],
    queryFn: taskApi.getPendingApprovals,
  });

  const { mutate: approveTaskMutation, isPending: isApproving } = useMutation({
    mutationFn: (approvalId: string) => taskApi.approveTask(approvalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approvals"] });
    },
  });

  return {
    approvalsList,
    isLoadingApprovals,
    approvalsError,
    approveTaskMutation,
    isApproving,
  };
};
