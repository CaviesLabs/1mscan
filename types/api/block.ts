import type { OSType } from "types/base"

import type { AddressParam } from "types/api/addressParams"
import type { Reward } from "types/api/reward"
import type { Transaction } from "types/api/transaction"
import type { ValidatorDetail } from "./validator"

export type BlockType = "block" | "reorg" | "uncle"

export interface Block {
  // __transactionType: OSType;
  is_finalized?: boolean
  base_fee_per_gas?: string | null
  burnt_fees: string | null
  burnt_fees_percentage: number | null
  // difficulty: string;
  extra_data?: string
  state_root?: string
  gas_limit: string
  gas_target_percentage: number
  gas_used: string
  gas_used_percentage: number
  hash: string
  height: number
  miner: AddressParam & {
    validator_data?: ValidatorDetail
  }
  nonce: string
  parent_hash: string
  priority_fee: number | string | null
  rewards: Reward[]
  size: number
  timestamp: string
  total_difficulty: string
  tx_count: number // total tx_count for both EVM and Native
  evmTxCount: number
  nativeTxCount: number
  tx_fees: string
  type: BlockType
  // uncles_hashes: string[];
  withdrawals_count?: number | null

  // ROOTSTOCK FIELDS
  minimum_gas_price?: string | null
}

export interface BlocksResponse {
  items: Array<Block>
  next_page_params: {
    block_number: number
    items_count: number
  } | null
}

export interface BlockTransactionsResponse {
  items: Array<Transaction>
  next_page_params: {
    block_number: number
    items_count: number
    index: number
  } | null
}

export interface NewBlockSocketResponse {
  average_block_time: string
  block: Block
}

export interface BlockFilters {
  type?: BlockType
}

export type BlockDetailFilter = {
  type: OSType
}

export type BlockWithdrawalsResponse = {
  items: Array<BlockWithdrawalsItem>
  next_page_params: {
    index: number
    items_count: number
  }
}

export type BlockWithdrawalsItem = {
  amount: string
  index: number
  receiver: AddressParam
  validator_index: number
}
