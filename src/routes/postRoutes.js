import express from "express";
import { postService } from "../services/postService.js";

const router = express.Router();

// 獲得所有post
router.get("/", async (req, res, next) => {
  try {
    const response = await postService.getAllPosts();
    res.status(200).json({
      status: 200,
      message: "資料獲取成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
});
// 新增post
router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await postService.createPost(data);
    res.status(201).json({
      message: "資料創建成功",
      status: 201,
      data: response,
    });
  } catch (error) {
    next(error);
  }
});
// 新增post 留言
router.post("/comment/:post_id", async (req, res, next) => {
  try {
    const post_id = parseInt(req.params.post_id);
    const data = { ...req.body, post_id };
    const response = await postService.createPostComment(data);
    res.status(201).json({
      message: "資料創建成功",
      status: 201,
      data: response,
    });
  } catch (error) {
    next(error);
  }
});

// 獲得單一post
router.get("/:post_id", async (req, res, next) => {
  try {
    const post_id = parseInt(req.params.post_id);
    const response = await postService.getPost(post_id);
    if (!response || response.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "找不到該筆資料",
      });
    }
    res.status(200).json({
      message: "資料獲取成功",
      status: 200,
      data: response,
    });
  } catch (error) {
    next(error);
  }
});

// 根據分類獲得posts
router.get("/category/:category", async (req, res, next) => {
  try {
    const category = req.params.category;
    const response = await postService.getPostByCategory(category);
    if (!response) {
      return res.status(404).json({
        message: "查無此資料",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "資料獲取成功",
      status: 200,
      data: response,
    });
  } catch (error) {
    next(error);
  }
});

// 透過 post_id 獲得留言
router.get("/comments/:post_id", async (req, res, next) => {
  try {
    const post_id = parseInt(req.params.post_id);
    const response = await postService.getPostComments(post_id);
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

// 刪除留言
router.delete("/comment/:comment_id", async (req, res, next) => {
  try {
    const comment_id = parseInt(req.params.comment_id);
    const response = await postService.deletePostComment(comment_id);

    res.status(200).json({
      status: 200,
      message: "資料刪除成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
});

// 新增按讚
router.post("/like/:post_id", async (req, res, next) => {
  const post_id = parseInt(req.params.post_id);
  const data = { ...req.body, post_id };
  const response = await postService.createPostLike(data);

  res.status(201).json({
    status: 201,
    message: "資料創建成功",
    data: response,
  });
});

// 獲得按讚數
router.get("/likes/:post_id", async (req, res, next) => {
  try {
    const post_id = parseInt(req.params.post_id);
    const response = await postService.getPostLikes(post_id);

    if (!response || response.length === 0) {
      return res.status(400).json({
        status: 400,
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

// 取消按讚
router.delete("/like/:like_id", async (req, res, next) => {
  try {
    const like_id = parseInt(req.params.like_id);
    const response = await postService.deletePostLike(like_id);

    res.status(200).json({
      status: 200,
      message: "資料刪除成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
});

export default router;