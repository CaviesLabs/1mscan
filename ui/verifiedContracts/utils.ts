// export const SORT_OPTIONS: Array<Option<VerifiedContractsSortingValue>> = [
//   { title: "Default", id: undefined },
//   { title: "Balance descending", id: "balance-desc" },
//   { title: "Balance ascending", id: "balance-asc" },
//   { title: "Txs count descending", id: "txs_count-desc" },
//   { title: "Txs count ascending", id: "txs_count-asc" },
// ];

import type { combinedSortType } from "ui/shared/sort/utils"
import { getSortOptions } from "ui/shared/sort/utils"

const SortFields = ["balance", "txs_count"] as const

export type ICombinedSortType = combinedSortType<typeof SortFields>

export const SORT_OPTIONS = getSortOptions(SortFields)

export type IForm = {
  sort: ICombinedSortType | undefined
}
