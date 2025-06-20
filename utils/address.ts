import { type Hex, getAddress } from "viem"

export const getAddressClause = (
  address: any,
  fallback?: Hex | undefined,
): Hex | undefined => {
  try {
    return getAddress(address) as Hex
  } catch (error) {
    console.log(error)
    return fallback
  }
}
