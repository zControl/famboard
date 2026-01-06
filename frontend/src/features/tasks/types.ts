import { User } from "@/features/user/types";
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
  Repeat = 'REPEAT'
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
    status: string;
    user: {
      id: string;
    }
  }[];
}

export interface AssignedUserResponse {
  id: string;
  username: string;
}

export interface AssignedTask {
  id: string;
  status: string;
  assignedAt: Date;
  taskId: string;
  title: string;
  description: string;
  category: TaskCategory;
  frequency: TaskFrequency;
  pointValue: number;
  note?: string;
}

export interface TaskListResponse {
  count: number;
  data: Task[];
}

export interface AssignedTaskResponse {
  count: number;
  data: AssignedTask[];
}
