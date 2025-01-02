import express from "express";
import * as UserController from "../controllers/userController.js";

const router = express.Router();

// User List
router.get(
  "/",
  /* #swagger.ignore = true */
  UserController.fetchAllUsers
);

router.get(
  "/:uid",
  /* #swagger.tags = ['User'] */

  /* #swagger.description = "使用 uid 取得使用者資料" */

  /* #swagger.responses[200] = {
      schema: { 
  "status": 200,
  "message": "成功取得資料",
  "data": {
    "uid": "GQS2wbAZv6NqQ42uvoSh6veitv5",
    "email": "example@gmail.com",
    "email_verified": true,
    "full_name": "測試用戶",
    "display_name": "TEST",
    "phone_number": "0912345678",
    "photo_url": "https://example.com/photo.jpg",
    "created_at": "2024-12-05T08:09:29.000Z",
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
  
} },
      description: "成功取得使用者資料" } */

  UserController.fetchUserById
);

// User Create / Update
router.post(
  "/register",
  /* #swagger.tags = ['User'] */

  /* #swagger.description = "將 Firebase 註冊資料傳送至後端 " */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Firebase 註冊資料 ',
            required: true,
            schema: { 
            "uid": "7P6ocyCefPc8oTzjfAEs16Rjiegr5",
            "email": "test@gmail.comh",
            "email_verified": false,
            "full_name": "測試",
            "display_name": "TEST",
            "phone_number": "0987654321",
            "photo_url": ""
        }
    } */

  /* #swagger.responses[201] = { 
      schema: { 
  "status": 201,
  "message": "資料建立成功",
  "data": {
        "uid": "7P6ocyCefPc8oTzjfAEs16Rjiegr5",
        "email": "test@gmail.comh",
        "email_verified": false,
        "full_name": "測試",
        "display_name": "TEST",
        "phone_number": "0987654321",
        "photo_url": "",
        "created_at": "2024-12-31T02:08:01.000Z",
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
    
} },
      description: "建立使用者資料成功" } */
  UserController.registerUser
);

router.put(
  "/update/:uid",
  /* #swagger.tags = ['User'] */

  /* #swagger.description = "更新使用者資料" */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '填寫需要更新的欄位',
            required: true,
            schema: { 
            "city": "台北市",
            "age": 20,
        }
    } */

  /* #swagger.responses[200] = { 
      schema: { 
  "status": 200,
  "message": "資料更新成功",
  "data": {
        "uid": "7P6ocyCefPc8oTzjfAEs16Rjiegr5",
        "email": "test@gmail.comh",
        "email_verified": false,
        "full_name": "測試",
        "display_name": "TEST",
        "phone_number": "0987654321",
        "photo_url": "",
        "created_at": "2024-12-31T02:08:01.000Z",
        "city": "台北市",
        "age": 20,
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
        
        } },
        description: "更新使用者資料成功" } */

  UserController.updateUserInfo
);

// activity application follow
router.get(
  "/summary/:uid",
  /* #swagger.tags = ['User'] */

  /* #swagger.description = "取得活動、文章、追蹤人數" */

  /* #swagger.responses[200] = { 
      schema: { 
  "status": 200,
  "message": "成功取得資料",
  "data": {
   "_count": {
      "activities": 3,
      "posts": 4,
      "followers": 0
}
} },
      description: "成功取得活動、文章、追蹤人數資料" } */
  UserController.fetchUserSummaries
);

// User Application
router.get(
  "/applications/:uid",
  /* #swagger.tags = ['User_Application'] */

  /* #swagger.description = "取得使用者報名資料" */

  /* #swagger.responses[200] = { 
      schema: { 
  
  "message": "成功取得資料",
  "status": 200,
  "data": [
    {
      "application_id": 53,
      "activity_id": 34,
      "participant_id": "XRS2wbAZv3NqQ42uvoSh68veitv2",
      "status": "registered",
      "comment": "已付款，自動報名",
      "register_validated": 0,
      "created_at": "2024-12-24T06:16:08.000Z",
      "updated_at": "2024-12-30T15:52:18.000Z",
      "activities": {
        "name": "養狗",
        "location": "台灣台北市信義區101大樓2樓連通天橋",
        "event_time": "2024-12-12T20:59:00.000Z",
        "img_url": "https://ih1.redbubble.net/image.4994245202.0402/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
      }
    }
  ]
   },
      description: "成功取得報名資料" } */
  UserController.fetchUserApplications
);

// User Post
router.get(
  "/posts/:uid",
  /* #swagger.tags = ['User_Post'] */

  /* #swagger.description = "取得文章資料" */

  /* #swagger.responses[200] = { 
      schema: { 
  
  "message": "成功取得資料",
  "status": 200,
  "data": [
    {
      "post_id": 107,
      "post_title": "再一篇廢文",
      "post_content": "123",
      "uid": "XRS2wbAZv3NqQ42uvoSh68veitv2",
      "created_at": "2024-12-30T07:37:49.000Z",
      "updated_at": "2024-12-30T07:37:49.000Z",
      "post_category": "shopping",
      "post_status": "posted",
      "post_img": ""
      }
    
  ]
   },
      description: "成功使用者文章資料" } */
  UserController.fetchUserPosts
);

// User Notification
router.get(
  "/notifications/:uid",
  /* #swagger.tags = ['User_Notification'] */

  /* #swagger.description = "取得使用者通知" */

  /* #swagger.responses[200] = { 
      schema: {
        "status": 200,
        "message": "成功取得資料",
        "data": [
            {
                "users_notifications_actor_idTousers": {
                    "display_name": "RRRRRRRR",
                    "photo_url": "https://firebasestorage.googleapis.com/v0/b/login-demo1-9d3cb.firebasestorage.app/o/avatars%2F1735457917194_d21cb346-4ad6-4335-9740-61d53475ceee.webp?alt=media&token=db46d9d7-841f-4ec4-a21b-0cbab5fb0b9d"
                },
                "message": "報名了你的活動",
                "action": "register",
                "is_read": 1,
                "created_at": "2024-12-22T16:45:28.000Z",
                "target_type": "activity",
                "target_id": 1,
                "id": 6,
                "link": "/activity/detail/1",
                "target_detail": {
                    "name": "一起來大笑"
                }
            }
        ]
    },
        description: "成功取得資料" } */
  UserController.fetchUserNotifications
);

router.put(
  "/notifications/:uid",
  /* #swagger.tags = ['User_Notification'] */

  /* #swagger.description = "標記使用者通知為已讀狀態" */

  UserController.markUserNotifications
);

// User Followers
router.get(
  "/userFollowers/:user_id",
  /* #swagger.tags = ['User_Follow'] */

  /* #swagger.description = "取得使用者追蹤者" */

  /* #swagger.responses[200] = { 
      schema: {
        "status": 200,
        "message": "成功取得資料",
        "data": [
          {
            "id": 10,
            "follower_id": "bs3TWFMAF6V1kMLIS5w6uSbsfF83",
            "isFollowing": true,
            "users_followers_follower_idTousers": {
              "display_name": "Latte",
              "photo_url": "https://firebasestorage.googleapis.com/v0/b/login-demo1-9d3cb.firebasestorage.app/o/avatars%2F1734951865018_IMG_5408.JPG?alt=media&token=fa2fd095-f014-4284-9a59-0aa0d99bee32",
              "favorite_sentence": "我就跟你說過了，誰叫你不聽(╯‵□′)╯︵┴─┴"
            }
          }
        ]
      },
        description: "成功取得資料" } */

  UserController.fetchUserFollowers
);

router.get(
  "/following/:follower_id",
  /* #swagger.tags = ['User_Follow'] */

  /* #swagger.description = "取得使用者追蹤中" */

  /* #swagger.responses[200] = { 
      schema: {
        "status": 200,
        "message": "成功取得資料",
        "data": [
          {
            "id": 10,
            "user_id": "gaP7j1Y4xGWrvLwH8bBVo2XL7qb2",
            "isFollowing": true,
            "users_followers_user_idTousers": {
              "display_name": "廢文站長の林",
              "photo_url": "https://firebasestorage.googleapis.com/v0/b/login-demo1-9d3cb.firebasestorage.app/o/avatars%2F1734940195190_0fe1ae93c111d60683862a1825930f19.jpg?alt=media&token=0b16cbcf-9d65-4ffb-8347-7ea1faaf3c71",
              "favorite_sentence": "你好我是一隻謊報年齡ㄉ魷魚嘻嘻 🦑"
            }
          }
        ]
      },
        description: "成功取得資料" } */

  UserController.fetchUserFollowing
);

router.post(
  "/follow",
  /* #swagger.tags = ['User_Follow'] */

  /* #swagger.description = "追蹤使用者" */

  /* #swagger.parameters['obj'] = {
        in: 'body',
        description: '追蹤使用者',
        required: true,
        schema: {
          "user_id": "2LONt3qKmISeVzKAEtUcR3KzF3n1",
          "follower_id": "2LONt3qKmISeVzKAEtUcR3KzF3n1"
        }
  } */

  /* #swagger.responses[200] = { 
        schema: {
          "status": 201,
          "message": "追蹤成功",
          "data": {
              "id": 6,
              "user_id": "2LONt3qKmISeVzKAEtUcR3KzF3n1",
              "follower_id": "2LONt3qKmISeVzKAEtUcR3KzF3n1",
              "isFollowing": true
          }
      },
        description: "追蹤成功" 
  } */
  UserController.followUser
);

router.post(
  "/unfollow/:id",
  /* #swagger.tags = ['User_Follow'] */

  /* #swagger.description = "取消追蹤使用者" */

  /* #swagger.parameters['obj'] = {
        in: 'body',
        description: '追蹤使用者',
        required: true,
        schema: {
          "user_id": "2LONt3qKmISeVzKAEtUcR3KzF3n1",
          "follower_id": "2LONt3qKmISeVzKAEtUcR3KzF3n1"
        }
  } */

  /* #swagger.responses[200] = { 
        schema: {
          "status": 200,
          "message": "取消追蹤成功",
          "data": {
              "id": 6,
              "user_id": "2LONt3qKmISeVzKAEtUcR3KzF3n1",
              "follower_id": "2LONt3qKmISeVzKAEtUcR3KzF3n1",
              "isFollowing": false
          }
      },
        description: "取消追蹤成功" 
  } */
  UserController.unFollowUser
);

export default router;
