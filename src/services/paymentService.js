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
  }

}

export default paymentService