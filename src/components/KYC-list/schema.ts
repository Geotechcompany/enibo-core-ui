import * as z from 'zod';

export const kycTypeSchema = z.object({
  kycTypeName: z.string().min(3, { message: "KYC type name is required" }),
  kycTypeDescription: z.string().min(3, { message: "KYC type description is required" }),
  kycTypeCode: z.string().min(3, { message: "KYC type code is required" }),
  modifiedBy: z.string().min(3, { message: "Modified by is required" }),
  modifiedOn: z.string().min(3, { message: "Modified on is required" }),
});

// Define a type alias for the schema inference
export type KycTypeSchemaType = z.infer<typeof kycTypeSchema>;
