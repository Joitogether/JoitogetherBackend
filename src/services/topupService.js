import { prisma } from "../config/db.js";
import { PaymentDetailSchema } from "../validations/topupSchema.js";

///儲值紀錄
export const TopupService = {
    async createTopup(topupData) {
        const validatedData = PaymentDetailSchema.parse(topupData)    
            if(topupData) {
                // const isoDate = new Date(validatedData.topup_date.replace(" ", "T")).toISOString();
                const newTopupRecord = await prisma.topup_record.create({
                    data: {
                    topuper_id: validatedData.topuper_id,
                    topup_date: validatedData.topup_date,
                    topup_number: validatedData.topup_number,
                    amount: validatedData.amount,
                    email: validatedData.email,
                    type: validatedData.type,
                    status: validatedData.status,
                    },
                });
            return newTopupRecord;  
        }},
    async getTopupRecordById(topuper_id) {
        return await prisma.topup_record.findMany({
        where: { 
            topuper_id,
            status: "PENDING"
        },
    })},
    async saveNewebpay(saveData) {
        const validatedData = newebpayPaymentSchema.parse(saveData)    
            if(saveData) {
                // const isoDate = new Date(validatedData.topup_date.replace(" ", "T")).toISOString();
                const newwebpayPayment = await prisma.pay_payment.create({
                    data: {
                    orderId: validatedData.orderId,
                    userId: validatedData.userId,
                    amount: validatedData.amount,
                    paidAt: validatedData.paidAt,
                    tradeNo: validatedData.tradeNo,
                    createdAt: validatedData.createdAt,
                    updatedAt: validatedData.updatedAt,
                    },
                });
            return newwebpayPayment;  
        }},
} 
