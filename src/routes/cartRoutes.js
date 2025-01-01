import express from "express";
import * as CartController from "../controllers/cartController.js";

const router = express.Router();

// Cart Item Management
router.get(
  "/:userId",
  /* #swagger.tags = ['Cart'] */

  /* #swagger.description = "取得購物車所有商品資料(含活動資料)" */

  /* #swagger.responses[200] = { 
      schema: {
    "status": 200,
    "message": "購物車成功取得資料",
    "data": {
        "cartItems": [
            {
                "id": 115,
                "cart_id": 5,
                "activity_id": 34,
                "created_at": "2025-01-01T04:57:32.661Z",
                "is_selected": false,
                "activities": {
                    "name": "養狗",
                    "location": "台灣台北市信義區101大樓2樓連通天橋",
                    "img_url": "https://ih1.redbubble.net/image.4994245202.0402/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
                    "price": "250",
                    "require_approval": 1,
                    "pay_type": "AA",
                    "event_time": "2024-12-12T20:59:00.000Z"
                }
            }
        ],
        "totalActivities": 1
    }
},
        description: "成功取得資料" } */

  CartController.fetchCartByUserId
);

router.post(
  "/:userId",
  /* #swagger.tags = ['Cart'] */

  /* #swagger.description = "新增商品至購物車" */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '編輯文章內容',
            required: true,
            schema: {
              "activityId": 34
            }
    } */

  /* #swagger.responses[201] = { 
      schema: {
    "status": 201,
    "message": "成功新增至購物車",
    "data": {
        "id": 115,
        "cart_id": 5,
        "activity_id": 34,
        "created_at": "2025-01-01T04:57:32.661Z",
        "is_selected": false
    }
},
        description: "成功新增至購物車" } */
  CartController.addActivityToCart
);
router.delete(
  "/:userId/:activityId",
  /* #swagger.tags = ['Cart'] */

  /* #swagger.description = "刪除購物車中的商品" */

  /* #swagger.responses[200] = { 
      schema: {
    "status": 200,
    "message": "成功移除購物車項目",
    "data": null
}
},
        description: "成功移除購物車項目" } */

  CartController.removeActivityFromCart
);

// Cart Selected Item Management
router.get(
  "/:userId/selected",
  /* #swagger.tags = ['Cart_Selected_Item'] */

  /* #swagger.description = "取得購物車中已選擇的商品" */

  /* #swagger.responses[200] = { 
      schema: {
    "status": 200,
    "message": "成功取得已選擇項目",
    "data": {
        "cartItems": [
            {
                "id": 117,
                "cart_id": 5,
                "activity_id": 34,
                "created_at": "2025-01-01T05:12:30.308Z",
                "is_selected": true,
                "activities": {
                    "name": "養狗",
                    "location": "台灣台北市信義區101大樓2樓連通天橋",
                    "img_url": "https://ih1.redbubble.net/image.4994245202.0402/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
                    "price": "250",
                    "require_approval": 1,
                    "pay_type": "AA",
                    "event_time": "2024-12-12T20:59:00.000Z"
                }
            }
        ],
        "totalActivities": 1
    }
},
        description: "成功獲取已選中商品" } */
  CartController.getSelectedItems
);
router.put(
  "/:id/update-selection",
  /* #swagger.tags = ['Cart_Selected_Item'] */

  /* #swagger.description = "更新購物車中的商品狀態為已選中" */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '選中商品',
            required: true,
            schema: {
              "isSelected": true
            }
    } */

  /* #swagger.responses[200] = { 
      schema: {
    "status": 200,
    "message": "ID 為 117 的項目成功更新選擇狀態",
    "data": {
        "id": 117,
        "cart_id": 5,
        "activity_id": 34,
        "created_at": "2025-01-01T05:12:30.308Z",
        "is_selected": true
    }
}
}
},
        description: "成功更新選擇狀態" } */
  CartController.updateSelection
);
router.delete(
  "/:uid/clear",
  /* #swagger.ignore = true */
  CartController.removeCartItems
);

export default router;
