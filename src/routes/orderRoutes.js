import express from "express";
import * as OrderController from "../controllers/orderController.js";

const router = express.Router();

// Order List
router.get("/", OrderController.fetchAllOrders);
router.get("/:order_id", OrderController.fetchOrderById);

// Order Create
router.post("/", OrderController.addOrder);

export default router;
