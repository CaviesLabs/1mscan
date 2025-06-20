"use client"

import { getEnvValueV2 } from "./configs"

export const chainKey = "pacific-1" as "arctic-1" | "atlantic-2" | "pacific-1"

export const getEnvValueV2CommonByChainKey = (path: string) => {
  return getEnvValueV2(`common.${chainKey}.${path}`)!
}
