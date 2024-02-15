import * as z from 'zod';

export const transactionTypeSchema = z.object({
  transactionTypeName: z.string().min(3, { message: "Transaction type name is required" }),
  transactionTypeCode: z.string().min(3, { message: "Transaction type code is required" }),
  description: z.string().min(3, { message: "Description is required" }),
  currency: z.string().min(3, { message: "Currency is required" }),
  modifiedBy: z.string().min(3, { message: "Modified by is required" }),
  modifiedOn: z.string().min(3, { message: "Modified on is required" }),
});

// Define a type alias for the schema inference
export type TransactionTypeSchemaType = z.infer<typeof transactionTypeSchema>;


