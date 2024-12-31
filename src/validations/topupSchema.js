import { z } from "zod";

export const newebpayOrderSchema = z.object({
    topuper_id: z.string().max(255),
    merchantOrderNo: z.string().max(30),
    payment_status: z.enum(['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED', 'EXPIRED']),
    amount: z.number(),
    email: z.string().max(99),
    tradeNo: z.string().max(50).optional(),
    payment_type: z.enum(['CREDIT', 'VACC', 'WEBATM', 'CVS', 'BARCODE']).optional(),
    pay_time: z.string().optional(),
    payer_ip: z.string().max(45).optional(),
    bank_code: z.string().max(10).optional(),
    card_last_four: z.string().max(10).optional(),
    escrow_bank: z.string().max(10).optional(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
})