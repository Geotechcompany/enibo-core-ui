import { z } from "zod";

export const countrySchema = z.object({
  id: z.number(),
  name: z.string().min(3, { message: "Country name is required" }),
  code: z.string().min(2, { message: "Country code is required" }),
  flag: z.string(),
  modifiedBy: z.string(),
  modifiedOn: z.string(),
});

export type Country = z.infer<typeof countrySchema>;