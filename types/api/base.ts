import type { OSType } from "types/base"
import type { ISortDirection } from "ui/shared/sort/utils"

export type DefaultFilter<T extends object = object> = {
  q?: string
  id?: string
  type?: OSType
  limit?: number
  items_count?: number
  search?: string
  denom?: string
  sort?:
    | (`${string}:${ISortDirection}` | "")[]
    | `${string}:${ISortDirection}`
    | ""
} & T

export type IGatewayNextPageParams = {
  items_count: number
  limit: number
} | null

export type IGatewayResponse<D extends object> = {
  total_count: number
  count?: number
  total_amount?: number
  next_page_params: IGatewayNextPageParams | null
} & D
