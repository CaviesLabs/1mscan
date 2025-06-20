import type { ExtendedHttpEndpoint } from "@cosmos-kit/core"
import { getQueryClient } from "@sei-js/cosmjs"
import type { seiprotocol } from "@sei-js/proto"
import { get } from "lodash"
import { useCallback, useMemo } from "react"
import type { PathReturnType, PathValueType, ThreePartPath } from "./types"
import { type IUseCurrentChain, useCosmosChain } from "./useCosmosChain"

type CreateLCDClient = (typeof seiprotocol)["ClientFactory"]["createLCDClient"]
export type ISeiprotocol = Awaited<ReturnType<CreateLCDClient>>["seiprotocol"]

export type UseSeiprotocolQueryReturnType<
  S extends Record<string, Record<string, any>> = ISeiprotocol,
  P extends string = ThreePartPath<S, keyof S>,
> = Promise<Awaited<PathReturnType<S, P>>>

export type UseSeiprotocolQuery = <
  S extends Record<string, Record<string, any>> = ISeiprotocol,
  P extends string = ThreePartPath<S, keyof S>,
>(
  path: P,
  value: Truthy<Parameters<PathValueType<S, P>>[0]>,
) => UseSeiprotocolQueryReturnType<S, P>

export type UseSeiprotocolQueryClientReturnType = IUseCurrentChain & {
  query: UseSeiprotocolQuery
}

export const useSeiprotocolQueryClient = () => {
  const cosmosChain = useCosmosChain()

  const query = useCallback<UseSeiprotocolQuery>(
    async (path, value) => {
      const restEndpoint = await cosmosChain?.getRestEndpoint()

      // get RPC client
      const client = await getQueryClient(
        typeof restEndpoint === "string"
          ? restEndpoint
          : (restEndpoint as ExtendedHttpEndpoint).url,
      )

      const method = get(client.seiprotocol, path) as any
      return method(value)
    },
    [cosmosChain],
  )

  return useMemo(() => {
    Reflect.set(cosmosChain, "query", query)
    return cosmosChain as unknown as UseSeiprotocolQueryClientReturnType
  }, [cosmosChain, query])
}
