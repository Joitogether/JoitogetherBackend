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
                    user_id: validatedData.user_id,
                    topup_date: validatedData.topup_date,
                    topup_number: validatedData.topup_number,
                    amount: validatedData.amount,
                    email: validatedData.email,
                    type: validatedData.type,
                    status: validatedData.status,
                    },
                });
            return newTopupRecord;  
            } 
        },
        async getTopupById(user_id) {
            return await prisma.topup_record.findMany({
            where: { 
                user_id,
                status: "PENDING"
            },
            
            });
        }, 
} 
