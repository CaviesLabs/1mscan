import type { Transaction } from "types/api/transaction"

export const TRANSACTION_HASH_REGEXP = /^0x[a-fA-F\d]{64}$/

export const TRANSACTION_HASH_LENGTH = 66

export const isMintTransaction = (transaction: Transaction): boolean => {
  return (
    transaction?.token_transfers?.length === 1 &&
    !transaction.token_transfers?.[0]?.from?.hash
  )
}
