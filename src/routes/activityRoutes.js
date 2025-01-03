import express from "express";
import * as ActivityController from "../controllers/activityController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Activity List
router.get(
  "/",
  /* #swagger.tags = ['Activity'] */
  ActivityController.fetchAllActivities
);
router.get(
  "/:id",
  /* #swagger.tags = ['Activity'] */

  /* #swagger.description = "取得單筆活動資料" */

  /* #swagger.responses[200] = { 
      schema: {
  "status": 200,
  "message": "資料獲取成功",
  "data": {
    "id": 34,
    "name": "養狗",
    "img_url": "https://ih1.redbubble.net/image.4994245202.0402/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
    "location": "台灣台北市信義區101大樓2樓連通天橋",
    "host_id": "lNLo8eDmqoTcWghXpPA5H4P1iG02",
    "description": "嘗試領養狗",
    "max_participants": 20,
    "min_participants": 1,
    "category": "travel",
    "status": "registrationOpen",
    "price": "250",
    "pay_type": "AA",
    "require_approval": 1,
    "created_at": "2024-12-06T07:59:17.000Z",
    "approval_deadline": "2024-12-06T20:00:00.000Z",
    "event_time": "2024-12-12T20:59:00.000Z",
    "updated_at": "2024-12-06T07:59:17.000Z",
    "require_payment": 0,
    "applications": [
      {
        "application_id": 53,
        "activity_id": 34,
        "participant_id": "XRS2wbAZv3NqQ42uvoSh68veitv2",
        "status": "registered",
        "comment": "已付款，自動報名",
        "register_validated": 0,
        "created_at": "2024-12-24T06:16:08.000Z",
        "updated_at": "2025-01-01T05:23:02.000Z"
      }
    ],
    "host_info": {
      "uid": "lNLo8eDmqoTcWghXpPA5H4P1iG02",
      "email": "a86527913@gmail.com",
      "email_verified": true,
      "full_name": "黃俊龍",
      "display_name": "黃俊龍",
      "phone_number": "0912345678",
      "photo_url": "https://lh3.googleusercontent.com/a/ACg8ocIvgSvTl286GHd25o1C_74ayYw4N1Axn18NOl7HTGb21rqfTQ=s96-c",
      "created_at": "2024-12-05T06:57:35.000Z",
      "city": "string",
      "age": "string",
      "career": "string",
      "favorite_sentence": "string",
      "tags": "string",
      "self_introduction": "string",
      "zodiac": "string",
      "hobby": "string",
      "expertise": "string",
      "interested_in": "string",
      "life_photo_1": "string",
      "life_photo_2": "string"
    },
    "comments": [],
    "recent_activities": [
      {
        "id": 33,
        "name": "111111",
        "img_url": "",
        "location": "台灣台北市信義區101大樓2樓連通天橋",
        "host_id": "lNLo8eDmqoTcWghXpPA5H4P1iG02",
        "description": "2222222222",
        "max_participants": 10,
        "min_participants": 1,
        "category": "sports",
        "status": "registrationOpen",
        "price": "2000",
        "pay_type": "AA",
        "require_approval": 1,
        "created_at": "2024-12-06T07:47:09.000Z",
        "approval_deadline": "2024-12-08T20:02:00.000Z",
        "event_time": "2024-12-08T20:02:00.000Z",
        "updated_at": "2024-12-06T07:47:09.000Z",
        "require_payment": 0,
        "users": {
          "display_name": "黃俊龍",
          "photo_url": "https://lh3.googleusercontent.com/a/ACg8ocIvgSvTl286GHd25o1C_74ayYw4N1Axn18NOl7HTGb21rqfTQ=s96-c"
        }
      }
    ],
    "ratings": {
      "heartCounts": {
        "heart1": 0,
        "heart2": 0,
        "heart3": 0,
        "heart4": 1,
        "heart5": 0
      },
      "ratingPercentages": {
        "heart1": "0.00",
        "heart2": "0.00",
        "heart3": "0.00",
        "heart4": "100.00",
        "heart5": "0.00"
      },
      "averageHeart": "4.0"
    }
  }
},
        description: "資料獲取成功" } */
  ActivityController.fetchActivityDetails
);

// Activity Create/Delete
router.post(
  "/",
  /* #swagger.tags = ['Activity'] */

  /* #swagger.description = "新增活動" */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '活動內容',
            required: true,
            schema: {
              "name": "Mountain Hiking Adventure",
              "img_url": "https://example.com/images/mountain_hike.jpg",
              "location": "Taipei, Taiwan",
              "host_id": "7P6ocyCefPc8oTzjfAEs16RZThR2",
              "description": "Join us for an exhilarating hike through the mountains. Great for both beginners and seasoned hikers.",
              "max_participants": 20,
              "min_participants": 5,
              "category": "travel",
              "status": "registrationOpen",
              "price": 500.00,
              "pay_type": "AA",
              "require_approval": 0,
              "require_payment": 0,
              "approval_deadline": "1111-11-11 00:00:00",
              "event_time": "2024-11-30 14:09:50"
            }} */

  /* #swagger.responses[201] = { 
      schema: {
        "status": 201,
        "message": "資料建立成功",
        "data": {
            "id": 44,
            "name": "Mountain Hiking Adventure",
            "img_url": "https://example.com/images/mountain_hike.jpg",
            "location": "Taipei, Taiwan",
            "host_id": "7P6ocyCefPc8oTzjfAEs16RZThR2",
            "description": "Join us for an exhilarating hike through the mountains. Great for both beginners and seasoned hikers.",
            "max_participants": 20,
            "min_participants": 5,
            "category": "travel",
            "status": "registrationOpen",
            "price": "500",
            "pay_type": "AA",
            "require_approval": 0,
            "created_at": "2025-01-01T06:36:51.000Z",
            "approval_deadline": "1111-11-10T15:54:00.000Z",
            "event_time": "2024-11-30T06:09:50.000Z",
            "updated_at": "2025-01-01T06:36:51.000Z",
            "require_payment": 0
        }
    },
        description: "成功新增資料" } */
  authMiddleware,
  ActivityController.addNewActivity
);

router.put(
  "/cancel/:id",
  /* #swagger.tags = ['Activity'] */

  /* #swagger.description = "取消活動" */

  /* #swagger.responses[200] = {
      schema: {
        "status": 200,
        "message": "資料刪除成功",
        "data": {
            "id": 34,
            "name": "養狗",
            "img_url": "https://ih1.redbubble.net/image.4994245202.0402/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
            "location": "台灣台北市信義區101大樓2樓連通天橋",
            "host_id": "lNLo8eDmqoTcWghXpPA5H4P1iG02",
            "description": "嘗試領養狗",
            "max_participants": 20,
            "min_participants": 1,
            "category": "travel",
            "status": "cancelled",
            "price": "250",
            "pay_type": "AA",
            "require_approval": 1,
            "created_at": "2024-12-06T07:59:17.000Z",
            "approval_deadline": "2024-12-06T20:00:00.000Z",
            "event_time": "2024-12-12T20:59:00.000Z",
            "updated_at": "2025-01-01T06:40:16.000Z",
            "require_payment": 0
        }
    },
        description: "資料刪除成功" } */
  authMiddleware,
  ActivityController.cancelActivityRequest
);

// Activity Comment
router.post(
  "/comment/:activity_id",
  /* #swagger.tags = ['Activity_Comment'] */

  /* #swagger.description = "新增活動留言" */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '留言內容',
            required: true,
            schema: {
            "participant_id": "7P6ocyCefPc8oTzjfAEs16RZThR2",
            "comment": "看起來很有趣欸！"
            }
      } */

  /* #swagger.responses[201] = {
      schema: {
        "status": 201,
        "message": "資料建立成功",
        "data": {
            "comment_id": 11,
            "activity_id": 40,
            "user_comment": "看起來很有趣欸！",
            "uid": "7P6ocyCefPc8oTzjfAEs16RZThR2",
            "created_at": "2025-01-01T06:46:57.000Z",
            "status": "posted"
        }
    },
        description: "新增資料成功" } */
  authMiddleware,
  ActivityController.addActivityComments
);

router.delete(
  "/comment/:comment_id",
  /* #swagger.tags = ['Activity_Comment'] */

  /* #swagger.description = "刪除活動留言" */

  /* #swagger.responses[200] = {
      schema: {
        "message": "資料刪除成功",
        "status": 200,
        "data": {
            "comment_id": 11,
            "activity_id": 40,
            "user_comment": "看起來很有趣欸！",
            "uid": "7P6ocyCefPc8oTzjfAEs16RZThR2",
            "created_at": "2025-01-01T06:46:57.000Z",
            "status": "deleted"
        }
    },
        description: "資料刪除成功" } */
  authMiddleware,
  ActivityController.removeActivityComment
);

// Google Map
// Google 地址搜尋結果
router.post(
  "/geocode",
  /* #swagger.tags = ['Google Map'] */
  authMiddleware,
  ActivityController.googleMapGeocode
);

router.post(
  "/autocomplete",
  /* #swagger.tags = ['Google Map'] */
  authMiddleware,
  ActivityController.googleAutocomplete
);

export default router;
