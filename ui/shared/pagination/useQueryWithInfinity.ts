/* eslint-disable @tanstack/query/exhaustive-deps */
import {
  type QueryClient,
  type UseInfiniteQueryOptions,
  type UseInfiniteQueryResult,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useCallback } from "react"

// import { useTabFreezeContext } from "../Tabs/TabFreezeContextProvider";
import type { AxiosRequestConfig } from "axios"
import { getResourceKey } from "lib/api/getResourceKey"
import type {
  IPageableResourceName,
  IResourceError,
  IResourceFilter,
  IResourcePathParam,
  IResponse,
} from "lib/api/resources"
import useApiFetch from "lib/api/useApiFetch"
import { useMemo } from "react"
import type { IInfinityPagination } from "./types"

export type IInfinateResponse<R extends IPageableResourceName> =
  IResponse<R> & {
    page: number
  }

type IBetweenResponse<R extends IPageableResourceName> = {
  page: number
  metadata: IResponse<R> extends { next_page_params: infer T }
    ? (T & { count: number | undefined }) | undefined | null
    : never
}

export interface Params<R extends IPageableResourceName> {
  resourceName: R
  filters?: IResourceFilter<R>
  options?: Omit<
    UseInfiniteQueryOptions<
      IInfinateResponse<R>,
      IResourceError,
      IInfinateResponse<R>[],
      IInfinateResponse<R>,
      [string, ...string[]],
      IBetweenResponse<R>
    >,
    | "queryKey"
    | "queryFn"
    | "getNextPageParam"
    | "initialPageParam"
    | "placeholderData"
  > & {
    placeholderData?: IResponse<R>
  }
  pathParams?: IResourcePathParam<R>
  configs?: AxiosRequestConfig
}

export type QueryWithInfinateQueryResult<R extends IPageableResourceName> =
  UseInfiniteQueryResult<IInfinateResponse<R>[], IResourceError> & {
    queryClient?: QueryClient
    pagination: IInfinityPagination
  }

export default function useQueryWithInfinity<R extends IPageableResourceName>({
  filters,
  options,
  pathParams,
  resourceName,
  configs,
}: Params<R>): QueryWithInfinateQueryResult<R> {
  const queryClient = useQueryClient()

  const fetch = useApiFetch()

  const keys = useMemo(
    () =>
      getResourceKey(resourceName, {
        pathParams,
        queryParams: filters,
        isInfinite: true,
      }),
    [resourceName, pathParams, filters],
  )

  const result = useInfiniteQuery<
    Record<string, any>,
    IResourceError,
    Record<string, any>,
    [string, ...string[]],
    Record<string, any>
  >({
    queryKey: keys,
    queryFn: async ({ pageParam, signal }) => {
      const queryParams = {
        ...(pageParam.metadata || {}),
        ...filters,
      }

      const page = pageParam.page ?? 1

      const pageKeys = getResourceKey(resourceName, {
        pathParams,
        queryParams,
        page: page,
      })

      const cached = queryClient.getQueryData(pageKeys) as
        | Record<string, any>
        | undefined

      if (cached) {
        return {
          items: cached.items,
          next_page_params: cached.next_page_params || undefined,
          page: page,
          count: cached.total_count || cached.count || undefined,
        }
      }

      const data = await fetch(resourceName, {
        pathParams,
        queryParams: queryParams,
        configs: { signal, ...configs },
      }).then((data) => {
        queryClient.setQueryData(pageKeys, data)
        return data
      })

      return {
        items: (data as any)?.items || [],
        next_page_params: (data as any)?.next_page_params || undefined,
        page: page,
        count: (data as any)?.total_count || (data as any)?.count || undefined,
      }
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.next_page_params) {
        return undefined
      }
      return {
        metadata: lastPage.next_page_params || undefined,
        page: lastPage.page + 1,
      }
    },
    initialPageParam: {
      metadata: undefined,
      page: 1,
    },
    select(data) {
      return data.pages
    },

    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
    placeholderData: (previousData) => {
      if (!options?.placeholderData) {
        return {
          pages: [],
          pageParams: [],
        }
      }
      const pages = previousData?.pages || []
      const pageParams = previousData?.pageParams || []
      return {
        pages: [
          ...pages,
          {
            ...options?.placeholderData,
            page: pages.length + 1,
          },
        ],
        pageParams: [
          ...pageParams,
          {
            metadata: undefined,
            page: pages.length + 1,
          },
        ],
      }
    },
  })

  const refetch = useCallback(() => {
    const ownerRefetch = result.refetch
    const prekeys = getResourceKey(resourceName, {
      pathParams,
      queryParams: filters,
    })
    queryClient.removeQueries({
      predicate: (query) =>
        prekeys.every((key, i) => key === query.queryKey?.[i]),
    })

    ownerRefetch()
  }, [result.refetch])

  const pagination = useMemo(() => {
    return {
      total: result.data?.[0]?.count || undefined,
      isLoading: result.isPending,
      isNextPageLoading: result.isFetchingNextPage,
      hasNextPage: result.hasNextPage,
      fetchNextPage: result.fetchNextPage,
    }
  }, [
    result.data?.[0]?.count,
    result.isPending,
    result.isFetchingNextPage,
    result.hasNextPage,
    result.fetchNextPage,
  ])

  Reflect.set(result, "refetch", refetch)
  Reflect.set(result, "queryClient", queryClient)
  Reflect.set(result, "pagination", pagination)

  return result as never
}
