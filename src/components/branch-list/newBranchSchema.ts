import * as z from 'zod';

export const newBranchSchema = z.object({
    branchId: z.number(),
    branchName: z.string().min(3, { message: "Branch name is required" }),
    branchType: z.string().min(3, { message: "Branch type is required" }),
    description: z.string().max(10, { message: "Description is required" }),
    branchCode: z.string().min(3, { message: "Branch code is required" }),
    SWIFTCode: z.string().min(3, { message: "SWIFT code is required" }).optional(),
    localBankCode: z.string().min(3, { message: "Local bank code is required" }),
    country: z.string().min(3, { message: "Country is required" }),
    countrySubdivision: z.string().min(3, { message: "Country subdivision is required" }),
    streetName: z.string().min(3, { message: "Street name is required" }),
    buildingNumber: z.string().min(3, { message: "Building number is required" }),
    buildingName: z.string().min(3, { message: "Building name is required" }),
    postalAddress: z.string().min(3, { message: "Postal address is required" }),
    email: z.string().email({ message: "Email is required" }),
    isHeadOfficeBranch: z.enum(["yes", "no"], {
      required_error: "You need to select a branch type.",
    }),
    headOfficeBranch: z
      .string()
      .min(3, { message: "Head office branch is required" }).optional(),
});

// Define a type alias for the schema inference
export type NewBranchSchemaType = z.infer<typeof newBranchSchema>;