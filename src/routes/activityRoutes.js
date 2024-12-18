import express from "express";
import * as ActivityController from "../controllers/activityController.js";
const router = express.Router();

// Activity List
router.get("/", ActivityController.fetchAllActiveActivities);
router.get("/:id", ActivityController.fetchActivityDetails);
router.get("/category/:category", ActivityController.fetchActivitiesByCategory);


// Activity Create/Delete
router.post("/", ActivityController.addNewActivity);
router.put("/cancel/:id", ActivityController.cancelActivityRequest);

// Activity Comment
router.post("/comment/:activity_id", ActivityController.fetchActivityComments);
router.delete("/comment/:comment_id", ActivityController.removeActivityComment);

export default router;
