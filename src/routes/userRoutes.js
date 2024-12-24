import express from "express";
import * as UserController from "../controllers/userController.js";

const router = express.Router();

// User List
router.get(
  "/",
  /* 	#swagger.tags = ['User']
        #swagger.description = '獲取所有使用者' */

  /* #swagger.responses[200] = {
      schema: [{
      "uid": "7l2rEgRk2bc6KSFY90VDL2h2aHo2",
      "email": "Test123@example.com",
      "email_verified": true,
      "full_name": "測試",
      "display_name": "Test",
      "phone_number": "0912345678",
      "photo_url": "",
      "created_at": "2024-12-05T01:17:01.000Z",
      "city": null,
      "age": null,
      "career": null,
      "favorite_sentence": null,
      "tags": null,
      "self_introduction": null,
      "zodiac": null,
      "hobby": null,
      "expertise": null,
      "interested_in": null,
      "life_photo_1": null,
      "life_photo_2": null
      }], 
      description: "資料獲取成功"
      } */
  UserController.fetchAllUsers
);
router.get(
  "/:uid",
  /* 	#swagger.tags = ['User']
        #swagger.description = '獲取單一使用者' */

  /* #swagger.responses[200] = {
      schema: { "uid": "7l2rEgRk2bc6KSFY90VDL2h2aHo2",
      "email": "Test123@example.com",
      "email_verified": true,
      "full_name": "測試",
      "display_name": "Test",
      "phone_number": "0912345678",
      "photo_url": "",
      "created_at": "2024-12-05T01:17:01.000Z",
      "city": null,
      "age": null,
      "career": null,
      "favorite_sentence": null,
      "tags": null,
      "self_introduction": null,
      "zodiac": null,
      "hobby": null,
      "expertise": null,
      "interested_in": null,
      "life_photo_1": null,
      "life_photo_2": null
      },
      description: "資料獲取成功"
      } */
  UserController.fetchUserById
);

// User Create / Update
router.post(
  "/register",
  /* 	#swagger.tags = ['User']
        #swagger.description = '使用者註冊' */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '使用者資料',
            required: true,
            schema: { 
            "uid": "7P6ocyCefPc8oTzjfAEs16Rjiegr2",
            "email": "fehu@gmail.comh",
            "email_verified": false,
            "full_name": "54fu",
            "display_name": "trfygiib",
            "phone_number": "0987654321",
            "photo_url": ""
            }
    } */

  /* #swagger.responses[201] = {
      schema: { 
        "uid": "7P6ocyCefPc8oTzjfAEs16Rjiegr2",
        "email": "fehu@gmail.comh",
        "email_verified": false,
        "full_name": "54fu",
        "display_name": "trfygiib",
        "phone_number": "0987654321",
        "photo_url": "",
        "created_at": "2024-12-24T16:41:44.000Z",
        "city": null,
        "age": null,
        "career": null,
        "favorite_sentence": null,
        "tags": null,
        "self_introduction": null,
        "zodiac": null,
        "hobby": null,
        "expertise": null,
        "interested_in": null,
        "life_photo_1": "https://firebasestorage.googleapis.com/v0/b/login-demo1-9d3cb.firebasestorage.app/o/lifephoto%2F1733574359943_defaultimg.jpg?alt=media&token=c5486472-dadd-4276-8666-97a538e46e5f",
        "life_photo_2": "https://firebasestorage.googleapis.com/v0/b/login-demo1-9d3cb.firebasestorage.app/o/lifephoto%2F1733574359943_defaultimg.jpg?alt=media&token=c5486472-dadd-4276-8666-97a538e46e5f"
      },
         description: "資料創建成功"
      } */

  UserController.registerUser
);
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
