import moment from "lib/date/moment"
import { z } from "zod"

export interface FormFields {
  from: string
  to: string
  reCaptcha: string
}

export const schema = z
  .object({
    // reCaptcha: z.string({ message: "ReCaptcha is required" }),
    from: z
      .string()
      .refine((date) => moment(date, "YYYY-MM-DD", true).isValid(), {
        message: "Invalid from format. Expected format: YYYY-MM-DD",
      })
      .refine((data) => Boolean(data), { message: "From is required" }),
    to: z
      .string()
      .refine((date) => moment(date, "YYYY-MM-DD", true).isValid(), {
        message: "Invalid to format. Expected format: YYYY-MM-DD",
      })
      .refine((data) => Boolean(data), { message: "To is required" }),
  })
  .refine((data) => moment(data.from).isSameOrBefore(data.to), {
    message: "From date must be less than or equal to To date",
    path: ["to"],
  })
