import express from "express";
import * as OrderController from "../controllers/orderController.js";

const router = express.Router();

// Order List
router.get(
  "/",
  /* #swagger.tags = ['Order'] */
  OrderController.fetchAllOrders
);

router.get(
  "/:order_id",
  /* #swagger.tags = ['Order'] */
  OrderController.fetchOrderById
);

router.get(
  "/pending/:uid",
  /* #swagger.tags = ['Order'] */
  OrderController.fetchPendingOrder
);

// Order Create/Delete
router.post(
  "/",
  /* #swagger.tags = ['Order'] */
  OrderController.addOrder
);

router.delete(
  "/:order_id/delete",
  /* #swagger.tags = ['Order'] */
  OrderController.removeOrder
);

// Order Status Management
router.put(
  "/:order_id/complete",
  /* #swagger.tags = ['Order'] */
  OrderController.completeOrder
);

router.put(
  "/:order_id/fail",
  /* #swagger.tags = ['Order'] */
  OrderController.failOrder
);

router.put(
  "/:order_id/cancel",
  /* #swagger.tags = ['Order'] */
  OrderController.cancelOrder
);

export default router;
