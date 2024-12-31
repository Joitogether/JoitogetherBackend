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
  RatingController.fetchActivityAndHostRating
);

router.get(
  "/summary/:host_id",
  /* #swagger.tags = ['Rating'] */
  RatingController.fetchSummary
);

router.post(
  "/",
  /* #swagger.tags = ['Rating'] */
  RatingController.createRating
);

export default router;
