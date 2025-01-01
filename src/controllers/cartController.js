import { cartService } from "../services/cartService.js";
import {
  AddToCartSchema,
  RemoveFromCartSchema,
  UserIdParamSchema,
} from "../validations/cartSchema.js";

const fetchCartByUserId = async (req, res, next) => {
  try {
    UserIdParamSchema.parse(req.params);
    const userId = req.params.userId;

    const response = await cartService.getCartByUserId(userId);

    if (!response || response.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "查無資料",
        data: [],
      });
    }

    res.status(200).json({
      status: 200,
      message: "購物車成功取得資料",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const addActivityToCart = async (req, res, next) => {
  try {
    UserIdParamSchema.parse(req.params);
    AddToCartSchema.parse(req.body);

    const userId = req.params.userId;
    const { activityId } = req.body;

    const response = await cartService.addToCart(userId, activityId);

    // 檢查 cart 是否為錯誤訊息（例如 status 403）
    if (response.status && response.status === 403) {
      return res.status(response.status).json({
        status: response.status,
        message: response.message,
        data: null,
      });
    }

    // 正常新增回應
    res.status(201).json({
      status: 201,
      message: "成功新增至購物車",
      data: response,
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

    const response = await cartService.removeFromCart(userId, activityId);

    if (response.status == 404) {
      return res.status(404).json({
        status: 404,
        message: response.message,
        data: null,
      });
    }
    res.status(200).json({
      status: 200,
      message: "成功移除購物車項目",
      data: null,
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
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const getSelectedItems = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const response = await cartService.getSelectedCartItems(userId);

    if (!response || response.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "查無資料",
        data: [],
      });
    }

    res.status(200).json({
      status: 200,
      message: "成功取得已選擇項目",
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
      data: null,
    });
  }

  try {
    const response = await cartService.updateSelectedStatus(id, isSelected);

    if (!response) {
      return res.status(404).json({
        status: 404,
        message: `ID 為 ${id} 的項目更新失敗`,
        data: null,
      });
    }

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
