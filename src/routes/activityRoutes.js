import express from "express";
import * as ActivityController from "../controllers/activityController.js";
const router = express.Router();

// Activity List
router.get("/", ActivityController.fetchAllActiveActivities);
router.get("/:id", ActivityController.fetchActivityDetails);
router.get("/category/:type", ActivityController.fetchActivitiesByCategory);

// Activity Create/Delete
router.post("/", ActivityController.addNewActivity);
router.put("/cancel/:id", ActivityController.cancelActivityRequest);
router.post("/search", ActivityController.searchActivities);

// Activity Comment
router.post("/comment/:activity_id", ActivityController.addActivityComments);
router.delete("/comment/:comment_id", ActivityController.removeActivityComment);

// Google Map
// Google 地址搜尋結果
router.post("/geocode", ActivityController.googleMapGeocode);
router.post("/autocomplete", ActivityController.googleAutocomplete);

export default router;
