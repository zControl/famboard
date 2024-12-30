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

export enum TaskDifficulty {
  Easy = 'EASY',
  Medium = 'MEDIUM',
  Tricky = 'TRICKY',
  Hard = 'HARD'
}

export enum TaskStatus {
  Todo ='TODO',
  InProgress = 'IN_PROGRESS',
  Done = 'DONE'
}

export enum TaskPriority {
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH'
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
}

export interface Task {
  id: number;
  title: string;
  category: TaskCategory;
  description?: string;
  frequency: TaskFrequency;
  difficulty: TaskDifficulty;
  status: TaskStatus;
  priority: TaskPriority;
  note?: string;
  comments?: Comment[];
}