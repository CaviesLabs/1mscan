import type { OSType } from "types/base"
import type { Hex } from "viem"
import type { AddressParam } from "./addressParams"
import type { BlockTransactionsResponse } from "./block"
import type { DecodedInput } from "./decodedInput"
import type { Fee } from "./fee"
import type { StatusTagType, TokenTransfer } from "./tokenTransfer"

export type TransactionRevertReason =
  | {
      raw: Hex | string
      method_call?: undefined
      method_id?: undefined
      parameters?: undefined
    }
  | ({
      raw?: undefined
    } & DecodedInput)

export type AddressMappingType =
  | "EOA"
  | "TRANSACTION"
  | "CREATE_CW20_POINTER"
  | "CREATE_CW721_POINTER"
  | "CREATE_ERC20_POINTER"
  | "CREATE_ERC721_POINTER"
  | "CREATE_NATIVE_POINTER"

export type Association = {
  block_height: number
  evm_hash: string
  id: number
  sei_hash: string
  timestamp: string
  tx_hash: string
  type: AddressMappingType
}

export type NativeEvent = {
  block_height: number
  id?: number
  source: string
  tx_msg_index?: number | null
  type: string
  tx_id: number
  attributes: Array<{
    block_height: number
    composite_key: string
    event_id: number
    index: number
    key: string
    value: string
    tx_id: number
  }>
}

export type NativeMessageEvent = {
  block_height: number
  id: number
  tx_id: number
  tx_msg_index: number
  type: string
  source: string
  attributes: Array<{
    block_height: number
    composite_key: string
    event_id: number
    index: number
    key: string
    tx_id: number
    value: string
  }>
}

export type NativeMessage = {
  content: {
    msg?: string
    "@type": string
    funds?: Array<any>
    sender?: string
    contract?: string
    feeder?: string
    validator?: string
    exchange_rates?: string
  } & { [K in string]: string }
  id: number
  events: Array<NativeMessageEvent>
  index: number
  parent_id: any
  sender: string
  tx_id: number
  type: string
  sender_stats?: {
    address: string
    sc_id?: string | null
    sc_name?: string | null
  }
}

type BaseTransaction = {
  __transactionType: OSType
  to: AddressParam | null
  created_contract: AddressParam | null
  hash: string
  result: string
  confirmations: number
  status: StatusTagType | null
  block: number | null
  timestamp: string | null
  confirmation_duration: Array<number>
  from: AddressParam
  value: string
  fee: Fee | null
  gas_price: string
  type: number | null
  gas_used: string | null
  gas_limit: string
  max_fee_per_gas: string | null
  max_priority_fee_per_gas: string | null
  priority_fee: string | null
  base_fee_per_gas: string | null
  tx_burnt_fee: string | null
  nonce: number
  position: number | null
  revert_reason: TransactionRevertReason | null
  raw_input: string
  decoded_input: DecodedInput | null
  token_transfers: Array<TokenTransfer> | null
  token_transfers_overflow: boolean | null
  exchange_rate: string | null
  method: string | null
  tx_types: Array<TransactionType>
  // tx_tag: string | null;
  // has_error_in_internal_txs: boolean | null;
  // actions: Array<TxAction>;
  association?: Association | undefined | null
  memo: string
}

export type Transaction<T extends OSType = "EVM"> = T extends "EVM"
  ? {
      __transactionType: OSType
    } & BaseTransaction
  : T extends "Cosmos"
    ? {
        signers: string[]
        __transactionType: "Cosmos" extends OSType ? "Cosmos" : never
        native_events: Array<NativeEvent> | null
        native_messages: Array<NativeMessage> | null
      } & BaseTransaction
    : BaseTransaction

export type TransactionsResponse =
  | TransactionsResponseValidated
  | TransactionsResponsePending

export interface TransactionsResponseValidated {
  items: Array<Transaction>
  next_page_params: {
    block_number: number
    index: number
    items_count: number
    filter: "validated"
  } | null
}

export interface TransactionsResponsePending {
  items: Array<Transaction>
  next_page_params: {
    inserted_at: string
    hash: string
    filter: "pending"
  } | null
}

export interface TransactionsResponseWatchlist {
  items: Array<Transaction>
  next_page_params: {
    block_number: number
    index: number
    items_count: 50
  } | null
}

export type TransactionType =
  | "rootstock_remasc"
  | "rootstock_bridge"
  | "token_transfer"
  | "contract_creation"
  | "contract_call"
  | "token_creation"
  | "coin_transfer"
  | "token_burning"
  | "token_minting"
  | "mint"
  | "token_spawning"
  | "transfer"
  | "transfer_nft"
  | "MsgAggregateExchangeRateVote"
  | "MsgTransfer"
  | "MsgUpdateClient"
  | "burn"

export type TxsResponse =
  | TransactionsResponseValidated
  | TransactionsResponsePending
  | BlockTransactionsResponse
