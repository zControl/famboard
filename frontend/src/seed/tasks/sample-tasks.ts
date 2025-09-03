import { Task, TaskCategory, TaskDifficulty, TaskFrequency, TaskPriority, TaskStatus } from "@/types/task";

export const sampleTasks: Task[] = [
  {
    id: "1",
    sequenceNumber: 1,
    title: "Complete Math Homework",
    description: "Finish algebra exercises from chapter 5",
    pointValue: 50,
    category: TaskCategory.Academic,
    frequency: TaskFrequency.Weekly,
    difficulty: TaskDifficulty.Medium,
    status: TaskStatus.Pending,
    priority: TaskPriority.High,
    note: "Due by Friday",
    assignedTo: [],
  },
];