import express from "express";
import * as TopupController from "../controllers/topupController.js"

const router = express.Router();

router.get("/records/:uid", TopupController.getTopuperRecord);

router.post("/encrypt/process", TopupController.handleTopupProcess)
router.post("/newebpay_notify", TopupController.handleNewebpayNotify)
router.post("/return/:id", TopupController.handleReturn)


export default router;
