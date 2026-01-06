import { apiClient } from "@/api/apiClient";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import { ApprovalsResponse } from "@/features/approvals/types";

export const approvalsApi = {
  getAllApprovals: () =>
    apiClient.get<ApprovalsResponse>(API_ENDPOINTS.TASK_APPROVALS.GET_ALL),

  getPendingApprovals: () =>
    apiClient.get<ApprovalsResponse>(API_ENDPOINTS.TASK_APPROVALS.GET_PENDING_APPROVALS),

  getApprovalsByUser: (userId: string) =>
    apiClient.get<ApprovalsResponse>(`${API_ENDPOINTS.TASK_APPROVALS.GET_APPROVALS_BY_USER(userId)}`),

  getApprovalCounts: (period: 'daily' | 'weekly' | 'monthly', userId: string) =>
    apiClient.get<number>(API_ENDPOINTS.TASK_APPROVALS.GET_APPROVAL_COUNTS(period, userId)),

  approveTask: (approvalId: string, parentId: string, bonusPoints?: number, note?: string) =>
    apiClient.patch<void>(API_ENDPOINTS.TASK_APPROVALS.APPROVE(approvalId),
      {
        parentId,
        bonusPoints,
        note
      }),

  rejectTask: (approvalId: string, parentId: string, note?: string) =>
    apiClient.patch<void>(API_ENDPOINTS.TASK_APPROVALS.REJECT(approvalId),
      {
        parentId,
        note
      }),
}