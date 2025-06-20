import { HStack, Th, Thead, Tr } from "@chakra-ui/react"
import { setQuery } from "lib/router/setQuery"
import { memo, useMemo } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { generateKey } from "stubs/utils"
import type { IIBCRelayerChannelTransferAssets } from "types/api/ibcRelayer"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import SortIndicator from "ui/shared/table/SortIndicator"
import type { IForm } from "../types"
import IBCTransferAssetsTableItem from "./IBCTransferAssetsTableItem"

type Props = {
  items: IIBCRelayerChannelTransferAssets[]
  isLoading?: boolean
}

const IBCTransferAssetsTable = ({ items, isLoading }: Props) => {
  const { control, getValues, watch } = useFormContext<IForm>()
  const itemsSorted = useMemo(() => {
    const sort = getValues("sort")
    const newItems = [...items]
    if (sort === "transfer-counts-asc") {
      return newItems.sortByBigNumber("asc", "total_messages")
    }
    if (sort === "transfer-counts-desc") {
      return newItems.sortByBigNumber("desc", "total_messages")
    }
    if (sort === "quantity-asc") {
      return newItems.sortByBigNumber("asc", "amount")
    }
    if (sort === "quantity-desc") {
      return newItems.sortByBigNumber("desc", "amount")
    }
    return newItems
  }, [items, watch("sort")])
  return (
    <ScrollTable variant="v2" sizes={[50, 10, 20, 20]}>
      <Thead>
        <Tr>
          <Th>Asset</Th>
          <Th>Type</Th>
          <Th textAlign="right">
            <HStack spacing={1} justifyContent="flex-end">
              <span>Transfer counts</span>
              <Controller
                control={control}
                name="sort"
                render={({ field: { value, onChange } }) => {
                  return (
                    <SortIndicator
                      sorting={value}
                      value1="transfer-counts-asc"
                      value2="transfer-counts-desc"
                      onChange={(e) => {
                        const nextValue = e.target?.value
                        onChange(nextValue)
                        setQuery("sort", nextValue)
                      }}
                    ></SortIndicator>
                  )
                }}
              ></Controller>
            </HStack>
          </Th>
          <Th textAlign="right">
            <HStack spacing={1} justifyContent="flex-end">
              <span>Quantity</span>
              <Controller
                control={control}
                name="sort"
                render={({ field: { value, onChange } }) => {
                  return (
                    <SortIndicator
                      sorting={value}
                      value1="quantity-asc"
                      value2="quantity-desc"
                      onChange={(e) => {
                        const nextValue = e.target?.value
                        onChange(nextValue)
                        setQuery("sort", nextValue)
                      }}
                    ></SortIndicator>
                  )
                }}
              ></Controller>
            </HStack>
          </Th>
          {/* <Th width="16rem" textAlign="right">
            Value
          </Th> */}
        </Tr>
      </Thead>
      <TbodyControl>
        {itemsSorted.map((item, index) => {
          return (
            <IBCTransferAssetsTableItem
              key={generateKey(
                index,
                isLoading,
                index,
                item.denom,
                item.channel_id,
                item.counterparty_channel_id,
                item.type,
                item.total_messages,
                item.amount,
              )}
              item={item}
              isLoading={isLoading}
            ></IBCTransferAssetsTableItem>
          )
        })}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(IBCTransferAssetsTable, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.items === next.items
})
