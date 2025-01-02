import { createSesEncrypt, createShaEncrypt } from "../utils/payment.js";
import paymentService from "../services/paymentService.js";
import { orderService } from "../services/orderService.js";
import { cartService } from "../services/cartService.js";
import { activityService } from "../services/activityService.js";
import { PaymentSchema } from "../validations/paymentSchema.js";
import "dotenv/config";

const paymentEncrytOrder = async (req, res, next) => {
  try {
    const data = req.body;
    const TimeStamp = Math.round(new Date().getTime() / 1000);
    const order = {
      ...data,
      TimeStamp,
      Amt: parseInt(data.Amount),
      MerchantOrderNo: TimeStamp,
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
      return res.status(200).json({
        status: 200,
        message: "查無資料",
        data: [],
      });
    }
    res.status(200).json({
      status: 200,
      message: "成功取得資料",
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
      return res.status(200).json({
        status: 200,
        message: "查無資料",
        data: [],
      });
    }
    res.status(200).json({
      status: 200,
      message: "成功取得資料",
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
  try {
    const {
      uid,
      total_amount,
      order_items,
      order_status = "completed",
      activity_id,
      comment = "",
      register_validated = 0,
    } = req.body;

    // 扣除儲值金
    const spendBalance = await paymentService.deductWalletBalance(
      uid,
      total_amount
    );

    // 建立訂單
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
    return res.status(201).json({
      status: 201,
      message: "訂單與報名成功完成",
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
  paymentDeposit,
  fetchWalletBalance,
  fetchTransactionHistory,
  decreaseBalance,
  handleCheckoutProcess,
  paymentEncrytOrder,
};
