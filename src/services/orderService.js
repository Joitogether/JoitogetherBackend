import { prisma } from "../config/db.js";
import {
  GetOrderSchema,
  CreateOrderSchema,
} from "../validations/orderSchema.js";

export const orderService = {
  // 獲取用戶所有的訂單
  async getAllOrders() {
    const response = await prisma.orders.findMany();
    if (response.length === 0) {
      return null;
    }
    return response;
  },

  // 獲取單一訂單
  async getOrderById(order_id) {
    GetOrderSchema.parse({ order_id });
    const response = await prisma.orders.findUnique({
      where: {
        order_id,
      },
    });
    if (!response.length === 0) {
      return null;
    }
    return response;
  },

  // 創建訂單
  async createOrder(data) {
    CreateOrderSchema.parse(data);
    return await prisma.orders.create({
      data: {
        uid: data.uid,
        total_amount: data.total_amount,
        order_status: data.order_status,
        order_items: {
          create: data.order_item.map((item) => ({
            activity_id: item.activity_id,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.subtotal,
          })),
        },
      },
      include: {
        order_items: true,
      },
    });
  },
};
