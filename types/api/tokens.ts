import type { TokenInfo } from "./token"
import type { TokenTransfer } from "./tokenTransfer"

export type TokensResponse = {
  items: Array<TokenInfo>
  next_page_params: {
    holder_count: number
    items_count: number
    name: string
    market_cap: string | null
  } | null
}

export type PointerResponse = {
  pointer: string
  version: number
  type: string
}

export interface TokenInstanceTransferResponse {
  items: Array<TokenTransfer>
  next_page_params: TokenInstanceTransferPagination | null
}

export interface TokenInstanceTransferPagination {
  block_number: number
  index: number
  items_count: number
  token_id: string
}
