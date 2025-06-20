import type { combinedSortType } from "ui/shared/sort/utils"
import { getSortOptions } from "ui/shared/sort/utils"

export type IIBCRelayersStatus = "opened" | "closed"

const SortFields = [
  "voting_power",
  "commission",
  "participation",
  "uptime",
  "apr",
] as const

export type ICombinedSortType = combinedSortType<typeof SortFields>
export type ICombinedSortApi = combinedSortType<typeof SortFields>

export const SORT_OPTIONS = getSortOptions(SortFields)

export type IForm = {
  search: string
}
