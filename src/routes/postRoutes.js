import express from "express";
import * as PostController from "../controllers/postController.js";

const router = express.Router();

// Post List
router.get("/", PostController.fetchAllPosts);
router.get("/least", PostController.fetchLeastPosts);
router.get("/popular", PostController.fetchPopularPosts);
router.get("/:post_id", PostController.fetchPostDetails);
router.get("/category/:category", PostController.fetchPostsByCategory);

// Post Create/Update/Delete
router.post("/", PostController.addPost);
router.put("/:post_id", PostController.editPost);
router.delete("/:post_id", PostController.removePost);

// Post Comment
router.get("/comments/:post_id", PostController.fetchPostComments);
router.post("/comment/:post_id", PostController.addPostComment);
router.delete("/comment/:comment_id", PostController.removePostComment);

// Post Like
router.get("/likes/:post_id", PostController.fetchPostLikes);
router.post("/like/:post_id", PostController.addPostLike);
router.delete("/like/:like_id", PostController.removePostLike);

export default router;
