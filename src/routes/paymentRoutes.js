import express from "express";
import * as PaymentController from "../controllers/paymentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Wallet List
router.get(
  "/wallet/:uid",
  /* #swagger.tags = ['Balance'] */

  /* #swagger.description = "取得儲值金餘額" */

  /* #swagger.responses[200] = {
      schema: {
    "status": 200,
    "message": "成功取得資料",
    "data": {
        "uid": "7l2rEgRk2bc6KSFY90VDL2heuHo2",
        "balance": "50200"
    }
},
        description: "成功取得資料" } */
  authMiddleware,
  PaymentController.fetchWalletBalance
);

router.get(
  "/wallet/:uid/transactions",
  /* #swagger.tags = ['Balance'] */

  /* #swagger.description = "取得錢包交易紀錄" */

  /* #swagger.responses[200] = {
      schema: {
    "status": 200,
    "message": "成功取得資料",
    "data": {
        "balance": "50200",
        "transactions": [
            {
                "id": 92,
                "uid": "7l2rEgRk2bc6KSFY90VDL2h2aHo2",
                "action": "deposit",
                "amount": "500",
                "created_at": "2024-12-29T09:16:11.000Z",
                "updated_balance": "50200"
            }
        ]
    }
},
        description: "成功取得資料" } */
  authMiddleware,
  PaymentController.fetchTransactionHistory
);

// Balance Add
router.post(
  "/encrypt",
  /* #swagger.ignore = true */
  PaymentController.paymentEncrytOrder
);

router.post(
  "/wallet/:uid/deposit",
  /* #swagger.tags = ['Balance'] */

  /* #swagger.description = "增加儲值金" */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '儲值金金額',
            required: true,
            schema: {
              "amount": 2000
            }
    } */

  /* #swagger.responses[201] = {
      schema: {
        "status": 201,
        "message": "儲值成功",
        "data": {
            "balance": "2000",
            "record": {
                "id": 35,
                "wallet_id": "2LONt3qKmISeVzKAEtUcR3KzF3n1",
                "action": "deposit",
                "amount": "2000",
                "created_at": "2025-01-01T14:35:08.000Z",
                "updated_balance": "2000"
            }
        }
    },
        description: "儲值成功" } */

  authMiddleware,
  PaymentController.paymentDeposit
);

// Balance Debit
router.put(
  "/wallet/:uid/spend",
  /* #swagger.tags = ['Balance'] */

  /* #swagger.description = "扣除儲值金" */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '商品價格',
            required: true,
            schema: {
              "amount": 100
            }
    } */

  /* #swagger.responses[200] = {
      schema: {
    "status": 200,
    "message": "扣款成功",
    "data": {
        "uid": "7l2rEgRk2bc6KSFY90rqL2h2aHo2",
        "balance": "50000"
    }
}
},
        description: "成功扣款" } */
  authMiddleware,
  PaymentController.decreaseBalance
);

// Checkout Process
router.post(
  "/order/process",
  /* #swagger.tags = ['Process'] */

  /* #swagger.description = "完整結帳流程（含扣除儲值金、建立訂單、清空購物車、處理活動報名）" */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '商品價格',
            required: true,
            schema: {
              "uid": "XRS2wbAZv3NqQ42uvoSh68veitv2",
              "total_amount": 500,
              "order_items": [
                {
                  "activity_id": 34,
                  "quantity": 1,
                  "price": 500,
                  "subtotal": 500
                }
              ],
                "activity_id": 34
                }
      } */

  /* #swagger.responses[201] = { 
      schema: {
    "status": 201,
    "message": "訂單與報名成功完成",
    "data": {
        "order": {
            "order_id": 76,
            "uid": "XRS2wbAZv3NqQ42uvoSh68veitv2",
            "total_amount": "500",
            "order_status": "completed",
            "created_at": "2025-01-07T02:54:47.000Z",
            "updated_at": "2025-01-07T02:54:47.000Z",
            "order_items": [
                {
                    "order_item_id": 139,
                    "order_id": 76,
                    "activity_id": 34,
                    "quantity": 1,
                    "price": "500",
                    "subtotal": "500",
                    "created_at": "2025-01-07T02:54:47.000Z",
                    "activities": {
                        "host_id": "lNLo8eDmqoTcWghXpPA5H4P1iG02"
                    }
                }
            ]
        },
        "wallet": {
            "uid": "XRS2wbAZv3NqQ42uvoSh68veitv2",
            "balance": "9989699"
        },
        "registrations": [
            {
                "application_id": 53,
                "activity_id": 34,
                "participant_id": "XRS2wbAZv3NqQ42uvoSh68veitv2",
                "status": "registered",
                "comment": "",
                "register_validated": 1,
                "created_at": "2024-12-24T06:16:08.000Z",
                "updated_at": "2025-01-07T02:54:47.000Z"
            }
        ]
    }
},
        description: "訂單與報名成功完成" } */
  authMiddleware,
  PaymentController.handleCheckoutProcess
);

export default router;
