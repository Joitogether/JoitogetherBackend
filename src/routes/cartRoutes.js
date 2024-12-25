import express from "express";
import * as CartController from "../controllers/cartController.js";

const router = express.Router();

// 獲取購物車內容
router.get(
  "/:userId",
  /* #swagger.tags = ['Cart'] */
  CartController.fetchCartByUserId
);

// 新增購物車項目
router.post(
  "/:userId",
  /* #swagger.tags = ['Cart'] */
  CartController.addActivityToCart
);

// 移出購物車項目
router.delete(
  "/:userId/:activityId",
  /* #swagger.tags = ['Cart'] */
  CartController.removeActivityFromCart
);

// 清空購物車
router.delete(
  "/:uid/clear",
  /* #swagger.tags = ['Cart'] */
  CartController.removeCartItems
);

// 獲取被選中的購物車項目
router.get(
  "/:userId/selected",
  /* #swagger.tags = ['Cart'] */
  CartController.getSelectedItems
);

// 更改購物車項目被選中狀態
router.put(
  "/:id/update-selection",
  /* #swagger.tags = ['Cart'] */
  CartController.updateSelection
);

export default router;
