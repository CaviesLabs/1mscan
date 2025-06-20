import type { Channel } from "phoenix"

import type {
  AddressCoinBalanceHistoryItem,
  AddressTokensBalancesSocketMessage,
} from "types/api/address"
import type { NewBlockSocketResponse } from "types/api/block"
import type { SmartContractVerificationResponse } from "types/api/contract"
import type { TokenTransfer } from "types/api/tokenTransfer"
import type { Transaction } from "types/api/transaction"

export type SocketMessageParams =
  | SocketMessage.NewBlock
  | SocketMessage.BlocksIndexStatus
  | SocketMessage.InternalTxsIndexStatus
  | SocketMessage.TxStatusUpdate
  // | SocketMessage.TxRawTrace
  | SocketMessage.NewTx
  | SocketMessage.NewPendingTx
  | SocketMessage.NewDeposits
  | SocketMessage.AddressBalance
  | SocketMessage.AddressCurrentCoinBalance
  | SocketMessage.AddressTokenBalance
  | SocketMessage.AddressTokenBalancesErc20
  | SocketMessage.AddressTokenBalancesErc721
  | SocketMessage.AddressTokenBalancesErc1155
  | SocketMessage.AddressCoinBalance
  | SocketMessage.AddressTxs
  | SocketMessage.AddressTxsPending
  | SocketMessage.AddressTokenTransfer
  | SocketMessage.AddressChangedBytecode
  | SocketMessage.SmartContractWasVerified
  | SocketMessage.TokenTransfers
  | SocketMessage.TokenTotalSupply
  | SocketMessage.ContractVerification
  | SocketMessage.Unknown

interface SocketMessageParamsGeneric<
  Event extends string | undefined,
  Payload extends object | unknown,
> {
  channel: Channel | undefined
  event: Event
  handler: (payload: Payload) => void
}

export namespace SocketMessage {
  export type NewBlock = SocketMessageParamsGeneric<
    "new_block",
    NewBlockSocketResponse
  >
  export type BlocksIndexStatus = SocketMessageParamsGeneric<
    "block_index_status",
    { finished: boolean; ratio: string }
  >
  export type InternalTxsIndexStatus = SocketMessageParamsGeneric<
    "internal_txs_index_status",
    { finished: boolean; ratio: string }
  >
  export type TxStatusUpdate = SocketMessageParamsGeneric<
    "collated",
    NewBlockSocketResponse
  >
  // export type TxRawTrace = SocketMessageParamsGeneric<
  //   "raw_trace",
  //   RawTracesResponse
  // >;
  export type NewTx = SocketMessageParamsGeneric<
    "transaction",
    { transaction: number }
  >
  export type NewPendingTx = SocketMessageParamsGeneric<
    "pending_transaction",
    { pending_transaction: number }
  >
  export type NewDeposits = SocketMessageParamsGeneric<
    "deposits",
    { deposits: number }
  >
  export type AddressBalance = SocketMessageParamsGeneric<
    "balance",
    { balance: string; block_number: number; exchange_rate: string }
  >
  export type AddressCurrentCoinBalance = SocketMessageParamsGeneric<
    "current_coin_balance",
    { coin_balance: string; block_number: number; exchange_rate: string }
  >
  export type AddressTokenBalance = SocketMessageParamsGeneric<
    "token_balance",
    { block_number: number }
  >
  export type AddressTokenBalancesErc20 = SocketMessageParamsGeneric<
    "updated_token_balances_erc_20",
    AddressTokensBalancesSocketMessage
  >
  export type AddressTokenBalancesErc721 = SocketMessageParamsGeneric<
    "updated_token_balances_erc_721",
    AddressTokensBalancesSocketMessage
  >
  export type AddressTokenBalancesErc1155 = SocketMessageParamsGeneric<
    "updated_token_balances_erc_1155",
    AddressTokensBalancesSocketMessage
  >
  export type AddressCoinBalance = SocketMessageParamsGeneric<
    "coin_balance",
    { coin_balance: AddressCoinBalanceHistoryItem }
  >
  export type AddressTxs = SocketMessageParamsGeneric<
    "transaction",
    { transactions: Array<Transaction> }
  >
  export type AddressTxsPending = SocketMessageParamsGeneric<
    "pending_transaction",
    { transactions: Array<Transaction> }
  >
  export type AddressTokenTransfer = SocketMessageParamsGeneric<
    "token_transfer",
    { token_transfers: Array<TokenTransfer> }
  >
  export type AddressChangedBytecode = SocketMessageParamsGeneric<
    "changed_bytecode",
    Record<string, never>
  >
  export type SmartContractWasVerified = SocketMessageParamsGeneric<
    "smart_contract_was_verified",
    Record<string, never>
  >
  export type TokenTransfers = SocketMessageParamsGeneric<
    "token_transfer",
    { token_transfer: number }
  >
  export type TokenTotalSupply = SocketMessageParamsGeneric<
    "total_supply",
    { total_supply: number }
  >
  export type ContractVerification = SocketMessageParamsGeneric<
    "verification_result",
    SmartContractVerificationResponse
  >

  export type Unknown = SocketMessageParamsGeneric<undefined, unknown>
}
