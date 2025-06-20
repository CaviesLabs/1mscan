import type { Chain } from "viem"
import type { IChainId } from "../../../types/base"
import type { CosmosMainNet, ECosmosChain, NetworkType } from "./chainConfigs"

export type ChainConfig = {
  chainName: string
  chainPrettyName: string
  chainKey: IChainId
  chainId: number
  config: Chain
  disabled?: boolean
  networkType: NetworkType
  cosmosChainKey: ECosmosChain
  cosmosConfig: typeof CosmosMainNet
}
