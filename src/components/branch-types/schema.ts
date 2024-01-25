import { z } from "zod"

export const branchTypesSchema = z.object({
    branchTypeID: z.number(),
    branchTypeName: z.string(),
    description: z.string(),
    createdBy: z.string(),
    createdAt: z.string(),
    effectiveDate: z.string(),

})

export type BranchTypes = z.infer<typeof branchTypesSchema>



