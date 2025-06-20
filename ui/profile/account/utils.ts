import { z } from "zod"

export const userSettingsSchema = z.object({
  fullname: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
})

export const changePasswordSchema = z
  .object({
    email: z.string().optional(),
    old_password: z
      .string({ required_error: "Current password is required" })
      .refine((data) => Boolean(data), {
        message: "Current password is required",
      }),
    new_password: z
      .string({ required_error: "New password is required" })
      .refine((data) => Boolean(data), {
        message: "New password is required",
      }),
    confirm_password: z
      .string({ required_error: "Confirm password is required" })
      .refine((data) => Boolean(data), {
        message: "Confirm password is required",
      }),
  })
  .refine(
    (data) => {
      if (data.confirm_password !== data.new_password) {
        return false
      }
      return true
    },
    { message: "Confirm password is not match", path: ["confirm_password"] },
  )

export const photoSchema = z.object({
  file: z
    .array(z.custom<File>())
    .refine((files) => Boolean(files.length), { message: "Image is required" }),
})
