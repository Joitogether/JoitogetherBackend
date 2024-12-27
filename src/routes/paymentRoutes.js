import express from "express";
import * as PaymentController from "../controllers/paymentController.js";

const router = express.Router();

// Balance Add
router.post(
  "/encrypt",
  /* #swagger.tags = ['Balance'] */
  PaymentController.paymentEncrytOrder
);
router.post(
  "/wallet/:uid/deposit",
  /* #swagger.tags = ['Balance'] */
  PaymentController.paymentDeposit
);

// Wallet List
router.get(
  "/wallet/:uid",
  /* #swagger.tags = ['Balance'] */
  PaymentController.fetchWalletBalance
);
router.get(
  "/wallet/:uid/transactions",
  /* #swagger.tags = ['Balance'] */
  PaymentController.fetchTransactionHistory
);

// Balance Debit
router.put(
  "/wallet/:uid/spend",
  /* #swagger.tags = ['Balance'] */
  PaymentController.decreaseBalance
);

// Checkout Process
router.post(
  "/order/process",
  /* #swagger.tags = ['Process'] */
  PaymentController.handleCheckoutProcess
);

export default router;
