import { getLanguage } from "languages/useLanguage"
import type { TokenType } from "types/api/token"

export type ISearchType =
  | "token"
  | "address"
  | "block"
  | "transaction"
  | "contract"

export type ISearchToken = {
  type: "token"
  name: string
  symbol: string
  address: string
  token_url: string
  address_url: string
  icon_url: string | null
  token_type: TokenType
  exchange_rate: string | null
  total_supply: string | null
  is_verified_via_admin_panel: boolean
  is_smart_contract_verified: boolean
}

export type ISearchAddress = {
  type: "address" | "contract"
  name: string | null
  address: string
  is_smart_contract_verified: boolean
  // url?: string; // not used by the frontend, we build the url ourselves
}

export type ISearchBlock = {
  type: "block"
  block_type?: "block" | "reorg"
  block_number: number | string
  block_hash?: string
  timestamp?: string
  description?: string
  // url?: string; // not used by the frontend, we build the url ourselves
}

export type ISearchTransaction = {
  type: "transaction"
  tx_hash: string
  timestamp: string
  // url?: string; // not used by the frontend, we build the url ourselves
}

export type ISearchItem<T extends ISearchType = ISearchType> = T extends "token"
  ? ISearchToken
  : T extends "address"
    ? ISearchAddress
    : T extends "block"
      ? ISearchBlock
      : T extends "transaction"
        ? ISearchTransaction
        : ISearchToken | ISearchAddress | ISearchBlock | ISearchTransaction

export type ISearchCategory =
  | "address"
  | "erc-20"
  | "erc-721"
  | "erc-1155"
  | "cw-20"
  | "cw-721"
  | "ics-20"
  | "native"
  | "factory"
  | "erc-404"
  | "block"
  | "transaction"

export const getItemCategory = (item: any): ISearchType | undefined => {
  if (!item.type) {
    return undefined
  }
  if (item.type === "label") {
    return undefined
  }
  if (item.type === "token") {
    return item.token_type.toLowerCase() as ISearchType
  }
  if (item.type === "contract") {
    return "address"
  }
  return item.type as ISearchType
}

export const getItemIdentifier = (item: any): string | undefined => {
  if (!item?.type) {
    return undefined
  }
  if (item.type === "token" || item.type === "address") {
    if (!item.address) {
      return undefined
    }
    return item.address.toLowerCase()
  }
  if (item.type === "block") {
    if (!item.block_number) {
      return undefined
    }
    return String(item.block_number).toLowerCase()
  }
  if (item.type === "transaction") {
    if (!item.tx_hash) {
      return undefined
    }
    return item.tx_hash.toLowerCase()
  }
  return undefined
}

export const CATEGORY_INFO = {
  "erc-20": {
    id: "erc-20",
    title: `${getLanguage("token.tokens")} (ERC-20)`,
  },
  "cw-20": {
    id: "cw-20",
    title: `${getLanguage("token.tokens")} (CW-20)`,
  },
  "ics-20": {
    id: "ics-20",
    title: getLanguage("token.ibc_tokens"),
  },
  native: {
    id: "native",
    title: getLanguage("token.native_tokens"),
  },
  "erc-721": {
    id: "erc-721",
    title: `${getLanguage("token.nfts")} (ERC-721)`,
  },
  "erc-1155": {
    id: "erc-1155",
    title: `${getLanguage("token.nfts")} (ERC-1155)`,
  },
  "cw-721": {
    id: "cw-721",
    title: `${getLanguage("token.nfts")} (CW-721)`,
  },
  "erc-404": {
    id: "erc-404",
    title: "Hybrid Tokens (ERC-404)",
  },
  address: {
    id: "address",
    title: "Addresses",
  },
  transaction: {
    id: "transaction",
    title: getLanguage("transactions_page.transactions"),
  },
  block: {
    id: "block",
    title: getLanguage("blocks_page.blocks"),
  },
} as Record<ISearchCategory, { id: ISearchCategory; title: string }>

export const CATEGORY_INFO_IDS = Object.keys(CATEGORY_INFO)
