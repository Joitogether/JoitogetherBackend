import express from "express";
import * as OrderController from "../controllers/orderController.js";

const router = express.Router();

// Order List
router.get("/", OrderController.fetchAllOrders);
router.get("/:order_id", OrderController.fetchOrderById);

// Order Create/Delete
router.post("/", OrderController.addOrder);
router.delete("/:order_id/delete", OrderController.removeOrder);

// Order Status Management
router.put("/:order_id/complete", OrderController.completeOrder);
router.put("/:order_id/fail", OrderController.failOrder);
router.put("/:order_id/cancel", OrderController.cancelOrder);

export default router;
