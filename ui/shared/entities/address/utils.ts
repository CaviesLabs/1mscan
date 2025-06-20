import type { Association } from "types/api/transaction"
import type { OSType } from "types/base"

export const getAssociationAddressData = (
  addressType: OSType | undefined,
  association: Association | Empty,
) => {
  if (!association || !addressType) {
    return undefined
  }

  return {
    self:
      (addressType === "EVM" && "EVM") ||
      (addressType === "Cosmos" && "Native") ||
      "",
    associatedType:
      (addressType === "EVM" && "Native") ||
      (addressType === "Cosmos" && "EVM") ||
      "",
    associatedAddress:
      (addressType === "EVM" && association?.sei_hash) ||
      (addressType === "Cosmos" && association?.evm_hash) ||
      "",
  }
}
