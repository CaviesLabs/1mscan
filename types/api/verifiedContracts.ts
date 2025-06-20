export interface VerifiedContractsSorting {
  sort: "balance" | "txs_count"
  order: "asc" | "desc"
}

export type VerifiedContractsSortingField = VerifiedContractsSorting["sort"]
