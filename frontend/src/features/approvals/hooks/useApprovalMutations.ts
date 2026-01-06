import { approvalsApi } from "@/features/approvals/api/approvalsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface TaskActionRequest {
  approvalId: string;
  parentId: string;
  bonusPoints?: number;
  note?: string;
}
export const useApprovalMutations = () => {
  const queryClient = useQueryClient();

  const { mutate: approveTaskMutation, isPending: isApproving } = useMutation({
    mutationFn: ({
      approvalId,
      parentId,
      bonusPoints,
      note,
    }: TaskActionRequest) =>
      approvalsApi.approveTask(approvalId, parentId, bonusPoints, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approvals"] });
      queryClient.invalidateQueries({ queryKey: ["approvals-by-user"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });

  const { mutate: rejectTaskMutation, isPending: isRejecting } = useMutation({
    mutationFn: ({ approvalId, parentId, note }: TaskActionRequest) =>
      approvalsApi.rejectTask(approvalId, parentId, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approvals"] });
      queryClient.invalidateQueries({ queryKey: ["approvals-by-user"] });
    },
  });

  return {
    approveTaskMutation,
    isApproving,
    rejectTaskMutation,
    isRejecting,
  };
};
