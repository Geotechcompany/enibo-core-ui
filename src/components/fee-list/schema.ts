import { z } from "zod"

export const feeSchema = z.object({
    feeCode: z.string(),
    feeName: z.string(),
    description: z.string(),
    transactionType: z.string(),
    paymentFrequency: z.string(),
    effectiveDate: z.string(),
    fixedRate: z.number()
})

export type FeeTypes = z.infer<typeof feeSchema>



