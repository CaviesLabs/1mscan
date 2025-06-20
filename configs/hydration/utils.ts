import isBrowser from "lib/isBrowser"
import compileValue from "lib/metadata/compileValue"
import getConfig from "next/config"

export const replaceQuotes = (value: string | undefined) =>
  value?.replaceAll("'", '"')

export const getEnvValue = (
  envName: string,
  templates?: Record<string, any>,
) => {
  if (isBrowser()) {
    if (process.env.NEXT_PUBLIC_APP_INSTANCE === "pw") {
      const storageValue = localStorage.getItem(envName)

      if (typeof storageValue === "string") {
        return storageValue
      }
    }
    return compileValue(
      replaceQuotes(
        getConfig().publicRuntimeConfig[
          `NEXT_PUBLIC_${String(envName).replace("NEXT_PUBLIC_", "")}`
        ],
      ),
      templates,
    )
  }

  return compileValue(replaceQuotes(process.env[String(envName)]), templates)
}
