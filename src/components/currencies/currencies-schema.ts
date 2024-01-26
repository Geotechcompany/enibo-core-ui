import { z } from "zod";

export const currencySchema = z.object({
  id: z.number(),
  currencyCode: z.string().min(2, { message: "Currency code is required" }),
  currencyDescription: z.string(),
  country: z.string().min(3, { message: "Country is required" }),
  modifiedBy: z.string().min(3, { message: "Modified by is required" }),
  modifiedOn: z.string().min(3, { message: "Modified on is required" }),
});

export type CurrencyInput = z.infer<typeof currencySchema>;