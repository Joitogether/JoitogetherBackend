import express from "express";
import * as ActivityController from "../controllers/activityController.js";
const router = express.Router();

// Activity List
router.get(
  "/",
  /* #swagger.tags = ['Activity'] */
  ActivityController.fetchAllActiveActivities
);
router.get(
  "/:id",
  /* #swagger.tags = ['Activity'] */
  ActivityController.fetchActivityDetails
);
router.get(
  "/category/:type",
  /* #swagger.tags = ['Activity'] */
  ActivityController.fetchActivitiesByCategory
);

// Activity Create/Delete
router.post(
  "/",
  /* #swagger.tags = ['Activity'] */
  ActivityController.addNewActivity
);
router.put(
  "/cancel/:id",
  /* #swagger.tags = ['Activity'] */
  ActivityController.cancelActivityRequest
);
router.post(
  "/search",
  /* #swagger.tags = ['Activity'] */
  ActivityController.searchActivities
);

// Activity Comment
router.post(
  "/comment/:activity_id",
  /* #swagger.tags = ['Activity'] */
  ActivityController.addActivityComments
);
router.delete(
  "/comment/:comment_id",
  /* #swagger.tags = ['Activity'] */
  ActivityController.removeActivityComment
);

// Google Map
// Google 地址搜尋結果
router.post(
  "/geocode",
  /* #swagger.ignore = true */
  ActivityController.googleMapGeocode
);
router.post(
  "/autocomplete",
  /* #swagger.ignore = true */
  ActivityController.googleAutocomplete
);

export default router;
