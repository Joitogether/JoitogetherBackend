import { z } from "zod";

export const PaymentSchema = z.object({
  uid: z.string().max(255),
  amount: z.number(),
});

export const GetDepositSchema = z.object({
  uid: z.string().max(255),
});

export const getWalletTransactionsSchema = z.object({
  wallet_id: z.string().max(255),
  amount: z.number().int(),
  action: z.enum(["spend", "withdraw", "deposit", "refund"]),
});
