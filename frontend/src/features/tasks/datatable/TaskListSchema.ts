import { TaskCategory, TaskDifficulty, TaskFrequency, TaskPriority, TaskStatus } from "@/types/task";
import { z } from "zod";

  export const taskListSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    category: z.nativeEnum(TaskCategory),
    frequency: z.nativeEnum(TaskFrequency),
    difficulty: z.nativeEnum(TaskDifficulty),
    status: z.nativeEnum(TaskStatus),
    priority: z.nativeEnum(TaskPriority),
    note: z.string().optional(),
  });