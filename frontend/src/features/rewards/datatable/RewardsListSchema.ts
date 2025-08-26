import { z } from "zod";

export const rewardsListSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  rewardValue: z.preprocess((val) => Number(val), z.number().min(0, "Reward Value must be a positive number").max(100, "Point Value must be less than 100")),
  note: z.string().optional(),
});