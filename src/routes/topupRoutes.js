import express from "express";
import * as TopupController from "../controllers/topupController.js";

const router = express.Router();

router.get(
  "/records/:uid",
  /* #swagger.tags = ['Top Up'] */

  TopupController.getTopuperRecord
);

router.post(
  "/encrypt/process",
  /* #swagger.tags = ['Top Up'] */
  TopupController.handleTopupProcess
);

router.post(
  "/newebpay_notify",
  /* #swagger.tags = ['Top Up'] */
  TopupController.handleNewebpayNotify
);

export default router;
