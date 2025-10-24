import { User } from "@/types/user";
export enum TaskCategory {
  Personal = 'PERSONAL',
  Academic = 'ACADEMIC',
  Household = 'HOUSEHOLD',
  Friendly = 'FRIENDLY',
  Helpful = 'HELPFUL',
  Improvement = 'IMPROVEMENT',
  Fitness = 'FITNESS',
  Other = 'OTHER'
}

export enum TaskFrequency {
  Once = 'ONCE',
  Daily = 'DAILY',
  Weekly = 'WEEKLY',
  Monthly = 'MONTHLY',
  Special = 'SPECIAL'
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
}

export interface Task {
  id: string;
  sequenceNumber: number;
  title: string;
  description?: string;
  pointValue: number;
  category: TaskCategory;
  frequency: TaskFrequency;
  note?: string;
  assignments: {
    id: string;
    assignedAt: Date;
    user: {
      id: string;
    }
  }[];
}

export interface AssignedTaskResponse {
  id: string;
  username: string;
}

export interface UserAssignedTaskResponse {
  id: string;
  sequenceNumber: number;
  title: string;
  description: string;
  pointValue: number;
  category: TaskCategory;
  frequency: TaskFrequency;
  note: string;
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
