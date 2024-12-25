import express from "express";
import * as ApplicationController from "../controllers/applicationController.js";
const router = express.Router();

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
router.get(
  "/:activity_id",
  /* #swagger.tags = ['Application'] */
  ApplicationController.fetchActivityRegistrations
);
router.put(
  "/verify/:application_id",
  /* #swagger.tags = ['Application'] */
  ApplicationController.approveActivityParticipant
);

export default router;
