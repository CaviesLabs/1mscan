"use client"

import Handlebars from "handlebars"
import { get } from "lodash"
import type { ILanguage } from "./utils"

type Paths<T extends object> = {
  [K in keyof T]: K extends string | number | bigint | boolean
    ? T[K] extends object
      ? `${K}.${Paths<T[K]>}`
      : K
    : never
}[keyof T]

export type LangPaths = Paths<ILanguage>

export const queryLanguage = <P extends LangPaths, D = any>(
  language: ILanguage,
  path: P,
  options?: {
    defaultValue?: D
    metadata?: Record<string, any>
  },
) => {
  const defaultValue = options?.defaultValue ?? ""
  const metadata = options?.metadata ?? {}

  const source = get(language, path, defaultValue) as unknown as string

  if (metadata) {
    const template = Handlebars.compile(source)
    return template(metadata) as unknown as string
  }

  return source
}
