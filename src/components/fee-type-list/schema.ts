import { z } from "zod";

const FeeTypeSchema = z.object({
  feeTypeName: z.string(),
  description: z.string(),
  transactionTypes: z.array(z.string()),
  paymentFrequency: z.string(),
  effectiveDate: z.string(),
  fixedRate: z.number(),
  modifiedBy: z.string(),
  modifiedOn: z.string(),
});

const FeeTypesListSchema = z.array(FeeTypeSchema);

export default FeeTypesListSchema;
