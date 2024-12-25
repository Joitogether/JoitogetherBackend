import express from "express";
import * as PostController from "../controllers/postController.js";

const router = express.Router();

// Post List
router.get(
  "/",
  /* #swagger.tags = ['Post'] */
  PostController.fetchAllPosts
);
router.get(
  "/latest",
  /* #swagger.tags = ['Post'] */
  PostController.fetchLatestPosts
);
router.get(
  "/popular",
  /* #swagger.tags = ['Post'] */
  PostController.fetchPopularPosts
);
router.get(
  "/:post_id",
  /* #swagger.tags = ['Post'] */
  PostController.fetchPostDetails
);
router.get(
  "/category/:category",
  /* #swagger.tags = ['Post'] */
  PostController.fetchPostsByCategory
);

// Post Create/Update/Delete
router.post(
  "/",
  /* #swagger.tags = ['Post'] */
  PostController.addPost
);
router.put(
  "/:post_id",
  /* #swagger.tags = ['Post'] */
  PostController.editPost
);
router.delete(
  "/:post_id",
  /* #swagger.tags = ['Post'] */
  PostController.removePost
);

// Post Comment
router.get(
  "/comments/:post_id",
  /* #swagger.tags = ['Post_Comment'] */
  PostController.fetchPostComments
);
router.post(
  "/comment/:post_id",
  /* #swagger.tags = ['Post_Comment'] */
  PostController.addPostComment
);
router.delete(
  "/comment/:comment_id",
  /* #swagger.tags = ['Post_Comment'] */
  PostController.removePostComment
);

// Post Like
router.get(
  "/likes/:post_id",
  /* #swagger.tags = ['Post_Like'] */
  PostController.fetchPostLikes
);
router.post(
  "/like/:post_id",
  /* #swagger.tags = ['Post_Like'] */
  PostController.addPostLike
);
router.delete(
  "/like/:like_id",
  /* #swagger.tags = ['Post_Like'] */
  PostController.removePostLike
);

export default router;
