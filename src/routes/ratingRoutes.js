import express from "express";
import { ratingService } from "../services/ratingService.js";
const router = express.Router();

router.get("/:host_id", async (req, res, next) => {
  try {
    const { host_id } = req.params;
    const response = await ratingService.getRatingByHostId(host_id);
    if (!response || response.length === 0) {
      return res.status(404).json({
        message: "查無此資料",
        status: 404,
      });
    }
    res.status(200).json({
      status: 200,
      message: "資料獲取成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
});

// 獲得評論者詳細資料（含 city display_name photo_url）
router.get("/details/:host_id", async (req, res, next) => {
  try {
    const { host_id } = req.params;
    const response = await ratingService.getRatingWithUserInfo(host_id);

    if (!response || response.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "查無此資料",
      });
    }

    res.status(200).json({
      status: 200,
      message: "資料獲取成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
});
export default router;
