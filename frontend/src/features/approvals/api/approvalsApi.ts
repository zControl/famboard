import { apiClient } from "@/api/apiClient";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import { PendingApprovalsResponse } from "@/features/approvals/types";

export const approvalsApi = {
  getPendingApprovals: () =>
    apiClient.get<PendingApprovalsResponse>(API_ENDPOINTS.APROVALS.GET_PENDING_APPROVALS),

  getApprovalsByUser: (userId: string) =>
    apiClient.get<PendingApprovalsResponse>(`${API_ENDPOINTS.APROVALS.GET_APPROVALS_BY_USER(userId)}`),

  getApprovalCounts: (period: 'daily' | 'weekly' | 'monthly', userId: string) =>
    apiClient.get<number>(API_ENDPOINTS.APROVALS.GET_APPROVAL_COUNTS(period, userId)),

  approveTask: (approvalId: string, parentId: string, bonusPoints?: number, note?: string) =>
    apiClient.patch<void>(API_ENDPOINTS.APROVALS.APPROVE(approvalId),
      {
        parentId,
        bonusPoints,
        note
      }),

  rejectTask: (approvalId: string, parentId: string, note?: string) =>
    apiClient.patch<void>(API_ENDPOINTS.APROVALS.REJECT(approvalId),
      {
        parentId,
        note
      }),
}