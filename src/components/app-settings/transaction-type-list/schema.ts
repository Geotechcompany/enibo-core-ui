import { z } from "zod";

const TransactionTypeSchema = z.object({
  transactionTypeName: z.string(),
  transactionTypeCode: z.string(),
  description: z.string(),
  currency: z.string(),
  modifiedBy: z.string(),
  modifiedOn: z.string(),
});

const TransactionTypesListSchema = z.array(TransactionTypeSchema);

export default TransactionTypesListSchema;
