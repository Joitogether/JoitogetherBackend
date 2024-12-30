import express from "express";
import * as PaymentController from "../controllers/paymentController.js";

const router = express.Router();

// Balance Add
router.post("/wallet/:uid/deposit", PaymentController.paymentDeposit);

// Wallet List
router.get("/wallet/:uid", PaymentController.fetchWalletBalance);
router.get(
  "/wallet/:uid/transactions",
  PaymentController.fetchTransactionHistory
);

// Balance Debit
router.put("/wallet/:uid/spend", PaymentController.decreaseBalance);

// Checkout Process
router.post("/order/process", PaymentController.handleCheckoutProcess);

export default router;
