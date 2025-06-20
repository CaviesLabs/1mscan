import { ZeroAddress } from "ethers"
import type { IAPY, IAPYProvider } from "types/api/apy"
import { DEFAULT_DATE } from "./base"

export const APY_PROVIDER = {
  id: "0",
  created_at: DEFAULT_DATE,
  updated_at: DEFAULT_DATE,
  provider_type: "LP",
  provider_key: "DRAGONSWAP",
  provider_name: "Dragonswap",
  provider_home_url: "",
  provider_base_url: "",
  provider_api: null,
  provider_logo: null,
  provider_description: null,
  how_to_stake: null,
  how_to_unstake: null,
} as IAPYProvider

export const APY = {
  id: "0",
  created_at: DEFAULT_DATE,
  updated_at: DEFAULT_DATE,
  pool_name: "placeholder",
  pool_url: "placeholder",
  pool_address: ZeroAddress,
  deposit_token_0_identifier: "",
  deposit_token_1_identifier: "",
  is_auto_compound: false,
  total_apr: 0,
  total_apy: null,
  provider: APY_PROVIDER,
  provider_id: "0",
  deposit_tokens: [],
  aprs: [],
  tvl: 0,
  fee: null,
  lock_period: null,
} as IAPY
