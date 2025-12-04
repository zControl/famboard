import { TaskCategory } from "@/features/tasks/types";

export interface Approval {
  id: string;
  task: {
    id: string;
    title: string;
    sequenceNumber: number;
    description: string;
    category: TaskCategory;
  };
  user: {
    id: string;
  };
  completedAt: Date;
  status: string;
  note: string;
  approvedBy: {
    id: string;
  };
  approvedAt: Date;
  bonusAwarded: boolean;
  bonusValue: number;
  pointsPossible: number;
  pointsAwarded: number;
}

export interface ApprovalResponse {
  approvalId: string;
  completedAt: Date;
  note: string;
  taskId: string;
  taskTitle: string;
  taskDescription: string;
  taskCategory: TaskCategory;
  pointsPossible: number;
  userId: string;
}

export interface PendingApprovalsResponse {
  count: number;
  data: ApprovalResponse[];
}