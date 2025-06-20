import type { QueryKey, UseQueryOptions } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { chainKey } from "configs/frontend/chain/utils"
import { rawFetch } from "lib/hooks/useFetch"
import type { PathReturnType, PathValueType, ThreePartPath } from "./types"
import type { ICosmos } from "./useCosmosQueryClient"

export const getCosmosExposeKey = <
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

export const useCosmosExposeQuery = <
  S extends Record<string, Record<string, any>> = ICosmos,
  P extends string = ThreePartPath<S, keyof S>,
  A extends object = Awaited<PathReturnType<S, P>>,
  M extends keyof A | undefined = undefined,
  R = M extends keyof A ? A[M] : A,
>(
  path: P,
  value: Truthy<Parameters<PathValueType<S, P>>[0]>,
  specifyOrOptions?:
    | M
    | Omit<UseQueryOptions<A, Error, A, QueryKey>, "queryKey" | "queryFn">,
  options?: Omit<
    UseQueryOptions<R, Error, R, QueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<R, Error, R, QueryKey>({
    ...((typeof options === "object" && options) ||
      (typeof specifyOrOptions === "object" && specifyOrOptions) ||
      ({} as object)),
    // @ts-ignore
    queryKey: getCosmosExposeKey(path, value) as never,
    queryFn: async ({ signal }) => {
      return rawFetch<any, any>(
        `/api/expose/${chainKey}/forward-lcd?chain=${chainKey}`,
        {
          method: "POST",
          body: {
            path: `cosmos.${path}`,
            params: value,
          } as never,
        },
        {
          signal: signal,
        },
      ).then((data) => {
        if (typeof specifyOrOptions === "string")
          return data?.[specifyOrOptions]
        return data
      })
    },
  })
}
