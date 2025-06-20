import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import type { PathReturnType, PathValueType, ThreePartPath } from "./types"
import { getCosmosQueryKey } from "./useCosmosQuery"
import {
  type ISeiprotocol,
  useSeiprotocolQueryClient,
} from "./useSeiprotocolQueryClient"

type ISeiprotocolParams<
  P extends ThreePartPath<ISeiprotocol, keyof ISeiprotocol>,
> = Awaited<PathReturnType<ISeiprotocol, P>>

type ISeiprotocolQueryOptions<
  P extends ThreePartPath<ISeiprotocol, keyof ISeiprotocol>,
> = Omit<UseQueryOptions<ISeiprotocolParams<P>, Error>, "queryKey" | "queryFn">

export const useSeiprotocolQuery = <
  P extends ThreePartPath<ISeiprotocol, keyof ISeiprotocol>,
  // A extends ISeiprotocolParams<P>,
  M extends
    | ISeiprotocolQueryOptions<P>
    | keyof ISeiprotocolParams<P>
    | undefined
    | never,
  R = M extends keyof ISeiprotocolParams<P>
    ? ISeiprotocolParams<P>[M]
    : ISeiprotocolParams<P>,
>(
  path: P,
  value: Truthy<Parameters<PathValueType<ISeiprotocol, P>>[0]>,
  specifyOrOptions?: M,
  options?: ISeiprotocolQueryOptions<P>,
) => {
  const { query } = useSeiprotocolQueryClient()

  const queryKey = useMemo(() => getCosmosQueryKey(path, value), [path, value])

  // @ts-ignore
  return useQuery<unknown, Error, unknown, [string, ...string[]]>({
    ...((typeof options === "object" && (options as never)) ||
      (typeof specifyOrOptions === "object" && specifyOrOptions) ||
      ({} as object)),
    // @ts-ignore
    queryKey: queryKey as any,
    queryFn: async () => {
      return query(path, value as never).then((data) => {
        if (typeof specifyOrOptions === "string")
          return data[specifyOrOptions as never]
        return data
      })
    },
  }) as unknown as UseQueryResult<R, Error>
}
