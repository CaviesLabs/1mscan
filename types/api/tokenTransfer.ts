import type { AddressParam } from "./addressParams"
import type { TokenInfo, TokenType, TokenTypeWithTransfer } from "./token"
import type { Association, TransactionType } from "./transaction"

export type StatusTagType = "ok" | "error" | "pending"

export type TokenInstance = {
  metadata: TokenMetadata
  token_id: string
}

export type TokenMetadata = {
  description: string
  image: string
  name: string
  // instance?: TokenInstance | null;
}

export type Erc20TotalPayload = {
  decimals: string | null
  value: string | null
}

export type CW20TotalPayload = {
  decimals: string | null
  value: string | null
}

export type Erc721TotalPayload = {
  token_id: string
  instance: TokenInstance | null
}

export type Erc404TotalPayload = {
  token_id: string | null
  value: string | null
  decimals: string | null
  instance: TokenInstance | null
}

export type CW721TotalPayload = {
  token_id: string
  instance: TokenInstance | null
}

export type Erc1155TotalPayload = {
  decimals: string | null
  value: string
  token_id: string
  instance: TokenInstance | null
}

export type ICS20TotalPayload = {
  decimals: string | null
  value: string
  denom: string | null
}

export type NativeTotalPayload = {
  decimals: string | null
  value: string
  denom: string | null
}

export type CointransferTotalPayload = {
  decimals: string | null
  value: string
  denom: string
}

export type IBCTotalPayload = {
  decimals: string | null
  value: string
  denom: string | undefined
}

export type NFTTotalPayload =
  | Erc721TotalPayload
  | CW721TotalPayload
  | Erc1155TotalPayload

export type TokenTotalPayload = {
  instance?: TokenInstance | null
  denom?: string | null
  decimals: string | null
  value: string | null
  token_id?: string | null
}

export type TokenTransferERC20 = {
  token: TokenInfo<"ERC-20"> | undefined
  total: Erc20TotalPayload
} & TokenTransferBase

export type TokenTransferERC721 = {
  token: TokenInfo<"ERC-721">
  total: Erc721TotalPayload
} & TokenTransferBase

export type TokenTransferERC404 = {
  token: TokenInfo<"ERC-404">
  total: Erc404TotalPayload
} & TokenTransferBase

export type TokenTransferERC1155 = {
  token: TokenInfo<"ERC-1155">
  total: Erc1155TotalPayload
} & TokenTransferBase

export type TokenTransferCW20 = {
  token: TokenInfo<"CW-20">
  total: CW20TotalPayload
} & TokenTransferBase

export type TokenTransferCW721 = {
  token: TokenInfo<"CW-721">
  total: CW721TotalPayload
} & TokenTransferBase

export type TokenTransferICS20 = {
  token: TokenInfo<"ICS-20">
  total: ICS20TotalPayload
} & TokenTransferBase

export type TokenTransferNative = {
  token: TokenInfo<"NATIVE">
  total: NativeTotalPayload
} & TokenTransferBase

export type TokenTransferCointransfer = {
  token: TokenInfo<"coin_transfer">
  total: CointransferTotalPayload
} & TokenTransferBase

export type TokenTransferPayload = TokenTransferBase & {
  token: TokenInfo | undefined
  total: TokenTotalPayload
}

export type TokenTransfer<
  T extends TokenTypeWithTransfer | undefined = undefined,
> = T extends "ERC-20"
  ? TokenTransferERC20
  : T extends "ERC-721"
    ? TokenTransferERC721
    : T extends "ERC-1155"
      ? TokenTransferERC1155
      : T extends "ERC-404"
        ? TokenTransferERC404
        : T extends "CW-20"
          ? TokenTransferCW20
          : T extends "CW-721"
            ? TokenTransferCW721
            : T extends "coin_transfer"
              ? TokenTransferCointransfer
              : T extends "ICS-20"
                ? TokenTransferICS20
                : T extends "NATIVE"
                  ? TokenTransferNative
                  : (
                      | TokenTransferERC20
                      | TokenTransferERC721
                      | TokenTransferERC1155
                      | TokenTransferCW20
                      | TokenTransferCW721
                      | TokenTransferICS20
                      | TokenTransferNative
                      | TokenTransferERC404
                      | TokenTransferCointransfer
                    ) &
                      TokenTransferBase & {
                        token: TokenInfo | undefined
                        total: TokenTotalPayload
                      }

export type TokenTotal =
  | Erc20TotalPayload
  | Erc721TotalPayload
  | Erc1155TotalPayload

export interface TokenTransferBase {
  type: TransactionType
  tx_hash: string
  from: AddressParam
  to: AddressParam
  timestamp: string
  // block_hash: string;
  log_index: string | null
  method?: string
  status?: StatusTagType
  association?: Association
}

export type TokenTransferPagination = {
  block_number: number
  index: number
  items_count: number
}

export interface TokenTransferResponse {
  items: Array<TokenTransfer>
  next_page_params: TokenTransferPagination | null
}

export interface TokenTransferFilters {
  type: Array<TokenType>
}
