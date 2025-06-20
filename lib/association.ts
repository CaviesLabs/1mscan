import type {
  TokenInfo,
  TokenType,
  TokenTypeWithTransfer,
} from "types/api/token"

export enum AssociationTypeEnum {
  Pointer = "Pointer",
  Original = "Original",
}

export type AssociationTokenData = {
  self: AssociationTypeEnum
  associationType: AssociationTypeEnum
  associationAddress: string
  associationTokenType: TokenType
}

export const getAssociationTokenData = (
  token: TokenInfo | undefined,
): AssociationTokenData | undefined => {
  if (!token) return undefined
  const tokenType = token.type
  const association = token.association
  if (!tokenType || tokenType === "ERC-404" || !association) return undefined
  if (
    !association.type.startsWith("CREATE_") ||
    !association.type.endsWith("_POINTER")
  ) {
    return undefined
  }

  if (association.type === "CREATE_NATIVE_POINTER") {
    const isCurrentERC20Pointer = tokenType === "ERC-20"

    const seiFirstPart = association.sei_hash?.split("/")[0]

    return {
      self: isCurrentERC20Pointer
        ? AssociationTypeEnum.Pointer
        : AssociationTypeEnum.Original,
      associationType: isCurrentERC20Pointer
        ? AssociationTypeEnum.Original
        : AssociationTypeEnum.Pointer,
      associationAddress: isCurrentERC20Pointer
        ? association?.sei_hash
        : association?.evm_hash,
      associationTokenType: (isCurrentERC20Pointer
        ? seiFirstPart === "ibc"
          ? "ICS-20"
          : "NATIVE"
        : "ERC-20") as TokenType,
    }
  }

  const associationType = association.type
    .replace("CREATE_", "")
    .replace("_POINTER", "")

  const associationID = associationType.replace("CW", "").replace("ERC", "")
  const selfCat = (tokenType.substring(0, 2) === "ER" && "ERC") || "CW"
  const associationCat =
    (associationType.substring(0, 2) === "ER" && "ERC") || "CW"
  const same = selfCat === associationCat

  return {
    self: same ? AssociationTypeEnum.Pointer : AssociationTypeEnum.Original,
    associationType: same
      ? AssociationTypeEnum.Original
      : AssociationTypeEnum.Pointer,
    associationAddress:
      selfCat === "ERC" ? association.sei_hash : association.evm_hash,
    associationTokenType:
      `${selfCat === "ERC" ? "CW" : "ERC"}-${associationID}` as TokenType,
  }
}

export const isAssociationHasContract = (
  tokenType: TokenTypeWithTransfer | undefined | null,
) => {
  if (!tokenType) return false
  if (tokenType.slice(0, 3).toLowerCase() === "erc") return true
  if (tokenType.slice(0, 2).toLowerCase() === "cw") return true
  return false
}
