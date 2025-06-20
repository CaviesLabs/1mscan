import type { Address } from "./address"
import type { AddressParam } from "./addressParams"
import type { IGatewayResponse } from "./base"
import type { TokenTransfer } from "./tokenTransfer"
import type { Association } from "./transaction"

export type NFTTokenTypeEVM = "ERC-721" | "ERC-1155"
export type HybridTokenTypeEVM = "ERC-404"
export type TokenTypeEVM = "ERC-20" | HybridTokenTypeEVM | NFTTokenTypeEVM
export type TokenTypeEVMWithoutHybrid = "ERC-20" | NFTTokenTypeEVM

export type NFTTokenTypeCosmos = "CW-721"
export type NFTCointransferTypeCosmos = "coin_transfer"
export type TokenTypeCosmos = "CW-20" | NFTTokenTypeCosmos

export type NativeTokenType = "NATIVE"

export type NFTTokenType =
  | NFTTokenTypeEVM
  | NFTTokenTypeCosmos
  | HybridTokenTypeEVM
export type TokenCointransfer = "coin_transfer"
export type TokenICS20 = "ICS-20"

export type BaseTokenType = TokenTypeEVM | TokenTypeCosmos | TokenCointransfer

export type TokenType =
  | TokenTypeEVM
  | TokenTypeCosmos
  | TokenICS20
  | NativeTokenType

export type TokenTypeWithTransfer = TokenType | TokenCointransfer

export interface TokenInfo<
  T extends TokenTypeWithTransfer = TokenTypeWithTransfer,
> {
  address: string
  type: T
  symbol: string | null
  name: string | null
  decimals: string | null
  holders: string | null
  total_supply: string | null
  icon_url: string | null
  association?: Association | null
  base_denom?: string | null
  denom_trace?: string | null
  token_denom?: string | null
  items?: string | null
  fiat_value?: string | null
}

export interface TokenCounters {
  token_holders_count: string
  transfers_count: string
}

export interface TokenHolders {
  items: Array<TokenHolder>
  next_page_params: TokenHoldersPagination | null
}

export type TokenHolder = TokenHolder20And721 | TokenHolderERC1155

export type TokenHolderBase = {
  address: AddressParam
  value: string
}

export type TokenHolder20And721 = TokenHolderBase & {
  // token: TokenInfo<"ERC-20"> | TokenInfo<"ERC-721">;
}

export type TokenHolderERC1155 = TokenHolderBase & {
  // token: TokenInfo<"ERC-1155">;
  token_id: string
}

export type TokenHoldersPagination = {
  items_count: number
  value: string
}

export interface TokenInstance {
  is_unique: boolean
  id: string
  // holder_address_hash: string | null;
  image_url: string | null
  animation_url: string | null
  // external_app_url: string | null;
  metadata: Record<string, unknown> | null
  owner: AddressParam | null
  token: TokenInfo
  creator_address_hash?: string | null
}

export interface TokenInstanceTransfersCount {
  transfers_count: number
}

export interface TokenInventoryResponse {
  items: Array<TokenInstance>
  next_page_params: TokenInventoryPagination | null
}

export type TokenInventoryPagination = {
  unique_token: number
}

export type TokenInventoryFilters = {
  holder_address_hash?: string
}

export type TokenICS20sResponse = IGatewayResponse<{
  items: TokenInfo<"ICS-20">[]
}>

export type TokenNativesResponse = IGatewayResponse<{
  items: TokenInfo<"NATIVE">[]
}>

export type INativeTokenTransfersResponse = IGatewayResponse<{
  items: TokenTransfer<"NATIVE">[]
}>

export type INativeTokenHoldersResponse = IGatewayResponse<{
  items: TokenHolder[]
}>

export type INativeTokenHolder = {
  account: {
    address: string
  }
  amount: string
  last_updated_height: string
}

export type INativeTokenCounters = {
  token_holders_count: string
  transfers_count: string
}

export type IApprovalAsset = {
  token: TokenInfo
  token_id: string | null
  balance: string | null
  approved_amount: string | null
  spender: Address
  is_unlimited_approved: boolean
  is_verified_contract: boolean
  approved_amount_reality: string | null
  approved_at: string
  fiat_balance: string
  fiat_risk_value: string
}

export type IApprovalAssetsResponse = IGatewayResponse<{
  items: IApprovalAsset[]
}>

export type IApprovalStatsResponse = IGatewayResponse<{
  total_approvals: string
  total_fiat_risk_value: string
}>
