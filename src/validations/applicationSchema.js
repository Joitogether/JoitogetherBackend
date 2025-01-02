import { z } from "zod";

export const ApplicationReviewSchema = z.object({
  status: z.enum([
    "registered",
    "approved",
    "host_declined",
    "participant_cancelled",
  ]),
  application_id: z.number().int(),
  register_validated: z.number().min(0).max(1),
  activity_id: z.number().int(),
});

export const ApplicationSchema = z.object({
  activity_id: z.number().int(),
  participant_id: z.string().max(50),
  comment: z.string().optional(),
  register_validated: z.number().min(0).max(1).optional(),
});
