// import isBrowser from "lib/isBrowser"
// import { type LangPaths, queryLanguage } from "./language"
// import type { ILang } from "./utils"

// export const getServerLanguage = <P extends LangPaths, D = any>(
//   lang: ILang,
//   path: P,
//   options?: {
//     defaultValue?: D
//     metadata?: Record<string, any>
//   },
// ) => {
//   if (isBrowser()) return ""
//   return queryLanguage(globalThis[lang] || {}, path, options)
// }
