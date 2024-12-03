import { z } from 'zod'


export const GetRatingSchema = z.object({
  host_id: z.string().max(50)
})