import { HStack, Th, Thead, Tr } from "@chakra-ui/react"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { IIBCChain } from "types/api/ibcRelayer"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import SortIndicator from "ui/shared/table/SortIndicator"
import IBCRelayersTableItem from "./IBCRelayersTableItem"
import type { ICombinedSortType } from "./types"

type Props = {
  items: IIBCChain[] | undefined
  isLoading?: boolean
  onOpen: (item: IIBCChain) => void
  sort: ICombinedSortType | undefined
  setSort: (nextValue: ICombinedSortType | undefined) => void
}

const IBCRelayersTable = ({
  items,
  isLoading,
  onOpen,
  sort,
  setSort,
}: Props) => {
  return (
    <ScrollTable variant="v2" sizes={[5, 20, 15, 15, 15, 15, 15]}>
      <Thead>
        <Tr>
          <Th></Th>
          <Th>Chain</Th>
          <Th>
            <HStack spacing={1} justifyContent="flex-end">
              <span>Total</span>

              <SortIndicator
                sorting={sort}
                value1="total_asset_transfer-asc"
                value2="total_asset_transfer-desc"
                isLoading={isLoading}
                onChange={(e) => {
                  const nextValue = e.target?.value as
                    | ICombinedSortType
                    | undefined
                  setSort(nextValue || undefined)
                }}
              ></SortIndicator>
            </HStack>
          </Th>
          <Th>
            <HStack spacing={1} justifyContent="flex-end">
              <span>Receive</span>

              <SortIndicator
                sorting={sort}
                value1="receive_asset_transfer-asc"
                value2="receive_asset_transfer-desc"
                isLoading={isLoading}
                onChange={(e) => {
                  const nextValue = e.target?.value as
                    | ICombinedSortType
                    | undefined
                  setSort(nextValue || undefined)
                }}
              ></SortIndicator>
            </HStack>
          </Th>
          <Th textAlign="right">
            <HStack spacing={1} justifyContent="flex-end">
              <span>Send</span>

              <SortIndicator
                sorting={sort}
                value1="send_asset_transfer-asc"
                value2="send_asset_transfer-desc"
                isLoading={isLoading}
                onChange={(e) => {
                  const nextValue = e.target?.value as
                    | ICombinedSortType
                    | undefined
                  setSort(nextValue || undefined)
                }}
              ></SortIndicator>
            </HStack>
          </Th>
          <Th>
            <HStack spacing={1} justifyContent="center">
              <span>Status</span>

              <SortIndicator
                sorting={sort}
                value1="status-asc"
                value2="status-desc"
                isLoading={isLoading}
                onChange={(e) => {
                  const nextValue = e.target?.value as
                    | ICombinedSortType
                    | undefined
                  setSort(nextValue || undefined)
                }}
              ></SortIndicator>
            </HStack>
          </Th>
          <Th textAlign="right">Channels</Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => {
          return (
            <IBCRelayersTableItem
              key={generateKey(index, isLoading, item.chain)}
              item={item}
              isLoading={isLoading}
              onOpen={onOpen}
              index={index}
            ></IBCRelayersTableItem>
          )
        })}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(IBCRelayersTable, (prev, next) => {
  return (
    prev.items === next.items &&
    prev.isLoading === next.isLoading &&
    prev.sort === next.sort
  )
})
