import { ChainKey } from "configs/server/chain"

export const proposeChain = (
  queryChain: string | null | undefined,
  cookieChain: string | undefined | null,
) => {
  if (
    queryChain === ChainKey.ARCTIC_1 ||
    queryChain === ChainKey.ATLANTIC_2 ||
    queryChain === ChainKey.PACIFIC_1
  ) {
    return queryChain
  }

  if (
    cookieChain === ChainKey.ARCTIC_1 ||
    cookieChain === ChainKey.ATLANTIC_2 ||
    cookieChain === ChainKey.PACIFIC_1
  ) {
    return cookieChain
  }

  return ChainKey.PACIFIC_1
}
