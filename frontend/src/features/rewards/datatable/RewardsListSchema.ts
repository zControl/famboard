import { z } from "zod";

export const rewardsListSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  rewardValue: z.preprocess((val) => Number(val), z.number().min(1, "Must be positive.").max(500, "Must be less than 500.")),
  note: z.string().optional(),
});