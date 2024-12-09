import { z } from 'zod'


export const RatingGetSchema = z.object({
  host_id: z.string().max(50)
})