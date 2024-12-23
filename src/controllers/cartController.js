import { cartService } from "../services/cartService.js";
import {
  AddToCartSchema,
  RemoveFromCartSchema,
  UserIdParamSchema,
} from "../validations/cartSchema.js";

const fetchCartByUserId = async (req, res, next) => {
  try {
    UserIdParamSchema.parse(req.params); // 驗證 userId
    const userId = req.params.userId;
    const cart = await cartService.getCartByUserId(userId);

    res.status(200).json({
      status: 200,
      message: "購物車資料獲取成功",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const addActivityToCart = async (req, res, next) => {
  try {
    UserIdParamSchema.parse(req.params); // 驗證 userId
    AddToCartSchema.parse(req.body); // 驗證 body 資料

    const userId = req.params.userId;
    const { activityId } = req.body; // 僅接收活動 ID
    const cart = await cartService.addToCart(userId, activityId);

    // 檢查 cart 是否為錯誤訊息（例如 status 403）
    if (cart.status && cart.status === 403) {
      return res.status(cart.status).json({
        status: cart.status,
        message: cart.message,
      });
    }

    // 正常新增回應
    res.status(201).json({
      status: 201,
      message: "成功新增至購物車",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const removeActivityFromCart = async (req, res, next) => {
  try {
    // 驗證所有參數
    RemoveFromCartSchema.parse({
      userId: req.params.userId,
      activityId: parseInt(req.params.activityId, 10),
    });

    const userId = req.params.userId;
    const activityId = parseInt(req.params.activityId, 10);
    const result = await cartService.removeFromCart(userId, activityId);

    if (result.status == 404) {
      return res.status(404).json({
        status: 404,
        message: result.message,
      });
    }
    res.status(200).json({
      status: 200,
      message: "成功移除購物車項目",
    });
  } catch (error) {
    next(error);
  }
};

const removeCartItems = async (req, res, next) => {
  const { uid } = req.params;
  try {
    await cartService.clearCart(uid);
    res.status(200).json({
      status: 200,
      message: "購物車清空成功",
    });
  } catch (error) {
    next(error);
  }
};

const getSelectedItems = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const response = await cartService.getSelectedCartItems(userId);
    res.status(200).json({
      status: 200,
      message: "成功獲取已選擇項目",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const updateSelection = async (req, res, next) => {
  const { id } = req.params;
  const { isSelected } = req.body;

  if (typeof isSelected !== "boolean") {
    return res.status(400).json({
      status: 400,
      message: "isSelected 必須為布林值",
    });
  }

  try {
    const response = await cartService.updateSelectedStatus(id, isSelected);
    res.status(200).json({
      status: 200,
      message: `ID 為 ${id} 的項目成功更新選擇狀態`,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
export {
  fetchCartByUserId,
  addActivityToCart,
  removeActivityFromCart,
  removeCartItems,
  getSelectedItems,
  updateSelection,
};
