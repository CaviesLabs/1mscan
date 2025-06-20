import { getEnvValue } from "configs/hydration/utils"
import type { Rewrite } from "next/dist/lib/load-custom-routes"
import type { IChainId } from "types/base"

export const rewrites = async () => {
  if (getEnvValue("NEXT_PUBLIC_APP_ENV") !== "local-dev") {
    return []
  }
  const configs = globalThis.configs
  const data = (["pacific-1"] as IChainId[]).flatMap((chain) => [
    {
      source: `/${chain}/auth/:slug*`,
      destination: `${configs[chain].API_HOST}/auth/:slug*`,
    },
    {
      source: `/${chain}/api/:slug*`,
      destination: `${configs[chain].API_HOST}/api/:slug*`,
    },
  ])
  return data as Rewrite[]
}
