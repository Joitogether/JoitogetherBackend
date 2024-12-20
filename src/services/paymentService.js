import { prisma } from "../config/db.js";
import { GetDepositSchema } from "../validations/paymentSchema.js";

const paymentService = {
  // 儲值用
  async addDeposit(uid, depositAmount) {
    return await prisma.wallet.upsert({
      where: { uid },
      update: {
        balance: {
          increment: depositAmount,
        },
      },
      create: {
        uid,
        balance: depositAmount,
      },
    });
  },
  // 錢包紀錄
  async createPaymentRecord(uid, action, amount) {
    return await prisma.walletRecord.create({
      data: {
        uid,
        action,
        amount,
      },
    });
  },

  // 獲取用戶錢包紀錄
  async getWalletByUid(uid) {
    GetDepositSchema.parse({ uid });
    return await prisma.wallet.findUnique({ where: { uid } });
  },

  // 獲取用戶錢包交易紀錄
  async getWalletTransactions(uid) {
    const wallet = await prisma.wallet.findUnique({ where: { uid } });
    if (!wallet) {
      throw new Error("錢包不存在");
    }

    const transactions = await prisma.wallet_record.findMany({
      where: { wallet_id: wallet.uid },
      orderBy: {
        created_at: "desc",
      },
    });
    const formattedResponse = {
      balance: wallet.balance,
      transactions: transactions.map((record) => ({
        id: record.id,
        uid: record.wallet_id,
        action: record.action,
        amount: record.amount,
        created_at: record.created_at,
      })),
    };
    return formattedResponse;
  },

  // 扣除儲值金
  async debitBalance(uid, amount) {
    // 驗證參數
    if (!uid || amount <= 0) {
      throw new Error("Uid 或金額不正確");
    }

    // 查找用戶錢包
    const wallet = await prisma.wallet.findUnique({
      where: { uid },
    });
    if (!wallet) {
      throw new Error("錢包不存在");
    }

    // 確認餘額是否足夠
    if (wallet.balance < amount) {
      throw new Error("餘額不足");
    }

    // 扣除餘額並更新到錢包
    const updateWallet = await prisma.wallet.update({
      where: { uid },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    // 添加扣款紀錄
    await prisma.wallet_record.create({
      data: {
        wallet_id: wallet.uid,
        action: "spend",
        amount: -amount,
      },
    });

    return updateWallet;
  },
};

export default paymentService;
