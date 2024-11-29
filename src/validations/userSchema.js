import { z } from 'zod'

export const UserCreateSchema = z.object({
  uid: z.string().max(255),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
  email_verified: z.boolean(),
  full_name: z.string().max(255),
  display_name: z.string().max(255),
  phone_number: z.string().regex(/^09\d{8}$/),
  photo_url: z.string().optional()
})

export const UserUpdateSchema = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/).optional(),
  email_verified: z.boolean().optional(),
  full_name: z.string().max(255).optional(),
  display_name: z.string().max(255).optional(),
  phone_number: z.string().regex(/^09\d{8}$/).optional(),
  photo_url: z.string().optional(),
  city: z.string().max(5).optional(),
  age: z.number().int().optional(),
  career: z.string().max(45).optional(),
  favortie_sentence: z.string().max(45).optional(),
  tags: z.string().max(255).optional(),
  sel_introduction: z.string().max(255).optional(),
  zodiac: z.string().max(3).optional(),
  hobby: z.string().max(45).optional(),
  expertise: z.string().max(45).optional(),
  interested_in: z.string().max(255).optional(),
  life_photo_1: z.string().optional(),
  life_photo_2: z.string().optional(),
})