import { AssignedTask } from "@/features/tasks/types";

export interface AssignedTaskCardProps {
  assignedTasks: AssignedTask[] | undefined;
  loading: boolean;
}

export interface TaskCardProps {
  task: AssignedTask;
}