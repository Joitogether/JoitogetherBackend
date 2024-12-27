import express from "express";
import * as ApplicationController from "../controllers/applicationController.js";
const router = express.Router();

// Application List
router.get("/:activity_id", ApplicationController.fetchActivityRegistrations);

// Activity Registration/Cancellation
router.post(
  "/register/:activity_id",
  ApplicationController.createActivityRegistration
);
router.put(
  "/cancel/:activity_id",
  ApplicationController.removeActivityRegistration
);

// Activity Participant Verification
router.put(
  "/verify/:application_id",
  ApplicationController.approveActivityParticipant
);

export default router;
