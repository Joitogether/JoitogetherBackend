import express from "express";
import * as RatingController from "../controllers/ratingController.js";
const router = express.Router();

router.get(
  "/:host_id",
  /* #swagger.tags = ['Rating'] */

  /* #swagger.description = "取得被評論者的評論資料" */

  /* #swagger.responses[200] = { 
      schema: { 
    "status": 200,
    "message": "成功取得資料",
    "data": [
    {
      "rating_id": 1,
      "user_id": "XRS2wbAZv3NqQ42uvoSh68veitv2",
      "host_id": "KcYkDTxGZPQNzNbbTdOeO8en0Ah1",
      "rating_heart": 5,
      "user_comment": "good",
      "rating_kindness": 3,
      "rating_ability": 4,
      "rating_credit": 5,
      "created_at": "2024-12-29T14:54:48.000Z",
      "activitiesId": null,
      "activity_id": 34
    }
  ]

      },
        description: "成功取得使用者資料" } */

  RatingController.fetchHostRatings
);

router.get(
  "/hostDetails/:host_id",
  /* #swagger.tags = ['Rating'] */

  /* #swagger.description = "取得被評論者個人資料" */

  /* #swagger.responses[200] = { 
      schema: { 
     "status": 200,
  "message": "成功取得資料",
  "data": [
    {
      "rating_id": 1,
      "user_id": "XRS2wbAZv3NqQ42uvoSh68veitv2",
      "rating_heart": 5,
      "user_comment": "good",
      "rating_kindness": 3,
      "rating_ability": 4,
      "rating_credit": 5,
      "created_at": "2024-12-29T14:54:48.000Z",
      "users_ratings_user_idTousers": {
        "display_name": "沙拉貓",
        "photo_url": "https://firebasestorage.googleapis.com/v0/b/login-demo1-9d3cb.firebasestorage.app/o/avatars%2F1735439695053_images%20(2).jpeg?alt=media&token=347b9eb2-8af7-4381-9aea-de763f29df09",
        "city": "新北市"
      }
    }
  ]
      },
        description: "成功取得使用者資料" } */

  RatingController.fetchHostDetails
);

router.get(
  "/userDetails/:user_id",
  /* #swagger.ignore = true */
  RatingController.fetchUserDetails
);

router.get(
  "/activity/:activity_id",
  /* #swagger.tags = ['Rating'] */

  /* #swagger.description = "取得活動評論資料(含活動資料與評論者個人資料)" */

  /* #swagger.responses[200] = { 
      schema: { 
    "status": 200,
  "message": "成功取得資料",
  "data": {
    "activity": {
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
      "users": {
        "display_name": "黃俊龍",
        "photo_url": "https://lh3.googleusercontent.com/a/ACg8ocIvgSvTl286GHd25o1C_74ayYw4N1Axn18NOl7HTGb21rqfTQ=s96-c"
      }
    },
    "latestHostRating": {
      "rating_id": 2,
      "user_id": "XRS2wbAZv3NqQ42uvoSh68veitv2",
      "host_id": "lNLo8eDmqoTcWghXpPA5H4P1iG02",
      "rating_heart": 4,
      "user_comment": "讚",
      "rating_kindness": 3,
      "rating_ability": 3,
      "rating_credit": 3,
      "created_at": "2024-12-30T07:47:56.000Z",
      "activitiesId": null,
      "activity_id": 40,
      "users_ratings_user_idTousers": {
        "display_name": "沙拉貓",
        "photo_url": "https://firebasestorage.googleapis.com/v0/b/login-demo1-9d3cb.firebasestorage.app/o/avatars%2F1735439695053_images%20(2).jpeg?alt=media&token=347b9eb2-8af7-4381-9aea-de763f29df09"
      }
    },
    "hostRatingAverage": {
      "_avg": {
        "rating_heart": 4,
        "rating_kindness": 3,
        "rating_ability": 3,
        "rating_credit": 3
      }
    }
  }
      },
        description: "成功取得評論資料" } */
  RatingController.fetchActivityAndHostRating
);

router.get(
  "/summary/:host_id",
  /* #swagger.tags = ['Rating'] */

  /* #swagger.description = "取得評分資料" */

  /* #swagger.responses[200] = { 
      schema: { 
     "message": "成功取得資料",
  "status": 200,
  "data": {
    "heartCounts": {
      "heart1": 0,
      "heart2": 0,
      "heart3": 0,
      "heart4": 0,
      "heart5": 1
    },
    "ratingPercentages": {
      "heart1": "0.00",
      "heart2": "0.00",
      "heart3": "0.00",
      "heart4": "0.00",
      "heart5": "100.00"
    },
    "averageHeart": "5.0"
  }
      },
        description: "成功取得評論資料" } */

  RatingController.fetchSummary
);

router.post(
  "/",
  /* #swagger.tags = ['Rating'] */
  RatingController.createRating
);

export default router;
