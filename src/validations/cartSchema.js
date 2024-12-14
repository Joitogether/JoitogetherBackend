import { z } from "zod";

// 驗證新增活動到購物車的資料
const AddToCartSchema = z.object({
  activityId: z.number().int().positive(), // 活動 ID 必須是正整數
});


// 驗證移除活動的資料
const RemoveFromCartSchema = z.object({
  userId: z.string().max(255),
  activityId: z.number().int(), 
});

// 用於驗證 URL 參數中的 userId 是否有效
const UserIdParamSchema = z.object({
  userId: z.string().max(255), 
});

export {
  AddToCartSchema,
  RemoveFromCartSchema,
  UserIdParamSchema,
};
