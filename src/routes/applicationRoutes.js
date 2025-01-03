import express from "express";
import * as ApplicationController from "../controllers/applicationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Application List
router.get(
  "/:activity_id",
  /* #swagger.tags = ['Application'] */

  /* #swagger.description = "取得活動報名資料" */

  /* #swagger.responses[200] = {
      schema:{
        "status": 200,
        "message": "成功取得資料",
        "data": [
          {
            "application_id": 57,
            "activity_id": 40,
            "participant_id": "7l2rEgRk2bc6KSFY90VDL2h2aHo2",
            "status": "registered",
            "comment": "我要去",
            "register_validated": 0,
            "created_at": "2025-01-01T07:08:43.000Z",
            "updated_at": null,
            "participant_info": {
              "uid": "7l2rEgRk2bc6KSFY90VDL2h2aHo2",
              "email": "w0975582420@gmail.com",
              "email_verified": true,
              "full_name": "妍",
              "display_name": "Latte",
              "phone_number": "0975582420",
              "photo_url": "https://firebasestorage.googleapis.com/v0/b/login-demo1-9d3cb.firebasestorage.app/o/avatars%2F1733361346771_IMG_5408.JPG?alt=media&token=5230eead-3bec-40c0-8871-8a1eb51050be",
              "created_at": "2024-12-05T01:17:01.000Z",
              "city": "台北市",
              "age": 21,
              "career": "躺平族",
              "favorite_sentence": null,
              "tags": "未填寫",
              "self_introduction": null,
              "zodiac": null,
              "hobby": null,
              "expertise": null,
              "interested_in": null,
              "life_photo_1": "https://firebasestorage.googleapis.com/v0/b/login-demo1-9d3cb.firebasestorage.app/o/lifephoto%2F1734409837966_FtlrMTnaQAATe-Z.jpeg?alt=media&token=a401314f-3250-40fa-8311-f6854785a5c3",
              "life_photo_2": null
            }
          },
          {
            "application_id": 55,
            "activity_id": 40,
            "participant_id": "XRS2wbAZv3NqQ42uvoSh68veitv2",
            "status": "registered",
            "comment": "已付款，自動報名",
            "register_validated": 1,
            "created_at": "2024-12-24T06:16:08.000Z",
            "updated_at": "2025-01-01T05:32:07.000Z",
            "participant_info": {
              "uid": "XRS2wbAZv3NqQ42uvoSh68veitv2",
              "email": "latte.0975582420@gmail.com",
              "email_verified": true,
              "full_name": "Zhi-Yan Huang",
              "display_name": "沙拉貓",
              "phone_number": "0912345678",
              "photo_url": "https://firebasestorage.googleapis.com/v0/b/login-demo1-9d3cb.firebasestorage.app/o/avatars%2F1735439695053_images%20(2).jpeg?alt=media&token=347b9eb2-8af7-4381-9aea-de763f29df09",
              "created_at": "2024-12-05T08:09:29.000Z",
              "city": "新北市",
              "age": 21,
              "career": "沙拉鑑賞師",
              "favorite_sentence": "喵",
              "tags": "🐈",
              "self_introduction": null,
              "zodiac": null,
              "hobby": null,
              "expertise": null,
              "interested_in": null,
              "life_photo_1": null,
              "life_photo_2": null
            }
          }
        ]
      },
        description: "成功取得資料" } */
  authMiddleware,
  ApplicationController.fetchActivityRegistrations
);

// Activity Registration/Cancellation
router.post(
  "/register/:activity_id",
  /* #swagger.tags = ['Application'] */

  /* #swagger.description = "報名活動" */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '報名資訊',
            required: true,
            schema: {
              "comment": "我要去",
              "participant_id": "7l2rEgRk2bc6KSFY90VDL452aHo2",
              "register_validated": 0
          }
    } */

  /* #swagger.responses[201] = {
      schema: {
    "status": 201,
    "message": "資料建立成功",
    "data": {
        "application_id": 57,
        "activity_id": 40,
        "participant_id": "7l2rEgRk2bc6KSFY90VDL452aHo2",
        "status": "registered",
        "comment": "我要去",
        "register_validated": 0,
        "created_at": "2025-01-01T07:08:43.000Z",
        "updated_at": null
    }
},
        description: "資料建立成功" } */
  authMiddleware,
  ApplicationController.createActivityRegistration
);
router.put(
  "/cancel/:activity_id",
  /* #swagger.tags = ['Application'] */

  /* #swagger.description = "取消報名活動" */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '報名者 ID',
            required: true,
            schema: {
            "participant_id": "lNLo8eDmqoTcWghXpPA5H4P1iG02"
        }
    } */

  /* #swagger.responses[200] = {
      schema: {
        "status": 200,
        "message": "資料更新成功",
        "data": {
            "application_id": 85,
            "activity_id": 57,
            "participant_id": "lNLo8eDmqoTcWghXpPA5H4P1iG02",
            "status": "participant_cancelled",
            "comment": null,
            "register_validated": 0,
            "created_at": "2024-12-31T06:26:10.000Z",
            "updated_at": "2025-01-01T14:37:56.000Z"
        }
    },
        description: "取消報名成功" } */
  authMiddleware,
  ApplicationController.removeActivityRegistration
);

// Activity Participant Verification
router.put(
  "/verify/:application_id",
  /* #swagger.tags = ['Application'] */

  /* #swagger.description = "審核狀態與驗證" */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '審核活動報名',
            required: true,
            schema: {
              "status": "approved",
              "register_validated": 1
          }
    } */

  /* #swagger.responses[200] = {
      schema: {
        "status": 200,
        "message": "審核成功",
        "data": {
            "application_id": 91,
            "activity_id": 55,
            "participant_id": "gaP7j1Y4xGWrvLwH8bBVo2XL7qb2",
            "status": "approved",
            "comment": "本人自己來報名做主桌",
            "register_validated": 1,
            "created_at": "2025-01-01T08:25:59.000Z",
            "updated_at": "2025-01-01T14:39:24.000Z"
        }
    },
        description: "審核成功" } */
  authMiddleware,
  ApplicationController.approveActivityParticipant
);

export default router;
