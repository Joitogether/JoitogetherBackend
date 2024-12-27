import express from "express";
import * as CartController from "../controllers/cartController.js";

const router = express.Router();

// Cart Item Management
router.get(
  "/:userId",
  /* #swagger.tags = ['Cart'] */
  CartController.fetchCartByUserId
);
router.post(
  "/:userId",
  /* #swagger.tags = ['Cart'] */
  CartController.addActivityToCart
);
router.delete(
  "/:userId/:activityId",
  /* #swagger.tags = ['Cart'] */
  CartController.removeActivityFromCart
);

// Cart Selected Item Management
router.get(
  "/:userId/selected",
  /* #swagger.tags = ['Cart'] */
  CartController.getSelectedItems
);

router.put(
  "/:id/update-selection",
  /* #swagger.tags = ['Cart'] */
  CartController.updateSelection
);

router.delete(
  "/:uid/clear",
  /* #swagger.tags = ['Cart'] */
  CartController.removeCartItems
);

export default router;
