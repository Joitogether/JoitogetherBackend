import { prisma } from "../config/db.js";
import {
  GetOrderSchema,
  CreateOrderSchema,
  UpdateOrderSchema,
} from "../validations/orderSchema.js";

export const orderService = {
  // 獲取用戶所有的訂單
  async getAllOrders() {
    return await prisma.orders.findMany();
  },

  // 獲取單一訂單
  async getOrderById(order_id) {
    GetOrderSchema.parse({ order_id });
    return await prisma.orders.findUnique({
      where: {
        order_id,
      },
      include: {
        order_items: {
          include: {
            activities: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  },

  // 檢查是否有未完成的訂單
  async getPendingOrder(uid) {
    return await prisma.orders.findFirst({
      where: {
        uid,
        order_status: "pending",
      },
    });
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

  // 訂單狀態管理
  async updateOrderStatus(order_id, order_status) {
    UpdateOrderSchema.parse({ order_id, order_status });
    return await prisma.orders.update({
      where: { order_id },
      data: { order_status },
    });
  },
};
