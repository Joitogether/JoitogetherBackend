import express from "express";
import * as RatingController from "../controllers/ratingController.js";
const router = express.Router();

router.get(
  "/:host_id",
  /* #swagger.tags = ['Rating'] */
  RatingController.fetchHostRatings
);
router.get(
  "/hostDetails/:host_id",
  /* #swagger.tags = ['Rating'] */
  RatingController.fetchHostDetails
);
router.get(
  "/userDetails/:user_id",
  /* #swagger.tags = ['Rating'] */
  RatingController.fetchUserDetails
);
router.get(
  "/activity/:activity_id",
  /* #swagger.tags = ['Rating'] */
  RatingController.fetchActivityAndHostRating
);

router.post(
  "/",
  /* #swagger.tags = ['Rating'] */
  RatingController.createRating
);

export default router;
