import type {
  IApprovalAsset,
  TokenCounters,
  TokenHolder,
  TokenInfo,
  TokenInstance,
  TokenTypeWithTransfer,
} from "types/api/token"
import type {
  TokenTransfer,
  TokenTransferPagination,
  TokenTransferResponse,
} from "types/api/tokenTransfer"

import type { Address } from "types/api/address"
import { ADDRESS_HASH, ADDRESS_HASH_SEI, ADDRESS_PARAMS } from "./addressParams"
import { DEFAULT_DATE } from "./base"
import { ADDRESS_ASSOCIATION } from "./transaction"
import { TX_HASH } from "./tx"
import { generateListStub } from "./utils"

export const TOKEN_INFO_BASE = {
  decimals: "0",
  holders: "0",
  name: "Untitled token",
  symbol: "N/A",
  total_supply: "0",
  icon_url: null,
} satisfies Partial<TokenInfo>

export const TOKEN_INFO_ERC_20: TokenInfo<"ERC-20"> = {
  ...TOKEN_INFO_BASE,
  address: ADDRESS_HASH,
  type: "ERC-20",
  association: ADDRESS_ASSOCIATION,
}

export const TOKEN_INFO_ERC_404: TokenInfo<"ERC-404"> = {
  ...TOKEN_INFO_BASE,
  address: ADDRESS_HASH,
  type: "ERC-404",
}

export const TOKEN_INFO_CW_20: TokenInfo<"CW-20"> = {
  ...TOKEN_INFO_BASE,
  address: ADDRESS_HASH_SEI,
  type: "CW-20",
}

export const TOKEN_INFO_ERC_721: TokenInfo<"ERC-721"> = {
  ...TOKEN_INFO_BASE,
  address: ADDRESS_HASH,
  type: "ERC-721",
}

export const TOKEN_INFO_ERC_1155: TokenInfo<"ERC-1155"> = {
  ...TOKEN_INFO_BASE,
  address: ADDRESS_HASH,
  type: "ERC-1155",
}

export const TOKEN_INFO_ICS_20: TokenInfo<"ICS-20"> = {
  ...TOKEN_INFO_BASE,
  address:
    "ibc/000000000000000000000000000000000000000000000000000000000000000",
  decimals: "6",
  type: "ICS-20",
}

export const TOKEN_INFO_NATIVE: TokenInfo<"NATIVE"> = {
  ...TOKEN_INFO_BASE,
  address: "usei",
  decimals: "6",
  type: "NATIVE",
}

export const TOKEN_COUNTERS: TokenCounters = {
  token_holders_count: "123456",
  transfers_count: "123456",
}

export const TOKEN_HOLDER_ERC_20: TokenHolder = {
  address: ADDRESS_PARAMS,
  // token: TOKEN_INFO_ERC_20,
  value: "0",
}

export const TOKEN_HOLDER_ERC_1155: TokenHolder = {
  address: ADDRESS_PARAMS,
  // token: TOKEN_INFO_ERC_1155,
  token_id: "0",
  value: "0",
}

export const TOKEN_TRANSFER_ERC_20: TokenTransfer = {
  // block_hash: BLOCK_HASH,
  from: ADDRESS_PARAMS,
  log_index: "4",
  method: "addLiquidity",
  timestamp: "",
  to: ADDRESS_PARAMS,
  token: TOKEN_INFO_ERC_20,
  total: {
    decimals: "18",
    value: "1000000",
  },
  tx_hash: TX_HASH,
  type: "token_minting",
}

export const TOKEN_TRANSFER_CW_20: TokenTransfer = {
  // block_hash: BLOCK_HASH,
  from: ADDRESS_PARAMS,
  log_index: "1",
  method: "coin_transfer",
  timestamp: "",
  to: ADDRESS_PARAMS,
  token: TOKEN_INFO_CW_20,
  total: {
    decimals: "6",
    value: "1000000",
  },
  tx_hash: TX_HASH,
  type: "token_minting",
}

export const TOKEN_TRANSFER_ERC_721: TokenTransfer<"ERC-721"> = {
  ...TOKEN_TRANSFER_ERC_20,
  total: {
    token_id: "35870",
    instance: null,
  },
  token: TOKEN_INFO_ERC_721,
}

export const TOKEN_TRANSFER_ERC_1155: TokenTransfer<"ERC-1155"> = {
  ...TOKEN_TRANSFER_ERC_20,
  total: {
    token_id: "35870",
    value: "123",
    decimals: "18",
    instance: null,
  },
  token: TOKEN_INFO_ERC_1155,
}

export const TOKEN_TRANSFER_ERC_404: TokenTransfer<"ERC-404"> = {
  ...TOKEN_TRANSFER_ERC_721,
  ...TOKEN_TRANSFER_ERC_20,
  total: {
    token_id: "111",
    value: "123",
    decimals: "18",
    instance: null,
  },
  token: TOKEN_INFO_ERC_404,
}

export const TOKEN_TRANSFER_ICS_20: TokenTransfer<"ICS-20"> = {
  ...TOKEN_TRANSFER_ERC_20,
  total: {
    value: "150000",
    decimals: "6",
    denom: "ibc/aaaa000000",
  },
  token: TOKEN_INFO_ICS_20,
  method: "MsgUpdateClient",
  type: "MsgUpdateClient",
}

export const TOKEN_TRANSFER_NATIVE: TokenTransfer<"NATIVE"> = {
  ...TOKEN_TRANSFER_ERC_20,
  total: {
    value: "150000",
    decimals: "6",
    denom: "factory/aaaa000000",
  },
  token: TOKEN_INFO_NATIVE,
  method: "MsgUpdateClient",
  type: "MsgUpdateClient",
}

export const getTokenTransfersStub = (
  type?: TokenTypeWithTransfer,
  pagination: TokenTransferPagination | null = null,
): TokenTransferResponse => {
  switch (type) {
    case "ERC-721":
      return generateListStub<"token_transfers">(TOKEN_TRANSFER_ERC_721, 20, {
        next_page_params: pagination,
      })
    case "ERC-1155":
      return generateListStub<"token_transfers">(TOKEN_TRANSFER_ERC_1155, 20, {
        next_page_params: pagination,
      })
    case "ERC-404":
      return generateListStub<"token_transfers">(TOKEN_TRANSFER_ERC_404, 20, {
        next_page_params: pagination,
      })
    default:
      return generateListStub<"token_transfers">(TOKEN_TRANSFER_ERC_20, 20, {
        next_page_params: pagination,
      })
  }
}

export const TOKEN_INSTANCE: TokenInstance = {
  animation_url: null,
  id: "999999999999999999999999999999999999999999999999999999999999",
  image_url: "https://ipfs.vipsland.com/nft/collections/genesis/188882.gif",
  is_unique: true,
  metadata: {
    attributes: Array(3).fill({
      trait_type: "skin tone",
      value: "very light skin tone",
    }),
    description:
      "**GENESIS #188882**, **8a77ca1bcaa4036f** :: *844th* generation of *#57806 and #57809* :: **eGenetic Hash Code (eDNA)** = *2822355e953a462d*",
    external_url: "https://vipsland.com/nft/collections/genesis/188882",
    image: "https://ipfs.vipsland.com/nft/collections/genesis/188882.gif",
    name: 'GENESIS #188882, 8a77ca1bcaa4036f. Blockchain pixel PFP NFT + "on music video" trait inspired by God',
  },
  owner: ADDRESS_PARAMS,
  token: TOKEN_INFO_ERC_1155,
}

export const APPROVAL_ASSET: IApprovalAsset = {
  token: TOKEN_INFO_ERC_20,
  token_id: null,
  balance: "0",
  approved_amount: "0",
  approved_amount_reality: null,
  spender: {
    hash: ADDRESS_HASH,
    name: "Placeholder",
  } as Address,
  is_unlimited_approved: false,
  is_verified_contract: true,
  approved_at: DEFAULT_DATE,
  fiat_balance: "0",
  fiat_risk_value: "0",
}
