import type En from "./en.json"
import type Vi from "./vi.json"

export const DEFAULT_LANGUAGE = "vi"
export const LANGUAGES = ["vi", "en"] as const

export type ILang = (typeof LANGUAGES)[number]

export type ILanguages = {
  vi: typeof Vi
  en: typeof En
}

export type ILanguage = ILanguages[ILang]

export const LANG_OPTIONS = [
  {
    label: "Tiếng Việt",
    icon: "🇻🇳",
    value: "vi",
  },
  {
    label: "English",
    icon: "🇬🇧",
    value: "en",
  },
] as const
