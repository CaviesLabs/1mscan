/* eslint-disable @tanstack/query/exhaustive-deps */
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { getResourceKey } from "./getResourceKey"
import type { IResourceError, IResourceName, IResponse } from "./resources"
import type { Params as ApiFetchParams } from "./useApiFetch"
import useApiFetch from "./useApiFetch"

export interface Params<R extends IResourceName, I = IResponse<R>, O = I>
  extends ApiFetchParams<R> {
  queryOptions?: Omit<
    UseQueryOptions<I, IResourceError, O, [string, ...string[]]>,
    "queryKey" | "queryFn"
  >
  noMixing?: boolean
  onStart?: AnyFunction
  onSuccess?: (data?: I) => void
  onError?: (error: Error) => void
  onFinally?: AnyFunction
  page?: number
}

export default function useApiQuery<
  R extends IResourceName,
  I extends IResponse<R> = IResponse<R>,
  O = I,
>(
  resource: R,
  {
    queryOptions,
    pathParams,
    queryParams,
    body,
    fetchParams,
    configs,
    page,
    method,
    noMixing,
    onFinally,
    onStart,
    onSuccess,
    onError,
  }: Params<R, I, O> = {},
) {
  const fetch = useApiFetch()
  const queryKey = useMemo(
    () =>
      getResourceKey(resource, {
        pathParams,
        queryParams,
        body,
        noMixing,
        page,
        method,
      }),
    [resource, pathParams, queryParams, body, noMixing, page, method],
  )

  // @ts-ignore
  const query = useQuery<unknown, undefined, unknown>({
    queryKey: queryKey,
    queryFn: async ({ signal }) => {
      onStart?.()
      // all errors and error typing is handled by react-query
      // so error response will never go to the data
      // that's why we are safe here to do type conversion "as Promise<T>"
      // @ts-ignore
      return fetch(resource, {
        pathParams,
        queryParams,
        body,
        method,
        fetchParams,
        configs: { signal, ...configs },
      } as never)
        .then((success) => {
          return onSuccess?.(success as never) ?? success
        })
        .catch((error) => {
          return onError?.(error as never) || Promise.reject(error)
        })
        .finally(onFinally) as never
    },
    staleTime: 1000 * 60 * 3, // 3 minutes
    ...(queryOptions as object),
    // placeholderData: (previousData: any) => {
    //   return previousData || queryOptions?.placeholderData;
    // },
    // enabled: freezeContext?.isFreeze ? false : (queryOptions?.enabled as any),
  })

  return query as UseQueryResult<O, IResourceError>
}
