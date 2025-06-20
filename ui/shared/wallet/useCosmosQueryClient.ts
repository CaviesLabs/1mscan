import type { ExtendedHttpEndpoint } from "@cosmos-kit/core"
import { getQueryClient } from "@sei-js/cosmjs"
import type { cosmos } from "@sei-js/proto"
import { get } from "lodash"
import { useCallback, useMemo } from "react"
import type { PathReturnType, PathValueType, ThreePartPath } from "./types"
import { type IUseCurrentChain, useCosmosChain } from "./useCosmosChain"

type CreateLCDClient = (typeof cosmos)["ClientFactory"]["createLCDClient"]
export type ICosmos = Awaited<ReturnType<CreateLCDClient>>["cosmos"]

export type UseCosmosQueryReturnType<
  S extends Record<string, Record<string, any>> = ICosmos,
  P extends string = ThreePartPath<S, keyof S>,
> = Promise<Awaited<PathReturnType<S, P>>>

export type UseCosmosQuery = <
  S extends Record<string, Record<string, any>> = ICosmos,
  P extends string = ThreePartPath<S, keyof S>,
>(
  path: P,
  value: Truthy<Parameters<PathValueType<S, P>>[0]>,
) => UseCosmosQueryReturnType<S, P>

export type UseCosmosQueryClientReturnType = IUseCurrentChain & {
  query: UseCosmosQuery
}

export const useCosmosQueryClient = () => {
  const cosmosChain = useCosmosChain()

  const query = useCallback<UseCosmosQuery>(
    async (path, value) => {
      const restEndpoint = await cosmosChain?.getRestEndpoint()

      // get RPC client
      const client = await getQueryClient(
        typeof restEndpoint === "string"
          ? restEndpoint
          : (restEndpoint as ExtendedHttpEndpoint).url,
      )

      const method = get(client.cosmos, path) as any
      return method(value)
    },
    [cosmosChain],
  )

  return useMemo(() => {
    Reflect.set(cosmosChain, "query", query)
    return cosmosChain as unknown as UseCosmosQueryClientReturnType
  }, [cosmosChain, query])
}
