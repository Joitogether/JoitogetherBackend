import { number, z } from "zod";

export const UserCreateSchema = z.object({
  uid: z.string().max(255),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
  email_verified: z.boolean(),
  full_name: z.string().max(255),
  display_name: z.string().max(255),
  phone_number: z.string().regex(/^09\d{8}$/),
  photo_url: z.string().optional(),
});

export const UserUpdateSchema = z.object({
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
    .optional(),
  email_verified: z.boolean().optional(),
  full_name: z.string().max(255).optional(),
  display_name: z.string().max(255).optional(),
  phone_number: z
    .string()
    .regex(/^09\d{8}$/)
    .optional(),
  photo_url: z.string().nullable().optional(),
  city: z.string().max(5).nullable().optional(),
  age: z.number().int().nullable().optional(),
  career: z.string().max(45).nullable().optional(),
  favortie_sentence: z.string().max(45).nullable().optional(),
  tags: z.string().max(255).nullable().optional(),
  sel_introduction: z.string().max(255).nullable().optional(),
  zodiac: z.string().max(3).nullable().optional(),
  hobby: z.string().max(45).nullable().optional(),
  expertise: z.string().max(45).nullable().optional(),
  interested_in: z.string().max(255).nullable().optional(),
  life_photo_1: z.string().nullable().optional(),
  life_photo_2: z.string().nullable().optional(),
});

export const UserUidSchema = z.object({
  uid: z.string().max(255).min(5),
});

// followers table
export const GetFollowersSchema = z.object({
  user_id: z.string().max(255),
});

export const GetFollowingSchema = z.object({
  follower_id: z.string().max(255),
});

export const NotificationSchema = z.object({
  user_id: z.string().max(255),
  actor_id: z.string().max(255),
  action: z.enum([
    "like",
    "comment",
    "register",
    "review",
    "rate",
    "create",
    "follow",
  ]),
  target_type: z.enum(["post", "activity", "rating", "user"]),
  message: z.string(),
});

export const NotificationsSchema = z.array(NotificationSchema);

export const NotificationListSchema = z.object({
  unreadList: z.array(z.number().int()).min(1),
});

export const CreateRatingSchema = z.object({
  host_id: z.string().max(255),
  user_id: z.string().max(255),
  rating_heart: z.number().int().min(1).max(5),
  user_comment: z.string(),
  rating_kindness: z.number().int().min(1).max(5),
  rating_ability: z.number().int().min(1).max(5),
  rating_credit: z.number().int().min(1).max(5),
});
