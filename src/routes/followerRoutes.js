import express from "express";
import { followerService } from "../services/followerService.js";
const router = express.Router();

// 查詢 user_id 的追隨者
router.get("/:user_id", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const response = await followerService.getFollowersByUserId(user_id);
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
