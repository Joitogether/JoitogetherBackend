import express from "express";
import * as CartController from "../controllers/cartController.js";

const router = express.Router();

// Cart Item Management
router.get("/:userId", CartController.fetchCartByUserId);
router.post("/:userId", CartController.addActivityToCart);
router.delete("/:userId/:activityId", CartController.removeActivityFromCart);

// Cart Selected Item Management
router.get("/:userId/selected", CartController.getSelectedItems);
router.put("/:id/update-selection", CartController.updateSelection);
router.delete("/:uid/clear", CartController.removeCartItems);

export default router;
