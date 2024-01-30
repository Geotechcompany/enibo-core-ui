import { z } from "zod"

export const manageUserSchema = z.object({
    id: z.string(),
    moduleName: z.string(),
    view: z.boolean(),
    edit: z.boolean(),
    subRows: z.array(z.object({
      moduleName: z.string(),
      view: z.boolean(),
      edit: z.boolean(),
    })).optional(),
});

export type manageUserInput = z.infer <typeof manageUserSchema>