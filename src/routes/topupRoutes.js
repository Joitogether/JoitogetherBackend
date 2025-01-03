import express from "express";
import * as TopupController from "../controllers/topupController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/records/:uid",
  /* #swagger.tags = ['Top Up'] */

  /* #swagger.description = "取得儲值紀錄" */

  /* #swagger.responses[200] = { 
        schema: {
            "status": 200,
            "message": "資料獲取成功",
            "data": {
                "amount": "66",
                "bank_code": null,
                "card_last_four": null,
                "created_at": "2024-12-29T13:44:38.000Z",
                "email": "abc123@gmail.com",
                "escrow_bank": null,
                "id": 13,
                "merchantOrderNo": "1735479878",
                "pay_time": null,
                "payer_ip": null,
                "payment_status": "SUCCESS",
                "payment_type": null,
                "topuper_id": "2ymk8Xpx4oeijeodmlk432345IIfE3",
                "tradeNo": null,
                "updated_at": "2024-12-29T21:46:28.000Z",
                "wallet": {
                    "balance": "3"
                }
            }
        },
        description: "成功取得儲值紀錄"
  } */
  authMiddleware,
  TopupController.getTopuperRecord
);

router.post(
  "/return/:id",
  /* #swagger.ignore = true */

  /* #swagger.description = "儲值回傳" */
  authMiddleware,
  TopupController.handleReturn
);

router.post(
  "/encrypt/process",
  /* #swagger.tags = ['Top Up'] */

  /* #swagger.description = "儲值加密處理" */

  /* #swagger.parameters['obj'] = {
        in: 'body',
        description: '加密處理所需的參數',
        required: true,
        schema: {
          "email": "abc123@gmail.com",
          "topuper_id": "2ymk8Xpx4oeijeodmlk432345IIfE3",
          "amount": 100,
          "type": "儲值金",
          "payment_status": "PENDING"
        }
  } */

  /* #swagger.responses[201] = {
      schema: {
        "status": 201,
        "message": "訂單儲存成功＆加密成功",
        "data": {
          "Amt": 100,
          "Email": "abc123@gmail.com",
          "ItemDesc": "儲值金",
          "MerchantID": "MS154678014",
          "TimeStamp": 1735871760,
          "Version": "2.0",
          "aesEncrypt": "c0aa6182730ba82ee309467d28a703d7f6bedabd6643a203330f91b5aeb278c3a564b8cc8a4b9f0ef99dc79940fbae75a4730bc49d893d57e1ab958e88aeefb8ba9db67dbe6049f4b1f0cb3bf2cd76ad33db0e811148d3afeb5c4e9d1405f677281ef3693ef94ab4ec85ebeab2d74007129ca4e66a1487655972680b43b5c703cad7ee03e136a015286ba54bb71e4d7c31a841b5b07432543a8db3b4ecba0402e4784bc4455d82c3bbf5ad0ea3cfe97377be0963c4bc55192a078dbc80aa5d698c70a32a34a13b6db7c949b338599611d1cf9b88d4fb7182599595a49233f4e5800f3ef82fa64d337a21c67fdeb2692d5d90baa363d0ec171afd66d951447b008d20da67b882cbb03bf58ce55dd297d4b5e92be9aedf39a000932cf5daeef091cac853b5fbc955dbfa3d124bbce23f940b9938628c1639e6917bdd5b3b0d5a5bd32f389ca7e3d00d86e9270bd8afdbedf0437348914b05329ad42c8bc5ceee8e293b11af43e2c2ea1ad15f3eec75068aed660ca101e304e7907639e27a238bb42007c010a4230e1e360c5eed10ec0dff",
          "amount": 100,
          "email": "abc123@gmail.com",
          "merchantOrderNo": "Joi1735871760DepositfE3",
          "payment_status": "PENDING",
          "shaEncrypt": "F29E9C75873E640CDDB2DBC9E392E0E47CC15350B1315B635C0C542B728CC6C6",
          "topuper_id": "2ymk8Xpx4mZjKiUJfl11jc3IIfE3",
          "type": "儲值金"
        }
      },
      description: "訂單加密成功"
  } */

  authMiddleware,
  TopupController.handleTopupProcess
);

router.post(
  "/newebpay_notify",
  /* #swagger.ignore = true */

  /* #swagger.description = "儲值回傳" */
  authMiddleware,
  TopupController.handleNewebpayNotify
);

export default router;
