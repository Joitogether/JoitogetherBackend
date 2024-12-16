import { z } from "zod";

export const GetRatingSchema = z.object({
  host_id: z.string().max(50).optional(),
  user_id: z.string().max(50).optional(),
});

export const CreateRatingSchema = z.object({
  host_id: z.string().max(255),
  user_id: z.string().max(255),
  rating_heart: z.number().int().min(0).max(5),
  user_comment: z.string(),
  rating_kindness: z.number().int().min(0).max(5),
  rating_ability: z.number().int().min(0).max(5),
  rating_credit: z.number().int().min(0).max(5),
  activity_id: z.number()
})