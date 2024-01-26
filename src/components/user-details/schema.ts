import { z } from "zod";

export const userDetailsSchema = z.object({
  username: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  employeeNumber: z.string(),
  branch: z.string(),
  userProfile: z.string(),
  documentAttachment: z.string(),
  modifiedOn: z.string(),
  modifiedBy: z.string(),
});

export type UserDetails = z.infer<typeof userDetailsSchema>;