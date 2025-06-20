import { Flex, HStack, Th, Thead, Tr } from "@chakra-ui/react"
import { useLastSync } from "lib/hooks/useLastSync"
import { setQuery } from "lib/router/setQuery"
import { memo, useMemo } from "react"
import { Controller, useFormContext } from "react-hook-form"
import type { IIBCChannelTransaction } from "types/api/ibcRelayer"
import Hint from "ui/shared/Hint"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import SortIndicator from "ui/shared/table/SortIndicator"
import IBCTransactionTableItem from "./IBCTransactionTableItem"
import type { IForm } from "./types"

type Props = {
  isLoading?: boolean
  items: IIBCChannelTransaction[] | undefined
  dataUpdatedAt: number
}

const IBCTransactionTable = ({ dataUpdatedAt, items, isLoading }: Props) => {
  const { control, watch, getValues } = useFormContext<IForm>()

  const lastSync = useLastSync(dataUpdatedAt, [items])

  const processedItems = useMemo(() => {
    const sort = getValues("sort")
    const newItems = [...(items || [])]

    if (sort === "transaction-amount-asc")
      return newItems?.sortByBigNumber("asc", "amount")
    if (sort === "transaction-amount-desc")
      return newItems?.sortByBigNumber("desc", "amount")
    return newItems
  }, [items, watch("sort")])
  return (
    <ScrollTable
      variant="v2"
      sizes={[20, 10, 10, 15, 20, 20]}
      maxs={["12rem", "8rem", "8rem", "8rem", "8rem", "15rem"]}
    >
      <Thead>
        <Tr>
          <Th>
            <Flex alignItems="center" gap={1}>
              <span>Trx hash</span>
              <Hint label={`Last sync: ${lastSync}`}></Hint>
            </Flex>
          </Th>
          <Th>Status</Th>
          <Th>Type & Method</Th>
          <Th textAlign="right">Block</Th>
          <Th textAlign="center">Transfer type</Th>
          <Th textAlign="right" isNumeric paddingRight="1.25rem !important">
            <HStack spacing={1} justifyContent="flex-end">
              <span>Amount</span>
              <Controller
                control={control}
                name="sort"
                render={({ field: { value, onChange } }) => {
                  return (
                    <SortIndicator
                      sorting={value}
                      value1="transaction-amount-asc"
                      value2="transaction-amount-desc"
                      isLoading={isLoading}
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
          <Th textAlign="right" isNumeric>
            Fee SEI
          </Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {processedItems?.map((item, index) => {
          return (
            <IBCTransactionTableItem
              key={isLoading ? index : Math.random()}
              item={item}
              isLoading={isLoading}
            ></IBCTransactionTableItem>
          )
        })}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(IBCTransactionTable, (prev, next) => {
  return (
    prev.dataUpdatedAt === next.dataUpdatedAt &&
    prev.isLoading === next.isLoading &&
    prev.items === next.items
  )
})
