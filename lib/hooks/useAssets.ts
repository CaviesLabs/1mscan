/**
 * Hook to access assets stored in Redux state
 * @returns Object containing assets and helper methods
 */

import { useMemo } from "react"
import type { VerifiedAsset } from "types/api/assetList"

export type IAssetOptions = {
  specialSource?: "github" | "seitrace"
  assets?: Record<string, VerifiedAsset>
}

export const getAssets = () => {
  return globalThis.assets
}

export const useAssets = getAssets

export const getAsset = (
  identifier: string | null | undefined,
  options?: IAssetOptions,
) => {
  if (!identifier) return undefined
  if (options?.specialSource === "github") {
    return undefined
  }
  return (options?.assets || globalThis.assets)?.[identifier.toLowerCase()]
}

export const useAsset = <
  K extends (data: VerifiedAsset) => any = (
    data: VerifiedAsset,
  ) => VerifiedAsset,
>(
  identifier: string | null | undefined,
  options?: {
    select?: K
  } & IAssetOptions,
): K extends (data: VerifiedAsset) => any
  ? ReturnType<K>
  : VerifiedAsset | undefined => {
  return useMemo<any>(() => {
    const asset = getAsset(identifier, options)
    if (!asset) return undefined
    if (options?.select) return options.select(asset)
    return asset
  }, [identifier, options?.select])
}
