import type {
  Address,
  AddressCoinBalanceHistoryItem,
  AddressCollection,
  AddressCounters,
  AddressNFT,
  AddressTabsCounters,
  AddressTokenBalance,
} from "types/api/address"
import type { AddressesItem } from "types/api/addresses"

import { ADDRESS_HASH } from "./addressParams"
import {
  TOKEN_INFO_CW_20,
  TOKEN_INFO_ERC_20,
  TOKEN_INFO_ERC_721,
  TOKEN_INFO_ERC_1155,
  TOKEN_INSTANCE,
} from "./token"
import { TX_HASH } from "./tx"

export const ADDRESS_INFO: Address = {
  block_number_balance_updated_at: null,
  coin_balance: "100000",
  creation_tx_hash: null,
  creator_address_hash: ADDRESS_HASH,
  exchange_rate: null,
  has_custom_methods_read: false,
  has_custom_methods_write: false,
  has_decompiled_code: false,
  has_logs: true,
  has_methods_read: false,
  has_methods_read_proxy: false,
  has_methods_write: false,
  has_methods_write_proxy: false,
  hash: ADDRESS_HASH,
  implementations: null,
  is_contract: false,
  is_verified: false,
  name: "Placeholder",
  token: TOKEN_INFO_ERC_20,
}

export const ADDRESS_COUNTERS: AddressCounters = {
  gas_usage_count: "0",
  token_transfers_count: "0",
  transactions_count: "0",
  validations_count: "0",
}

export const ADDRESS_TABS_COUNTERS: AddressTabsCounters = {
  internal_txs_count: 0,
  logs_count: 0,
  token_balances_count: 0,
  token_transfers_count: 0,
  transactions_count: 0,
  validations_count: 0,
  withdrawals_count: 0,
}

export const TOP_ADDRESS: AddressesItem = {
  coin_balance: "11886682377162664596540805",
  tx_count: "1835",
  hash: "0x4f7A67464B5976d7547c860109e4432d50AfB38e",
  implementations: null,
  is_contract: false,
  is_verified: null,
  name: null,
}

export const ADDRESS_COIN_BALANCE: AddressCoinBalanceHistoryItem = {
  block_number: 9004413,
  block_timestamp: "2023-05-15T13:16:24Z",
  delta: "1000000000000000000",
  transaction_hash: TX_HASH,
  value: "953427250000000000000000",
}

export const ADDRESS_TOKEN_BALANCE_ERC_20: AddressTokenBalance = {
  token: TOKEN_INFO_ERC_20,
  value: "1000000000000000000000000",
  token_id: "1",
}

export const ADDRESS_TOKEN_BALANCE_CW_20: AddressTokenBalance = {
  token: TOKEN_INFO_CW_20,
  value: "1000000000000000000000000",
  token_id: "1",
}

export const ADDRESS_NFT_721: AddressNFT = {
  token_type: "ERC-721",
  value: "1",
  ...TOKEN_INSTANCE,
  token: TOKEN_INFO_ERC_721,
}

export const ADDRESS_NFT_1155: AddressNFT = {
  token_type: "ERC-1155",
  value: "10",
  ...TOKEN_INSTANCE,
  token: TOKEN_INFO_ERC_1155,
}

export const ADDRESS_COLLECTION: AddressCollection = {
  token: TOKEN_INFO_ERC_1155,
  amount: "4",
  token_instances: Array(4).fill(TOKEN_INSTANCE),
}
