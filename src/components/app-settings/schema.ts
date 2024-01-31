import { z } from "zod";

export const appSchema = z.object({
    appId: z.string(),
    appValue: z.string(),
    moduleName: z.string(),
    description: z.string(),
    view: z.boolean(),
    modifiedBy: z.string(),
    modifiedOn: z.string(),
    
})

export type AppSettingsFields = z.infer<typeof appSchema> 