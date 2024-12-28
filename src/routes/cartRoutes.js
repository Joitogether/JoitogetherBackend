import express from "express";
import * as CartController from "../controllers/cartController.js";

const router = express.Router();

// 獲取購物車內容
router.get("/:userId", CartController.fetchCartByUserId);

// 新增購物車項目
router.post("/:userId", CartController.addActivityToCart);

// 移出購物車項目
router.delete("/:userId/:activityId", CartController.removeActivityFromCart);

// 清空購物車
router.delete("/:uid/clear", CartController.removeCartItems);

// 獲取被選中的購物車項目
router.get("/:userId/selected", CartController.getSelectedItems);

// 更改購物車項目被選中狀態
router.put("/:id/update-selection", CartController.updateSelection);

export default router;
