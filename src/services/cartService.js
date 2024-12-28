import { prisma } from "../config/db.js";

const getCartByUserId = async (userId) => {
  const cartItems = await prisma.carts_items.findMany({
    where: { carts: { user_id: userId } },
    include: {
      activities: {
        select: {
          name: true,
          location: true,
          img_url: true,
          price: true,
          require_approval: true,
          pay_type: true,
          event_time: true,
        },
      },
    },
  });

  const totalActivities = cartItems.length;
  return { cartItems, totalActivities };
};

const addToCart = async (userId, activityId) => {
  try {
    // 取得活動資料以檢查 host_id
    const activity = await prisma.activities.findUnique({
      where: { id: activityId },
    });

    if (!activity) {
      throw new Error("活動不存在");
    }

    // 如果活動的 host_id 等於 userId，則禁止新增
    if (activity.host_id === userId) {
      return { message: "無法將自己主辦的活動加入購物車", status: 403 };
    }

    // 檢查購物車是否已存在
    let cart = await prisma.carts.findFirst({
      where: { user_id: userId },
    });

    // 如果購物車不存在，建立新的購物車
    if (!cart) {
      cart = await prisma.carts.create({
        data: {
          user_id: userId,
        },
      });
    }

    // 檢查是否已存在於購物車中
    const existingItem = await prisma.carts_items.findFirst({
      where: { cart_id: cart.id, activity_id: activityId },
    });

    if (existingItem) {
      return { message: "活動已存在於購物車中", status: 200 };
    }

    // 新增活動到購物車
    const newItem = await prisma.carts_items.create({
      data: { cart_id: cart.id, activity_id: activityId },
    });

    return newItem;
  } catch (error) {
    console.error("無法新增至購物車:", error);
    throw new Error(`無法新增至購物車: ${error.message}`);
  }
};

const removeFromCart = async (userId, activityId) => {
  try {
    // 查找該使用者的購物車
    const cart = await prisma.carts.findFirst({
      where: { user_id: userId }, // 查找對應的購物車
    });

    if (!cart) {
      throw new Error("購物車不存在");
    }
    // 檢查購物車中是否包含該活動
    const existingItem = await prisma.carts_items.findFirst({
      where: { cart_id: cart.id, activity_id: activityId },
    });

    if (!existingItem) {
      return {
        message: "購物車中沒有該活動，無法移除",
        status: 404, // 明確返回 404 狀態碼
      };
    }

    // 如果存在，刪除該活動
    await prisma.carts_items.delete({
      where: { id: existingItem.id },
    });

    return {
      message: "成功移除購物車項目",
      status: 200,
    };
  } catch (error) {
    console.error("無法從購物車中刪除:", error.message);
    throw new Error(`無法移除購物車內容: ${error.message}`);
  }
};

const clearCart = async (uid) => {
  return await prisma.carts_items.deleteMany({
    where: {
      carts: { user_id: uid },
      is_selected: true,
    },
  });
};

const getSelectedCartItems = async (userId) => {
  const cart = await prisma.carts.findFirst({
    where: { user_id: userId },
  });

  const cartItems = await prisma.carts_items.findMany({
    where: { cart_id: cart.id, is_selected: true },
    include: {
      activities: {
        select: {
          name: true,
          location: true,
          img_url: true,
          price: true,
          require_approval: true,
          pay_type: true,
          event_time: true,
          require_approval: true,
        },
      },
    },
  });

  // 計算選中項目總數
  const totalActivities = cartItems.length;

  return { cartItems, totalActivities };
};

const updateSelectedStatus = async (id, isSelected) => {
  await prisma.carts_items.findUnique({
    where: { id: parseInt(id, 10) },
  });

  return await prisma.carts_items.update({
    where: { id: parseInt(id, 10) },
    data: { is_selected: isSelected },
  });
};

export const cartService = {
  getCartByUserId,
  addToCart,
  removeFromCart,
  clearCart,
  getSelectedCartItems,
  updateSelectedStatus,
};
