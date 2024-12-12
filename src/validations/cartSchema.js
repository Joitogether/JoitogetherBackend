import { z } from "zod";

// 驗證新增活動到購物車的資料
const AddToCartSchema = z.object({
  activityId: z.number().int().positive(), // 活動 ID 必須是正整數
  quantity: z.number().int().positive().optional(), // 數量可選，預設為正整數
});

// 驗證更新購物車項目的資料
const UpdateCartItemSchema = z.object({
  activityId: z.number().int().positive(), // 活動 ID 必須是正整數
  quantity: z.number().int().positive(), // 數量必須是正整數
});

// 驗證移除活動的資料
const RemoveFromCartSchema = z.object({
  activityId: z.number().int().positive(), // 活動 ID 必須是正整數
});

// 用於驗證 URL 參數中的 userId 是否有效
const UserIdParamSchema = z.object({
  userId: z.string().uuid(), // 假設 userId 是 UUID 格式
});

export {
  AddToCartSchema,
  UpdateCartItemSchema,
  RemoveFromCartSchema,
  UserIdParamSchema,
};
