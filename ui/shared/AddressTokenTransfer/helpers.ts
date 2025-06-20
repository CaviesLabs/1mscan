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
    case "transfer_nft":
      return "Transfer NFT"
    case "coin_transfer":
      return "Native coin transfer"
  }
}

export const getTokenTransferTypeTextV2 = (type: TokenTransfer["type"]) => {
  let result = type.split("_")
  result = result.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  })
  return result.join(" ")
}
