import * as cookie from "cookie" // dùng để parse ở server
import type { IncomingMessage } from "http"
import Cookies from "js-cookie"
import isBrowser from "lib/isBrowser"
import type { ILang } from "./utils"

export const loadLanguage = async (lang: ILang | undefined = "vi") => {
  if (isBrowser()) return globalThis[lang]
  if (globalThis[lang]) return globalThis[lang]
  await import(`./${lang}.json`).then((data) => {
    globalThis[lang] = data.default
  })

  return globalThis[lang]
}

export const getCookieLang = (req: IncomingMessage | undefined) => {
  let lang = "vi"
  if (!isBrowser()) {
    const parsedCookies =
      (req?.headers?.cookie && cookie.parse(req.headers.cookie)) || {}
    lang = parsedCookies["lang"] || "vi"
  } else {
    lang = Cookies.get("lang") || "vi"
  }

  return lang as ILang
}
