import { User } from "@/types/user";
export enum TaskCategory {
  Personal = 'PERSONAL',
  Academic = 'ACADEMIC',
  Household = 'HOUSEHOLD',
  Friendly = 'FRIENDLY',
  Helpful = 'HELPFUL',
  Improvement = 'IMPROVEMENT',
  Other = 'OTHER'
}

export enum TaskFrequency {
  Always = 'ALWAYS',
  Daily = 'DAILY',
  Weekly = 'WEEKLY',
  Monthly = 'MONTHLY',
  Special = 'SPECIAL'
}

export enum TaskStatus {
  Pending = 'PENDING',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export enum TaskPriority {
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH',
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
  status: TaskStatus;
  priority: TaskPriority;
  note?: string;
  assignedTo?: User[];
}
export interface AssignedTaskResponse {
  id: string;
  username: string;
}

export interface UserAssignedTaskResponse {
  sequenceNumber: number;
  title: string;
  description: string;
  pointValue: number;
  category: TaskCategory;
  status: TaskStatus;
  frequency: TaskFrequency;
  note: string;
}