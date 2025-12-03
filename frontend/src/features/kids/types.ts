import { AssignedTask } from "@/features/tasks/types";

export interface AssignedTaskCardProps {
  assignedTasks: AssignedTask[];
  loading: boolean;
}

export interface AssignedTaskItemProps {
  task: AssignedTask;
}