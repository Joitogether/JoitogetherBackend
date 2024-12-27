import express from "express";
import * as ApplicationController from "../controllers/applicationController.js";
const router = express.Router();

// Application List
router.get(
  "/:activity_id",
  /* #swagger.tags = ['Application'] */
  ApplicationController.fetchActivityRegistrations
);

// Activity Registration/Cancellation
router.post(
  "/register/:activity_id",
  /* #swagger.tags = ['Application'] */
  ApplicationController.createActivityRegistration
);
router.put(
  "/cancel/:activity_id",
  /* #swagger.tags = ['Application'] */
  ApplicationController.removeActivityRegistration
);

// Activity Participant Verification
router.put(
  "/verify/:application_id",
  /* #swagger.tags = ['Application'] */
  ApplicationController.approveActivityParticipant
);

export default router;
