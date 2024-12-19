import { z } from "zod";

export const GetOrderSchema = z.object({
  order_id: z.number().int(),
});

export const CreateOrderSchema = z.object({
  uid: z.string().max(255),
  total_amount: z.number().int(),
  order_status: z.enum(["pending", "completed", "cancelled"]),
  order_item: z.array(
    z.object({
      activity_id: z.number().int(),
      quantity: z.number().int(),
      price: z.number().int(),
      subtotal: z.number().int(),
    })
  ),
});
