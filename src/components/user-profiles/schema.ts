import { z } from "zod";

export const userProfileSchema = z.object({
  profileName: z.string().min(3, { message: "Profile Name is required" }),
  description: z.string().min(3, { message: "Description is required" }),
});

export type UserProfiles = z.infer<typeof userProfileSchema>;