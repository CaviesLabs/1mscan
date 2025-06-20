import type { ChainContext } from "@cosmos-kit/core"
import { useChain } from "@cosmos-kit/react"
import type { ChainConfig } from "configs/frontend/chain/types"
import { useMemo } from "react"
import { currentChainConfig } from "../../../lib/hooks/useCurrentChain"

export type IUseCurrentChain = ChainContext & {
  config: ChainConfig
}

export const useCosmosChain = () => {
  const cosmosChain = useChain(currentChainConfig?.cosmosChainKey)

  return useMemo(() => {
    Reflect.ownKeys(currentChainConfig).forEach((key) => {
      Reflect.set(
        cosmosChain,
        key,
        currentChainConfig[key as keyof typeof currentChainConfig],
      )
    })

    return cosmosChain as unknown as IUseCurrentChain
  }, [cosmosChain])
}
