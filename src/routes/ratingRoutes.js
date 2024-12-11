import express from "express";
import * as RatingController from "../controllers/ratingController.js";
const router = express.Router();

router.get("/:host_id", RatingController.fetchHostRatings);
router.get("/hostDetails/:host_id", RatingController.fetchHostDetails);
router.get("/userDetails/:user_id", RatingController.fetchUserDetails);

export default router;
