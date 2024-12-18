import express from 'express';
import * as CartController from '../controllers/cartController.js';

const router = express.Router();

// 獲取購物車內容
router.get('/:userId', CartController.fetchCartByUserId);
// 新增購物車項目
router.post('/:userId', CartController.addActivityToCart);
// 移出購物車項目
router.delete('/:userId/:activityId', CartController.removeActivityFromCart);

export default router;
