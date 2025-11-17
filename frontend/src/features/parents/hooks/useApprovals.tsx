import { taskApi } from "@/features/tasks/api/taskApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface TaskActionRequest {
  approvalId: string;
  parentId: string;
  bonusPoints?: number;
  note?: string;
}
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
    mutationFn: ({
      approvalId,
      parentId,
      bonusPoints,
      note,
    }: TaskActionRequest) =>
      taskApi.approveTask(approvalId, parentId, bonusPoints, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approvals"] });
      queryClient.invalidateQueries({ queryKey: ["user-approvals"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });

  const { mutate: rejectTaskMutation, isPending: isRejecting } = useMutation({
    mutationFn: ({ approvalId, parentId, note }: TaskActionRequest) =>
      taskApi.rejectTask(approvalId, parentId, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approvals"] });
      queryClient.invalidateQueries({ queryKey: ["user-approvals"] });
    },
  });

  return {
    approvalsList,
    isLoadingApprovals,
    approvalsError,
    approveTaskMutation,
    isApproving,
    rejectTaskMutation,
    isRejecting,
  };
};
