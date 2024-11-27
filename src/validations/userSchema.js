import { z } from 'zod'

export const UserCreateSchema = z.object({
  uid: z.string().max(255),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
  email_verified: z.boolean(),
  full_name: z.string().max(255),
  display_name: z.string().max(255),
  phone_number: z.string().regex(/^09\d{8}$/),
  photo_url: z.string()
})