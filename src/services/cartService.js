import { prisma } from "../config/db.js"

const getCartByUserId = async (userId) => {
  // 獲取該使用者的購物車內容
  const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
          activity: true, // 假設有關聯的活動資料
      },
  });

  // 計算已報名的活動數量
  const totalActivities = cartItems.length;

  return {
      cartItems,
      totalActivities,
  };
};

const addToCart = async (userId, activityId, quantity = 1) => {
  // 檢查購物車中是否已有該活動
  const existingItem = await prisma.cartItem.findFirst({
      where: { userId, activityId },
  });

  if (existingItem) {
      // 如果活動已存在，不做任何處理
      return { message: '活動已存在於購物車中', status: 200 };
  } else {
      // 如果不存在，新增至購物車
      const newItem = await prisma.cartItem.create({
          data: {
              userId,
              activityId,
              quantity, // 預設數量為 1
          },
      });
      return newItem;
  }
};

const updateCartItem = async (userId, activityId, quantity) => {
    // 更新購物車中特定活動的數量
    const updatedItem = await prisma.cartItem.updateMany({
        where: { userId, activityId },
        data: { quantity },
    });

    return updatedItem;
};

const removeFromCart = async (userId, activityId) => {
    // 刪除購物車中的特定活動
    const deletedItem = await prisma.cartItem.deleteMany({
        where: { userId, activityId },
    });

    return deletedItem;
};

export const cartService = {
    getCartByUserId,
    addToCart,
    updateCartItem,
    removeFromCart,
};
