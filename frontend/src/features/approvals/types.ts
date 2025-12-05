import { TaskCategory } from "@/features/tasks/types";

export interface BaseApprovalResponse {
  approvalId: string;
  approvalStatus: string;
  approvedById: string;
  approvedAt: Date;
  completedAt: Date;
  userId: string;
  taskId: string;
  taskTitle: string;
  taskDescription: string;
  taskCategory: TaskCategory;
  pointsPossible: number;
  pointsAwarded: number;
  note: string;
}

export interface PendingApprovalsResponse {
  count: number;
  data: BaseApprovalResponse[];
}