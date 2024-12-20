import { createSesEncrypt, createShaEncrypt } from "../utils/payment.js";
import paymentService from "../services/paymentService.js";
import { PaymentSchema } from "../validations/paymentSchema.js";

// 加密訂單資訊
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
    const { deposit } = req.body;

    PaymentSchema.parse({ uid, amount: deposit });

    const response = await paymentService.addDeposit(uid, deposit);
    const record = await paymentService.createPaymentRecord(
      uid,
      "deposit",
      deposit
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

const fetchWalletByUid = async (req, res, next) => {
  try {
    const uid = req.params.uid;
    const response = await paymentService.getWalletByUid(uid);
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

const fetchWalletTransactions = async (req, res, next) => {
  try {
    const uid = req.params.uid;
    const response = await paymentService.getWalletTransactions(uid);
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

const spendBalance = async (req, res, next) => {
  try {
    const uid = req.params.uid;
    const { amount } = req.body;
    const response = await paymentService.debitBalance(uid, amount);

    res.status(200).json({
      status: 200,
      message: "扣款成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export {
  paymentEncrytOrder,
  paymentDeposit,
  fetchWalletByUid,
  fetchWalletTransactions,
  spendBalance,
};
