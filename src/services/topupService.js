import { prisma } from "../config/db.js";
import { newebpayOrderSchema } from "../validations/topupSchema.js";

///儲值紀錄
export const TopupService = {
    async createTopup(data) {
        console.log('service收到的data:',data);

        const validatedData = newebpayOrderSchema.parse(data)  
        console.log("validatedData", validatedData);
        
            if(validatedData) {
                const newTopupRecord = await prisma.newebpay_transactions.create({
                    data: {
                    topuper_id: validatedData.topuper_id,
                    merchantOrderNo: validatedData.merchantOrderNo,
                    email: validatedData.email,
                    payment_status: validatedData.payment_status,
                    amount: validatedData.amount
                    },
                });
            return newTopupRecord;  
        }},
    async getTopupRecordById(topuper_id) {
        return await prisma.newebpay_transactions.findMany({
            where: { 
                topuper_id,
                payment_status: "SUCCESS"
            },
            include: {
                wallet: {
                    select: { balance: true },
                }
            }
        })
    },
    async updateNewebpayOrder(data) {
        console.log('藍新notify傳來的資料', data);
        const { Result, Status } = data
        let pay_time = Result.PayTime;

        // 修正格式
        if (pay_time) {
            pay_time = pay_time.slice(0, 10) + "T" + pay_time.slice(10);

            // 確保是合法日期
            const parsedDate = new Date(pay_time);
            if (isNaN(parsedDate.getTime())) {
                throw new Error("Invalid pay_time format");
            }

            // 轉為 ISO 格式
            pay_time = parsedDate.toISOString();
        }
        const updateData = {
            payment_status: Status === 'PENDING' ? 'SUCCESS' : Status,
            tradeNo: Result.TradeNo,
            payment_type: Result.PaymentType,
            pay_time: pay_time,
            payer_ip: Result.IP || undefined,  
            bank_code: Result.PayBankCode || undefined,
            card_last_four: Result.PayerAccount5Code || undefined,
            escrow_bank: Result.EscrowBank || undefined,
            };
        console.log('updateData', updateData);
        
            // 移除 undefined 的欄位，這樣不會覆蓋原有的值
            const cleanedData = Object.fromEntries(
            Object.entries(updateData).filter(([_, value]) => value !== undefined)
            );
        
            return await prisma.newebpay_transactions.update({
            where: { 
                merchantOrderNo: Result.MerchantOrderNo,
                payment_status: "PENDING"
            },
            data: cleanedData,
            select: {
                topuper_id: true,
                amount: true,
                payment_status: true,  
                tradeNo: true      
            }
            });
        }
} 
