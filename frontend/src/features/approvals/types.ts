import { TaskCategory } from "@/features/tasks/types";

export interface BaseApprovalResponse {
  approvalId: string;
  approvalStatus: string;
  approvedById: string;
  approvedByAvatarUrl: string;
  approvedAt: Date;
  completedAt: Date;
  userId: string;
  userAvatarUrl: string;
  taskId: string;
  taskTitle: string;
  taskDescription: string;
  taskCategory: TaskCategory;
  pointsPossible: number;
  pointsAwarded: number;
  note: string;
}

export interface ApprovalsResponse {
  count: number;
  data: BaseApprovalResponse[];
}