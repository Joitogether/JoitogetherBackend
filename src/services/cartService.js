import { prisma } from "../config/db.js";

const getCartByUserId = async (userId) => {
    try {
        const cartItems = await prisma.carts_comments.findMany({
            where: { cart: { user_id: userId } },
            include: { activity: true },
        });

        const totalActivities = cartItems.length;

        return { cartItems, totalActivities };
    } catch (error) {
        console.error("無法取得購物車:", error);
        throw new Error(`無法獲取購物車內容: ${error.message}`);
    }
};

const addToCart = async (userId, activityId) => {
    try {
        if (!userId || !activityId) throw new Error("缺少必要的參數");

        // 檢查購物車是否存在
        let cart = await prisma.carts.findFirst({
            where: { user_id: userId },
        });

        // 如果購物車不存在，創建購物車
        if (!cart) {
            cart = await prisma.carts.create({
                data: {
                    user_id: userId,
                    created_at: new Date(),
                },
            });
        }

        // 檢查購物車中是否已有該活動
        const existingItem = await prisma.carts_comments.findFirst({
            where: { cart_id: cart.id, activity_id: activityId },
        });
        if (existingItem) {
            return { message: "活動已存在於購物車中", status: 200 };
        }

        // 新增活動到購物車
        const newItem = await prisma.carts_comments.create({
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
        if (!userId || !activityId) throw new Error("缺少必要的參數");

        const deletedItem = await prisma.carts_comments.deleteMany({
            where: { cart: { user_id: userId }, activity_id: activityId },
        });

        return deletedItem;
    } catch (error) {
        console.error("無法從購物車中刪除:", error);
        throw new Error(`無法移除購物車內容: ${error.message}`);
    }
};

export const cartService = {
    getCartByUserId,
    addToCart,
    removeFromCart,
};
