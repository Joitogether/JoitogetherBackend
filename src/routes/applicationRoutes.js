import express from "express";
import * as ApplicationController from "../controllers/applicationController.js";
const router = express.Router();

router.post(
  "/register/:activity_id",
  ApplicationController.createActivityRegistration
);
router.put(
  "/cancel/:activity_id",
  ApplicationController.removeActivityRegistration
);
router.get("/:activity_id", ApplicationController.fetchActivityRegistrations);
router.put(
  "/verify/:application_id",
  ApplicationController.approveActivityParticipant
);

export default router;
