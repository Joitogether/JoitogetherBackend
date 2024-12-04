import { z } from 'zod'

const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;


export const CreatePostSchema = z.object({
  post_title: z.string().max(10),
  post_content: z.string(),
  uid: z.string().max(255),
  updated_at: z.string().regex(dateTimeRegex).optional(),
  post_category: z.enum(['food', 'shopping', 'travel', 'sports', 'education', 'others']),
  post_status: z.enum(['onEdit', 'posted', 'deleted']),
  post_img: z.string().optional()  
})

export const CreatePostCommentSchema = z.object({
  comment_content: z.string(),
  uid: z.string().max(255),
  post_id: z.number().int()
})

export const GetPostSchema = z.object({
  post_id: z.number().int()
})

export const GetCategoryPostSchema = z.object({
  post_category: z.enum(['food', 'shopping', 'travel', 'sports', 'education', 'others'])
})