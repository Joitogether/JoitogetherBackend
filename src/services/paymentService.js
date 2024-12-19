import { prisma } from "../config/db.js";


const paymentService = {
  // 除值用
  async addDeposit(uid, depositAmount){
    return await prisma.wallet.upsert({
      where: { uid },
      update: {
        balance: {
          increment: depositAmount
        } 
      },
      create: {
        uid,
        balance: depositAmount
      }
    })
  },
  // 錢包紀錄
  async createPaymentRecord(uid, action, amount){
    return await prisma.wallet_record.create({
      data: {
        wallet_id: uid,
        action,
        amount
      }
    })
  }
}

export default paymentService