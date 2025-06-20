import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import type { PathReturnType, PathValueType, ThreePartPath } from "./types"
import type { ICosmos } from "./useCosmosQueryClient"
import { useCosmosQueryClient } from "./useCosmosQueryClient"

export const getCosmosQueryKey = <
  S extends Record<string, Record<string, any>> = ICosmos,
  P extends string = ThreePartPath<S, keyof S>,
>(
  path: P,
  value: Truthy<Parameters<PathValueType<S, P>>[0]>,
) => {
  return [
    ...path.split("."),
    ...Object.entries(value as object)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([key, value]) => `${key}_${JSON.stringify(value)}`),
  ] as ReadonlyArray<string>
}

type ICosmosParams<P extends ThreePartPath<ICosmos, keyof ICosmos>> = Awaited<
  PathReturnType<ICosmos, P>
>

type ICosmosQueryOptions<P extends ThreePartPath<ICosmos, keyof ICosmos>> =
  Omit<UseQueryOptions<ICosmosParams<P>, Error>, "queryKey" | "queryFn">

export const useCosmosQuery = <
  P extends ThreePartPath<ICosmos, keyof ICosmos>,
  M extends
    | ICosmosQueryOptions<P>
    | keyof ICosmosParams<P>
    | undefined
    | never = never,
  R = M extends keyof ICosmosParams<P> ? ICosmosParams<P>[M] : ICosmosParams<P>,
>(
  path: P,
  value: Truthy<Parameters<PathValueType<ICosmos, P>>[0]>,
  specifyOrOptions?: M,
  options?: ICosmosQueryOptions<P>,
) => {
  const { query } = useCosmosQueryClient()

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
