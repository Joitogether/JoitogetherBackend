import { z } from "zod";

// const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;

export const PaymentDetailSchema = z.object({
    user_id: z.string().max(255),
    topup_date: z.coerce.date(),
    topup_number: z.number().int(),
    amount: z.number().int(),
    type: z.string().max(10),
    status: z.enum(['PENDING', 'SUCCESS', 'FAIL']),
})