import { createSesEncrypt, createShaEncrypt } from "../utils/payment.js";
import paymentService from "../services/paymentService.js";
import { orderService } from "../services/orderService.js";
import { cartService } from "../services/cartService.js";
import { activityService } from "../services/activityService.js";
import { PaymentSchema } from "../validations/paymentSchema.js";
import "dotenv/config";


// 加密訂單資訊
const paymentEncrytOrder = async (req, res, next) => {
  try {
    const data = req.body;
    
    const { email, amount, itemDesc } = data
    const TimeStamp = Math.round(new Date().getTime() / 1000);        
    const order = {
      Email: email,
      Amt: parseInt(amount),
      ItemDesc: itemDesc,
      TimeStamp,
      MerchantID: process.env.MerchantID,
      MerchantOrderNo: TimeStamp,
      Version: process.env.Version
    };

    const aesEncrypt = createSesEncrypt(order);
    const shaEncrypt = createShaEncrypt(aesEncrypt);
    order.aesEncrypt = aesEncrypt;
    order.shaEncrypt = shaEncrypt;

    res.status(200).json({
      status: 200,
      message: "加密成功",
      data: order,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// 儲值
const paymentDeposit = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const { amount } = req.body;

    PaymentSchema.parse({ uid, amount });

    const response = await paymentService.addDeposit(uid, amount);
    const record = await paymentService.createPaymentRecord(
      uid,
      "deposit",
      amount,
      response.balance
    );

    res.status(201).json({
      status: 201,
      message: "儲值成功",
      data: {
        balance: response["balance"],
        record,
      },
    });
  } catch (error) {
    next(error);
  }
};

const fetchWalletBalance = async (req, res, next) => {
  try {
    const uid = req.params.uid;
    const response = await paymentService.getWalletBalance(uid);
    if (!response || response.length === 0) {
      return res.status(404).json({
        status: 400,
        message: "查無此資料",
        data: null,
      });
    }
    res.status(200).json({
      status: 200,
      message: "資料獲取成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const fetchTransactionHistory = async (req, res, next) => {
  try {
    const uid = req.params.uid;
    const { action, startData, endData } = req.query;
    const response = await paymentService.getTransactionHistory(uid, {
      action,
      startData,
      endData,
    });
    if (!response || response.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "查無此資料",
        data: null,
      });
    }
    res.status(200).json({
      status: 200,
      message: "資料獲取成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const decreaseBalance = async (req, res, next) => {
  try {
    const uid = req.params.uid;
    const { amount } = req.body;
    const response = await paymentService.deductWalletBalance(uid, amount);

    res.status(200).json({
      status: 200,
      message: "扣款成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const handleCheckoutProcess = async (req, res, next) => {
  const {
    uid,
    total_amount,
    order_items,
    order_status = "completed",
    activity_id,
    comment = "",
    register_validated = 0,
  } = req.body;

  try {
    // 驗證參數
    if (!uid || !total_amount || !order_items || order_items.length === 0) {
      return res.status(400).json({
        status: 400,
        message: "參數不完整",
        success: false,
      });
    }

    // 扣除儲值金
    const spendBalance = await paymentService.deductWalletBalance(
      uid,
      total_amount
    );
    if (!spendBalance) {
      throw new Error("Insufficient wallet balance.");
    }

    // 創建訂單
    const createdOrder = await orderService.createOrder({
      uid,
      total_amount,
      order_items,
      order_status,
      activity_id,
      comment,
      register_validated,
    });

    // 清空購物車
    await cartService.clearCart(uid);

    // 處理活動報名
    const registrationResult = [];
    for (const item of order_items) {
      const registration = await activityService.upsertApplication(
        item.activity_id,
        uid,
        comment,
        item.require_approval ? 0 : 1
      );
      registrationResult.push(registration);
    }

    // 返回所有處理成功結果
    return res.status(200).json({
      status: 200,
      message: "訂單與報名成功完成",
      success: true,
      data: {
        order: createdOrder,
        wallet: spendBalance,
        registrations: registrationResult,
      },
    });
  } catch (error) {
    next(error);
  }
};

export {
  paymentEncrytOrder,
  paymentDeposit,
  fetchWalletBalance,
  fetchTransactionHistory,
  decreaseBalance,
  handleCheckoutProcess,
};
