import type { combinedSortType } from "ui/shared/sort/utils"
import { getSortOptions } from "ui/shared/sort/utils"

const SortFields = ["transaction-amount"] as const

export type ICombinedSortType = combinedSortType<typeof SortFields>

export const SORT_OPTIONS = getSortOptions(SortFields)

export type IForm = {
  sort: ICombinedSortType | undefined
}
