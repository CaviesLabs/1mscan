import type { combinedSortType } from "ui/shared/sort/utils"
import { getSortOptions } from "ui/shared/sort/utils"

const SortFields = ["transfer-counts", "quantity"] as const

export type ICombinedSortType = combinedSortType<typeof SortFields>

export const SORT_OPTIONS = getSortOptions(SortFields)

export type IForm = {
  search: string
  sort: ICombinedSortType | undefined
}
