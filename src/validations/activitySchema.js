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
  approval_deadline: z.string().regex(dateTimeRegex),
  min_participants: z.number().int(), 
  max_participants: z.number().int(), 
  pay_type: z.enum(['free', 'AA', 'host']),
  price: z.number().min(0),
  require_approval: z.number().int(), 
  status: z.enum(['registrationOpen', 'onGoing', 'completed', 'cancelled']),
});


export const ApplicationUpdateSchema = z.enum(['registered', 'approved', 'host_declined', 'participant_cancelled']);