import express from "express";
import * as OrderController from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Order List
router.get(
  "/",
  /* #swagger.ignore = true */
  authMiddleware,
  OrderController.fetchAllOrders
);

router.get(
  "/:order_id",
  /* #swagger.tags = ['Order'] */

  /* #swagger.description = "取得單筆訂單資料" */

  /* #swagger.responses[200] = {
      schema: {
    "status": 200,
    "message": "成功取得資料",
    "data": {
        "order_id": 49,
        "uid": "7l2rEgRk2bc6KSFY90VDL2h2aHo2",
        "total_amount": "750",
        "order_status": "completed",
        "created_at": "2024-12-23T10:48:45.000Z",
        "updated_at": "2024-12-23T18:48:45.000Z",
        "order_items": [
            {
                "order_item_id": 97,
                "order_id": 49,
                "activity_id": 34,
                "quantity": 1,
                "price": "250",
                "subtotal": "250",
                "created_at": "2024-12-23T10:48:45.000Z",
                "activities": {
                    "name": "養狗"
                }
            },
            {
                "order_item_id": 98,
                "order_id": 49,
                "activity_id": 35,
                "quantity": 1,
                "price": "500",
                "subtotal": "500",
                "created_at": "2024-12-23T10:48:45.000Z",
                "activities": {
                    "name": "買飾品"
                }
            }
        ]
    }
},
        description: "成功取得資料" } */
  authMiddleware,
  OrderController.fetchOrderById
);

router.get(
  "/pending/:uid",
  /* #swagger.ignore = true */
  OrderController.fetchPendingOrder
);

// Order Create/Delete
router.post(
  "/",
  /* #swagger.tags = ['Order'] */

  /* #swagger.description = "建立訂單" */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '訂單資訊',
            required: true,
            schema: {
              "uid": "LIAnzmdBnwcig6NGoXYIRsIMM7I3",
              "total_amount": 2000, 
              "order_status": "pending", 
              "order_items": [
                {
                  "activity_id": 33, 
                  "quantity": 2, 
                  "price": 1000, 
                  "subtotal": 2000 
                },
                {
                  "activity_id": 34,
                  "quantity": 1,
                  "price": 500,
                  "subtotal": 500
                }
              ]
            }
    } */

  /* #swagger.responses[201] = { 
      schema: {
    "status": 201,
    "message": "資料建立成功",
    "data": {
        "order_id": 69,
        "uid": "LIAnzmdBnwcig6NGoXYIRsIMM7I3",
        "total_amount": "2000",
        "order_status": "pending",
        "created_at": "2025-01-01T04:29:17.000Z",
        "updated_at": "2025-01-01T04:29:17.000Z",
        "order_items": [
            {
                "order_item_id": 130,
                "order_id": 69,
                "activity_id": 33,
                "quantity": 2,
                "price": "1000",
                "subtotal": "2000",
                "created_at": "2025-01-01T04:29:17.000Z"
            },
            {
                "order_item_id": 131,
                "order_id": 69,
                "activity_id": 34,
                "quantity": 1,
                "price": "500",
                "subtotal": "500",
                "created_at": "2025-01-01T04:29:17.000Z"
            }
        ]
    }
},
        description: "資料建立成功" } */
  authMiddleware,
  OrderController.addOrder
);

router.delete(
  "/:order_id/delete",
  /* #swagger.tags = ['Order'] */

  /* #swagger.description = "刪除訂單" */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '訂單狀態',
            required: true,
            schema: {
              "order_status": "deleted"
            }
    } */

  /* #swagger.responses[200] = {
      schema: {
    "status": 200,
    "message": "訂單刪除",
    "data": {
        "order_id": 69,
        "uid": "LIAnzmdBnwcig3eEoXYIRsIMM7I3",
        "total_amount": "2000",
        "order_status": "deleted",
        "created_at": "2025-01-01T04:29:17.000Z",
        "updated_at": "2025-01-01T12:33:58.000Z"
    }
},
        description: "訂單刪除" } */
  authMiddleware,
  OrderController.removeOrder
);

// Order Status Management
router.put(
  "/:order_id/complete",
  /* #swagger.tags = ['Order'] */

  /* #swagger.description = "訂單完成" */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '訂單狀態',
            required: true,
            schema: {
              "order_status": "completed"
            }
    } */

  /* #swagger.responses[200] = {
      schema: {
    "status": 200,
    "message": "訂單完成",
    "data": {
        "order_id": 69,
        "uid": "LIAnzmdBnwcig3eEoXYIRsIMM7I3",
        "total_amount": "2000",
        "order_status": "completed",
        "created_at": "2025-01-01T04:29:17.000Z",
        "updated_at": "2025-01-01T12:33:58.000Z"
    }
},
        description: "訂單完成" } */
  authMiddleware,
  OrderController.completeOrder
);

router.put(
  "/:order_id/fail",
  /* #swagger.tags = ['Order'] */

  /* #swagger.description = "訂單失敗" */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '訂單狀態',
            required: true,
            schema: {
              "order_status": "failed"
            }
    } */

  /* #swagger.responses[200] = {
      schema: {
    "status": 200,
    "message": "訂單失敗",
    "data": {
        "order_id": 69,
        "uid": "LIAnzmdBnwcig3eEoXYIRsIMM7I3",
        "total_amount": "2000",
        "order_status": "failed",
        "created_at": "2025-01-01T04:29:17.000Z",
        "updated_at": "2025-01-01T12:33:58.000Z"
    }
},
        description: "訂單失敗" } */
  authMiddleware,
  OrderController.failOrder
);

router.put(
  "/:order_id/cancel",
  /* #swagger.tags = ['Order'] */

  /* #swagger.description = "取消訂單" */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '訂單狀態',
            required: true,
            schema: {
              "order_status": "cancelled"
            }
    } */

  /* #swagger.responses[200] = {
      schema: {
    "status": 200,
    "message": "訂單取消",
    "data": {
        "order_id": 69,
        "uid": "LIAnzmdBnwcig3eEoXYIRsIMM7I3",
        "total_amount": "2000",
        "order_status": "cancelled",
        "created_at": "2025-01-01T04:29:17.000Z",
        "updated_at": "2025-01-01T12:33:58.000Z"
    }
},
        description: "訂單取消" } */

  authMiddleware,
  OrderController.cancelOrder
);

export default router;
