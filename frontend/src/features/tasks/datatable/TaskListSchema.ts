import { TaskCategory, TaskDifficulty, TaskFrequency, TaskPriority, TaskStatus } from "@/types/task";
import { z } from "zod";

  export const taskListSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    pointValue: z.preprocess((val) => Number(val), z.number().min(0, "Point Value must be a positive number").max(100, "Point Value must be less than 100")),
    category: z.nativeEnum(TaskCategory),
    frequency: z.nativeEnum(TaskFrequency),
    difficulty: z.nativeEnum(TaskDifficulty),
    status: z.nativeEnum(TaskStatus),
    priority: z.nativeEnum(TaskPriority),
    note: z.string().optional(),
  });