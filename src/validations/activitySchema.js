import { z } from "zod";

const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

export const ActivityCreateSchema = z.object({
  name: z.string().max(50),
  img_url: z.string().optional(), 
  description: z.string(),
  location: z.string(),
  category: z.enum(['food', 'shopping', 'travel', 'sports', 'education', 'others']),
  event_time: z.string().regex(dateTimeRegex),
  host_id: z.string().max(50),
  approval_deadline: z.string().regex(dateTimeRegex).optional().nullable(),
  min_participants: z.number().int(), 
  max_participants: z.number().int(), 
  pay_type: z.enum(['free', 'AA', 'host','paymentRequired']),
  price: z.number().min(0),
  require_approval: z.number().int(), 
  status: z.enum(['registrationOpen', 'onGoing', 'completed', 'cancelled']),
  require_payment: z.number().int(),
});

export const ActivityCommentSchema = z.object({
  activity_id: z.number().int(),
  comment: z.string().max(50),
  participant_id: z.string().max(50)
})

export const ActivityCommentCancelSchema = z.object({
  comment_id: z.number().int(),
})

export const ActivityGetCategorySchema = z.object({
  category: z.enum(['food', 'shopping', 'travel', 'sports', 'education', 'others']),
  page: z.number().int(),
  pageSize: z.number().int().min(1)
})