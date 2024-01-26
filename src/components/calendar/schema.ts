import { z } from "zod";

export const calendarSchema = z.object({
    businessCalendarId: z.string(),
    businessCalendarName: z.string(),
    startOfMonth: z.string(),
    workDays: z.number(),
    startOfWeek: z.string(),
    modifiedOn: z.string(),
    
})

export type CalendarFields = z.infer<typeof calendarSchema> 