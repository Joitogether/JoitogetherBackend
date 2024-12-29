import express from "express";
import * as TopupController from "../controllers/topupController.js"

const router = express.Router();

router.get("/records/:uid", TopupController.getTopuperRecord);

router.post("/process", TopupController.handleTopupProcess)
router.post("/newebpay_notify", TopupController.handleNewebpayNotify)



export default router;
