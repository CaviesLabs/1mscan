import type { IncomingMessage } from "http"
import * as cookie from "cookie"

export const getServerChain = (
  query: Record<string, any>,
  req?:
    | IncomingMessage
    | {
        headers: {
          host?: string
          cookie?: string
        }
      }
    | undefined,
) => {
  const proposeChain = (query?.chain ||
    cookie.parse(req?.headers.cookie || "")?.["chain"]) as string

  if (
    proposeChain === ChainKey.ARCTIC_1 ||
    proposeChain === ChainKey.ATLANTIC_2
  ) {
    return proposeChain
  }

  return ChainKey.PACIFIC_1
}

export enum ChainKey {
  ARCTIC_1 = "arctic-1",
  ATLANTIC_2 = "atlantic-2",
  PACIFIC_1 = "pacific-1",
}

export type IChainKey = `${ChainKey}`
