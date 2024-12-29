import express from "express";
import * as RatingController from "../controllers/ratingController.js";
const router = express.Router();

router.get("/:host_id", RatingController.fetchHostRatings);
router.get("/hostDetails/:host_id", RatingController.fetchHostDetails);
router.get("/userDetails/:user_id", RatingController.fetchUserDetails);
router.get(
  "/activity/:activity_id",
  RatingController.fetchActivityAndHostRating
);
router.get("/summary/:host_id", RatingController.fetchSummary);

router.post("/", RatingController.createRating);

export default router;
