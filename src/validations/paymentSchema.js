import { z } from 'zod'

export const PaymentSchema = z.object({
  uid: z.string().max(255),
  amount: z.number(),
})