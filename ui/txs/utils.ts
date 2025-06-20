import type { TagProps } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import type { TransactionType } from "types/api/transaction"
import type { combinedSortType } from "ui/shared/sort/utils"
import { getSortOptions } from "ui/shared/sort/utils"

const SortFields = ["value", "fee"] as const

export type ICombinedSortType = combinedSortType<typeof SortFields>
export type ICombinedSortApi = combinedSortType<typeof SortFields>

export const SORT_OPTIONS = getSortOptions(SortFields)

export const extractTransactionType = (
  txType: TransactionType,
):
  | {
      label: string
      colorScheme: TagProps["colorScheme"]
    }
  | undefined => {
  if (txType === "contract_call") {
    return {
      label: getLanguage(
        "transactions_page.type_and_method_values.contract_call",
      ),
      colorScheme: "blue",
    }
  }
  if (txType === "token_transfer" || txType === "transfer") {
    return {
      label: getLanguage(
        "transactions_page.type_and_method_values.token_transfer",
      ),
      colorScheme: "orange",
    }
  }
  if (txType === "coin_transfer") {
    return {
      label: getLanguage(
        "transactions_page.type_and_method_values.coin_transfer",
      ),
      colorScheme: "orange",
    }
  }
  if (txType === "token_creation") {
    return {
      label: getLanguage(
        "transactions_page.type_and_method_values.token_creation",
      ),
      colorScheme: "blue",
    }
  }
  if (txType === "contract_creation") {
    return {
      label: getLanguage(
        "transactions_page.type_and_method_values.contract_creation",
      ),
      colorScheme: "blue",
    }
  }

  if (txType === "mint" || txType === "token_minting") {
    return {
      label: getLanguage(
        "transactions_page.type_and_method_values.token_minting",
      ),
      colorScheme: "orange",
    }
  }
  if (txType === "burn" || txType === "token_burning") {
    return {
      label: getLanguage(
        "transactions_page.type_and_method_values.token_burning",
      ),
      colorScheme: "orange",
    }
  }
  return {
    label: getLanguage("transactions_page.type_and_method_values.transaction"),
    colorScheme: "purple",
  }
}
