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
        const updateData = {
            payment_status: Status === 'PENDING' ? 'SUCCESS' : Status,
            trade_no: Result.TradeNo,
            payment_type: Result.PaymentType,
            pay_time: Result.PayTime,
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
                id,
                topuper_id 
            },
            data: cleanedData,
            select: {
                topuper_id: true,
                amount: true,
                payment_status: true,  
                trade_no: true      
            }
            });
        }
    // async createNewebpayOrder(data) {
    //     const created = await prisma.newebpay_transactions.create({
    //         merchant_order_no: data.merchant_order_no,
    //         trade_no: data.trade_no,
    //         payment_status: data.payment_status,
    //         amount: data.amount,
    //         payment_type: data.payment,
    //         pay_time: data.pay_time,
    //         payer_ip: data.payer_ip,
    //         bank_code: data.bank_code,
    //         card_last_four: data.card_last_four,
    //         escrow_bank: data.escrow_bank,
    //         created_at: data.created_at,
    //         updated_at: data.updated_at
    //     })
    //     return created
    // }
} 
