import type { Association, Transaction } from "types/api/transaction"

import type { OSType } from "types/base"
import type { AddressImplementation } from "./addressParams"
import type { Block } from "./block"
import type { InternalTransaction } from "./internalTransaction"
import type { NFTTokenType, TokenInfo, TokenInstance, TokenType } from "./token"
import type { TokenTransfer, TokenTransferPagination } from "./tokenTransfer"

export interface Address {
  block_number_balance_updated_at: number | null
  coin_balance: string | null
  creator_address_hash: string | null
  creation_tx_hash: string | null
  exchange_rate: string | null

  has_custom_methods_read: boolean
  has_custom_methods_write: boolean
  has_decompiled_code: boolean
  has_logs: boolean
  has_methods_read: boolean
  has_methods_read_proxy: boolean
  has_methods_write: boolean
  has_methods_write_proxy: boolean
  hash: string
  is_contract: boolean | null
  is_verified: boolean | undefined | null
  name: string | null
  token: TokenInfo | null
  code_id?: number
  association?: Association | null
  implementations: Array<AddressImplementation> | null
}

export interface AddressCounters {
  transactions_count: string
  token_transfers_count: string
  gas_usage_count: string
  validations_count: string | null
}

export interface AddressTokenBalance {
  token: TokenInfo | null
  token_id: string | null
  value: string
  // fiat_balance: string | null;
  // token_instance: TokenInstance | null;
}

export type AddressNFT = TokenInstance & {
  token: TokenInfo
  token_type: Omit<TokenType, "ERC-20">
  value: string
}

export type AddressCollection = {
  token: TokenInfo
  amount: string
  token_instances: Array<Omit<AddressNFT, "token">>
}

export interface AddressTokensResponse {
  items: Array<AddressTokenBalance>
  next_page_params: {
    items_count: number
    token_name: string | null
    token_type: TokenType
    value: number
    fiat_value: string | null
  } | null
}

export interface AddressNFTsResponse {
  items: Array<AddressNFT>
  next_page_params: {
    items_count: number
    token_id: string
    token_type: TokenType
    token_contract_address_hash: string
  } | null
}

export interface AddressCollectionsResponse {
  items: Array<AddressCollection>
  next_page_params: {
    token_contract_address_hash: string
    token_type: TokenType
  } | null
}

export interface AddressTokensBalancesSocketMessage {
  overflow: boolean
  token_balances: Array<AddressTokenBalance>
}

export interface AddressTransactionsResponse {
  items: Array<Transaction>
  next_page_params: {
    block_number: number
    index: number
    items_count: number
  } | null
}

export const AddressFromToFilterValues = [
  "evm",
  "cosmos",
  "from",
  "to",
] as const

export type AddressFromToFilter =
  | (typeof AddressFromToFilterValues)[number]
  | undefined

export type AddressTxsFilters = {
  filter: AddressFromToFilter
  type?: OSType
}

export interface AddressTokenTransferResponse {
  items: Array<TokenTransfer>
  next_page_params: TokenTransferPagination | null
}

export type AddressTokenTransferFilters = {
  filter?: AddressFromToFilter
  type?: Array<TokenType>
  token?: string
}

export type AddressTokensFilter = {
  type: TokenType
}

export type AddressNFTTokensFilter = {
  type: NFTTokenType[] | undefined
}

export interface AddressCoinBalanceHistoryItem {
  block_number: number
  block_timestamp: string
  delta: string
  transaction_hash: string | null
  value: string
}

export interface AddressCoinBalanceHistoryResponse {
  items: Array<AddressCoinBalanceHistoryItem>
  next_page_params: {
    block_number: number
    items_count: number
  } | null
}

export type AddressCoinBalanceHistoryChart = Array<{
  date: string
  value: string
}>

export interface AddressBlocksValidatedResponse {
  items: Array<Block>
  next_page_params: {
    block_number: number
    items_count: number
  }
}
export interface AddressInternalTxsResponse {
  items: Array<InternalTransaction>
  next_page_params: {
    block_number: number
    index: number
    items_count: number
    transaction_index: number
  } | null
}

export type AddressWithdrawalsResponse = {
  items: Array<AddressWithdrawalsItem>
  next_page_params: {
    index: number
    items_count: number
  }
}

export type AddressWithdrawalsItem = {
  amount: string
  block_number: number
  index: number
  timestamp: string
  validator_index: number
}

export type AddressTabsCounters = {
  internal_txs_count: number | null
  logs_count: number | null
  token_balances_count: number | null
  token_transfers_count: number | null
  transactions_count: number | null
  validations_count: number | null
  withdrawals_count: number | null
}

export type AddressTokensCounter = {
  erc721_count: number
  erc20_count: number
  erc1155_count: number
  erc404_count: number
  cw721_count: number
  cw20_count: number
  ics20_count: number
  native_count: number
}
