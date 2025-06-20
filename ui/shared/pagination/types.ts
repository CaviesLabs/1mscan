import type { QueryClient, UseQueryResult } from "@tanstack/react-query"
import type {
  IPageableResourceName,
  IResourceError,
  IResponse,
} from "lib/api/resources"

export type QueryWithPagesResult<
  R extends IPageableResourceName,
  I extends IResponse<R>,
  O = I,
> = UseQueryResult<O, IResourceError> & {
  pagination: IPagination
  queryClient?: QueryClient
}

export type INextPageParams = {
  _next: object | null
  _page: number
}

export type IInitialStore = {
  _histories: Record<number, INextPageParams["_next"] | null>
  _page: number
  push: INextPageParams["_next"] | null
  decode: string
  next: true
  readonly metadata: object | null
  readonly can_next: boolean
  readonly can_back: boolean
  back: number | -1 | 0
  readonly page: number
}

export type IStore = {
  readonly page: number
  readonly can_next: boolean
  readonly can_back: boolean
}

export type IPagination = {
  snap: IStore
  loading: boolean
  total: number
  next: () => void
  back: (to: number | 0 | -1) => void
}

export type IInfinityPagination = {
  total: number | undefined
  isLoading: boolean
  isNextPageLoading: boolean
  hasNextPage: boolean
  fetchNextPage: () => void
}
