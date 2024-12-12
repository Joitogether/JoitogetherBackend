import express from "express";
import * as UserController from "../controllers/userController.js";

const router = express.Router();

// User List
router.get("/", UserController.fetchAllUsers);
router.get("/:uid", UserController.fetchUserById);

// User Create / Update
router.post("/register", UserController.registerUser);
router.put("/update/:uid", UserController.updateUserInfo);

// User Application
router.get("/applications/:uid", UserController.fetchUserApplications);

// User Post
router.get("/posts/:uid", UserController.fetchUserPosts);

// User Notification
router.get("/notifications/:uid", UserController.fetchUserNotifications);
router.put("/notifications/:uid", UserController.markUserNotifications);

// User Followers
router.get("/userFollowers/:user_id", UserController.fetchUserFollowers);
router.get("/following/:follower_id", UserController.fetchUserFollowing);

export default router;
