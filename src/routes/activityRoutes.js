import express from "express";
import * as ActivityController from "../controllers/activityController.js";
const router = express.Router();

// Activity List
router.get(
  "/:id",
  /* #swagger.tags = ['Activity'] */
  ActivityController.fetchActivityDetails
);
router.get(
  "/",
  /* #swagger.tags = ['Activity'] */
  ActivityController.fetchAllActivities
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

// Activity Comment
router.post(
  "/comment/:activity_id",
  /* #swagger.tags = ['Activity_Comment'] */
  ActivityController.addActivityComments
);
router.delete(
  "/comment/:comment_id",
  /* #swagger.tags = ['Activity_Comment'] */
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
