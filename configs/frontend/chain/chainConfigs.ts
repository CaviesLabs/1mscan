"use client"

import type { Chain } from "viem"
import { ChainKey, SEI_BASE_COSMOS_KIT_CHAIN } from "./data"
import type { ChainConfig } from "./types"

export const RPC_URLS: Record<ChainKey, string> = {
  [ChainKey.ARCTIC_1]: "https://evm-rpc-arctic-1.sei-apis.com",
  [ChainKey.ATLANTIC_2]: "https://evm-rpc-testnet.sei-apis.com",
  [ChainKey.PACIFIC_1]: "https://evm-rpc.sei-apis.com",
}

export const MainNet = {
  id: 1329,
  name: "SEI",
  nativeCurrency: { name: "SEI", symbol: "SEI", decimals: 18 },
  rpcUrls: {
    default: { http: [RPC_URLS[ChainKey.PACIFIC_1]] },
    public: { http: [RPC_URLS[ChainKey.PACIFIC_1]] },
  },
  blockExplorers: {
    default: { name: "Seitrace", url: "https://seitrace.com" },
  },
} as const satisfies Chain

export const CosmosMainNet = {
  ...SEI_BASE_COSMOS_KIT_CHAIN,
  chain_type: "cosmos",
  chain_name: "sei",
  pretty_name: "Sei (mainnet)",
  chain_id: "pacific-1",
  apis: {
    rpc: [
      {
        address: "https://rpc.sei-apis.com",
        provider: "Rhino Stake",
      },
    ],
    rest: [
      {
        address: "https://rest.sei-apis.com",
        provider: "Rhino Stake",
      },
    ],
    grpc: [
      {
        address: "https://grpc.sei-apis.com:443",
        provider: "Rhino Stake",
      },
    ],
    "evm-http-jsonrpc": [
      {
        address: "https://evm-rpc.sei-apis.com",
        provider: "Rhino Stake",
      },
    ],
  },
  explorers: [
    {
      url: "https://seitrace.com/?chain=pacific-1",
      tx_page: "https://seitrace.com/tx/${txHash}?chain=pacific-1",
      account_page:
        "https://seitrace.com/address/${accountAddress}?chain=pacific-1",
      proposal_page:
        "https://seitrace.com/proposal/${proposalId}?chain=pacific-1",
      block_page: "https://seitrace.com/block/${blockHeight}?chain=pacific-1",
    },
  ],
} as const

export const ChainKeys = {
  MAINNET: ChainKey.PACIFIC_1,
}

export type NetworkType = "devnet" | "testnet" | "mainnet"

export enum ECosmosChain {
  SEI = "sei",
}

export const chainConfigs = [
  {
    chainName: "pacific-1 (mainnet)",
    chainKey: ChainKeys.MAINNET,
    chainId: 1329,
    disabled: false,
    config: MainNet as unknown as ChainConfig["config"],
    networkType: "mainnet",
    chainPrettyName: "Sei (mainnet)",
    cosmosChainKey: ECosmosChain.SEI,
    cosmosConfig: CosmosMainNet as unknown as ChainConfig["cosmosConfig"],
  },
] as const satisfies ChainConfig[]
