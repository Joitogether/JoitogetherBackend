import express from "express";
import * as TopupController from "../controllers/topupController.js"

const router = express.Router();

router.post("/orderdetail/:uid", TopupController.saveTopupDetail);
router.get("/records/:uid", TopupController.getWalletRecord);
router.post("/newebpay_return", TopupController.handleNewebpayReturn)


export default router;
