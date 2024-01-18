import { z } from "zod"

export const branchSchema = z.object({
    id: z.string(),
    branchName: z.string(),
    description: z.string(),
    branchCode: z.string(),
    SWIFTCode: z.string(),
    localBankCode: z.string(),
    country: z.string(),
    countrySubdivision: z.string(),
    streetName: z.string(),
    buildingNumber: z.string(),
    buildingName: z.string(),
    postalAddress: z.string(),
    AllowedProductTypes: z.array(z.string()),
    email: z.string(),
    isHeadOfficeBranch: z.boolean(),
    headOfficeBranch: z.string(),
    createdAt: z.string(),
})

export type Branch = z.infer<typeof branchSchema>

