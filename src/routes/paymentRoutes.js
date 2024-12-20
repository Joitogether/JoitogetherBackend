import express from "express";
import * as PaymentController from "../controllers/paymentController.js";

const router = express.Router();

// Balance Add
router.post("/encrypt", PaymentController.paymentEncrytOrder);
router.post("/deposit/:uid", PaymentController.paymentDeposit);

// Wallet List
router.get("/wallet/:uid", PaymentController.fetchWalletByUid);
router.get(
  "/wallet/:uid/transactions",
  PaymentController.fetchWalletTransactions
);

// Balance Debit
router.put("/wallet/:uid/debit", PaymentController.spendBalance);

export default router;
