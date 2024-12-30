import express from "express";
import * as UserController from "../controllers/userController.js";

const router = express.Router();

// User List
router.get(
  "/",
  /* #swagger.tags = ['User'] */
  UserController.fetchAllUsers
);
router.get(
  "/:uid",
  /* #swagger.tags = ['User'] */ UserController.fetchUserById
);

// User Create / Update
router.post(
  "/register",
  /* #swagger.tags = ['User'] */
  UserController.registerUser
);
router.put(
  "/update/:uid",
  /* #swagger.tags = ['User'] */
  UserController.updateUserInfo
);

// User Application
router.get(
  "/applications/:uid",
  /* #swagger.tags = ['User'] */
  UserController.fetchUserApplications
);

// User Post
router.get(
  "/posts/:uid",
  /* #swagger.tags = ['User'] */
  UserController.fetchUserPosts
);

// User Notification
router.get(
  "/notifications/:uid",
  /* #swagger.tags = ['User'] */
  UserController.fetchUserNotifications
);
router.put(
  "/notifications/:uid",
  /* #swagger.tags = ['User'] */
  UserController.markUserNotifications
);

// User Followers
router.get(
  "/userFollowers/:user_id",
  /* #swagger.tags = ['User'] */
  UserController.fetchUserFollowers
);
router.get(
  "/following/:follower_id",
  /* #swagger.tags = ['User'] */
  UserController.fetchUserFollowing
);

router.get("/summary/:uid", UserController.fetchUserSummaries);

export default router;
