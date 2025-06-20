import type { TimestampEntity } from "types/commom"
import type { ZodSchema } from "zod"
import type { IGatewayResponse } from "./base"
export type IAPYProviderType =
  | "LP"
  | "DELEGATED"
  | "LIQUID"
  | "YIELD_AGGREGATOR"
  | "LENDING"

export type IAPYProviderKey =
  | "DRAGONSWAP"
  | "PIT"
  | "SILO"
  | "SEI_STAKE"
  | "JELLYVERSE"

export type IAPYRewardToken = {
  identifier: string // address of the token
  name?: string | null // name of the token, if not provided, use from `seitrace submit token info`
  symbol?: string | null // symbol of the token, if not provided, use from `seitrace submit token info`
  icon_url?: string | null | null // icon url of the token, if not provided, use from `seitrace submit token info`
  decimals?: number | null // decimals of the token, if not provided, use from `seitrace submit token info`
  coingecko_id?: string | null | null // coingecko id of the token, if not provided, use from `seitrace submit token info`
}

export type IAPYDepositToken = {
  identifier: string // address of the token
  deposited_amount?: number | null // amount of the token deposited in the pool, ex: 12064.4126408933883
  name?: string | null // name of the token, if not provided, use from `seitrace submit token info`
  symbol?: string | null // symbol of the token, if not provided, use from `seitrace submit token info`
  icon_url?: string | null | null // icon url of the token, if not provided, use from `seitrace submit token info`
  decimals?: number | null // decimals of the token, if not provided, use from `seitrace submit token info`
  coingecko_id?: string | null | null // coingecko id of the token, if not provided, use from `seitrace submit token info`
  min_deposit?: number | null // min deposit token amount
  max_deposit?: number | null // max deposit token amount
}

export type IAPYAPRType = "base" | "incentive"

export type IAPR = {
  reward_token: IAPYRewardToken
  type: IAPYAPRType
  apr?: number | null // 100%
  apy?: number | null // 100%
}

export type IAPYProvider = TimestampEntity & {
  provider_type: IAPYProviderType
  provider_key: IAPYProviderKey
  provider_name: string
  provider_home_url: string // url to home page of the provider
  provider_base_url: string //`https://${string}/` // base url to pool detail, ex: https://1mscan.com/pool/
  provider_api?: string | null // https://api.1mscan.com/pools
  provider_logo?: string | null // url to logo of the provider
  provider_description?: string | null // description of the provider
  lock_period?: number | null // lock period in days
  how_to_stake?: string | null // how to stake
  how_to_unstake?: string | null // how to unstake
  prompt_template?: string | null // prompt template for the provider
  schema?: ZodSchema | null // zod schema for the provider
}

export type IAPY = TimestampEntity & {
  provider: IAPYProvider
  provider_id: string
  pool_name: string // name of the pool
  pool_url: string // url of the pool
  pool_address?: string | null // contract address of the pool
  pool_image?: string | null // image of the pool
  total_apr: number // 100%
  total_apy?: number | null // 100%
  deposit_tokens: IAPYDepositToken[] // deposit tokens of the pool
  deposit_token_0_identifier: string // identifier of the first deposit token
  deposit_token_1_identifier?: string | null // identifier of the second deposit token
  deposit_token_2_identifier?: string | null // identifier of the third deposit token
  deposit_token_3_identifier?: string | null // identifier of the fourth deposit token
  is_auto_compound?: boolean | null // if the pool is auto compound
  aprs: IAPR[]
  fee?: number | null // fee per deposit
  tvl: number // total value locked of the pool in USD
  is_new?: boolean | null // if the pool is new
}

export type IAPYTopResponse = IGatewayResponse<{
  items: IAPY[]
}>

export type IAPYProviderResponse = IGatewayResponse<{
  items: IAPYProvider[]
}>

export const MAP_PROVIDER_TYPE = {
  LP: "LP staking",
  DELEGATED: "Delegated staking",
  LIQUID: "Liquid staking",
  YIELD_AGGREGATOR: "Yield Aggregator",
  LENDING: "Lending",
  get getValue() {
    return (provider_type: string) => {
      return this[provider_type] || ""
    }
  },
  get getMiniValue() {
    const MAP_MINI_VALUE = {
      LP: "LP",
      DELEGATED: "Delegated",
      LIQUID: "Liquid",
      YIELD_AGGREGATOR: "Aggregator",
      LENDING: "Lending",
    }
    return (provider_type: string) => {
      return MAP_MINI_VALUE[provider_type] || ""
    }
  },
} as Record<IAPYProviderType, string> & {
  getValue: (provider_type: string) => string
  getMiniValue: (provider_type: string) => string
}
