import { getEnvValueV2 } from "configs/frontend/chain/configs"
import type { IChainKey } from "configs/server/chain"
import type { IResourceEndpoint } from "./types"

export const appendNodeSlug = (
  endpoint: IResourceEndpoint | string,
  chainKey: IChainKey,
) => {
  if (endpoint === "api") {
    return getEnvValueV2(`${chainKey}.API_HOST`)
  }

  if (endpoint === "gateway") {
    return getEnvValueV2(`${chainKey}.API_HOST_GATEWAY`)
  }

  // if (endpoint === "workspace") {
  //   return getEnvValueV2("workspace.API_WORKSPACE_HOST")
  // }

  if (endpoint === "stats") {
    return getEnvValueV2(`${chainKey}.STATS_API`)
  }

  if (endpoint === "self") {
    return ""
  }

  if (endpoint === "auth") {
    return `/${chainKey}/auth`
  }

  if (endpoint === "self-api") {
    return `/${chainKey}`
  }

  return endpoint
}
