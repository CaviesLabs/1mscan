import { z } from "zod"

export type IForm = {
  codeId: string
  fileName: string
  github: string
  compiler: string
}

export const schema = z.object({
  codeId: z
    .string({
      message: "Code ID is required",
      invalid_type_error: "Code ID must be a string",
      required_error: "Code ID is required",
    })
    .refine((value) => value.length > 0, {
      message: "Code ID is required",
    }),
  fileName: z
    .string({
      message: "File name is required",
      invalid_type_error: "File name must be a string",
      required_error: "File name is required",
    })
    .refine((value) => value.length > 0, {
      message: "File name is required",
    }),
  github: z
    .string({
      message: "Github link is required",
      invalid_type_error: "Github link must be a string",
      required_error: "Github link is required",
    })
    .refine((value) => value.length > 0, {
      message: "Github link is required",
    }),
  compiler: z
    .string({
      message: "Compiler is required",
      invalid_type_error: "Compiler must be a string",
      required_error: "Compiler is required",
    })
    .refine((value) => value.length > 0, {
      message: "Compiler is required",
    }),
})
