import { chainConfigs } from "configs/frontend/chain/chainConfigs"

export const currentChainConfig = chainConfigs[0]

export const useCurrentChain = () => {
  return currentChainConfig
}
