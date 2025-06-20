import type { IIBCChain } from "types/api/ibcRelayer"
import { getApiSort } from "ui/shared/sort/utils"
import type { ICombinedSortType, IIBCRelayersStatus } from "./types"

export const sortChainConnecteds = (
  items: IIBCChain[],
  sort: ICombinedSortType | undefined,
  status?: IIBCRelayersStatus,
) => {
  if (!items) return []

  const newItems = items.filter((item) =>
    status
      ? status === "opened"
        ? item.open_channel
        : !item.open_channel
      : true,
  )

  if (!sort) return newItems

  if (sort === "total_asset_transfer-asc") {
    return newItems?.sortByBigNumber("asc", "total_asset_transfer")
  } else if (sort === "total_asset_transfer-desc") {
    return newItems?.sortByBigNumber("desc", "total_asset_transfer")
  } else if (sort === "receive_asset_transfer-asc") {
    return newItems?.sortByBigNumber("asc", "receive_asset_transfer")
  } else if (sort === "receive_asset_transfer-desc") {
    return newItems?.sortByBigNumber("desc", "receive_asset_transfer")
  } else if (sort === "send_asset_transfer-asc") {
    return newItems?.sortByBigNumber("asc", "send_asset_transfer")
  } else if (sort === "send_asset_transfer-desc") {
    return newItems?.sortByBigNumber("desc", "send_asset_transfer")
  } else if (sort === "status-asc") {
    return newItems?.sortByBigNumber("asc", "open_channel")
  } else if (sort === "status-desc") {
    return newItems?.sortByBigNumber("desc", "open_channel")
  }
  return newItems
}

export const sortApi = (sort: ICombinedSortType | undefined) => getApiSort(sort)
