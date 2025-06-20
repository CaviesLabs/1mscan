import type { TokenTransfer } from "types/api/tokenTransfer"

export const getTokenTransferTypeText = (type: TokenTransfer["type"]) => {
  switch (type) {
    case "token_minting":
    case "mint":
      return "Token minting"
    case "token_burning":
      return "Token burning"
    case "token_spawning":
      return "Token creating"
    case "token_transfer":
    case "transfer":
      return "Token transfer"
  }
}
