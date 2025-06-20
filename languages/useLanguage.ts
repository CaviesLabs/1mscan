"use client"

import { useMemo } from "react"

import { type LangPaths, queryLanguage } from "./language"
import { DEFAULT_LANGUAGE, type ILang } from "./utils"

export const getLang = () => {
  return globalThis.lang || DEFAULT_LANGUAGE
}

export const useLang = () => {
  return useMemo(() => getLang(), [])
}

export const getLanguage = <P extends LangPaths, D = any>(
  path: P,
  options?: {
    lang?: ILang
    defaultValue?: D
    metadata?: Record<string, any>
  },
) => {
  return queryLanguage(
    globalThis[options?.lang || getLang()] || {},
    path,
    options,
  )
}

export const useLanguage = <P extends LangPaths, D = any>(
  path: P,
  options?: {
    defaultValue?: D
    metadata?: Record<string, any>
  },
) => {
  return useMemo(() => getLanguage(path, options), [path, options])
}
