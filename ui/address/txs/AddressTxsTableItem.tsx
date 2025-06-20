import { Skeleton, Td, Tr, VStack } from "@chakra-ui/react"
import useTimeAgoIncrement from "lib/hooks/useTimeAgoIncrement"
import { memo } from "react"
import type { Transaction } from "types/api/transaction"
import type { OSType } from "types/base"
import CurrencyValue from "ui/shared/CurrencyValue"
import BlockV2 from "ui/shared/entities/block/BlockEntityV2"
import TxV2 from "ui/shared/entities/tx/TxEntityV2"
import { default as TransferDirection } from "ui/shared/transfer/TransferDirection"
import TxStatus from "ui/tx/tag/TxStatus"
import { default as TxTypeMethod } from "ui/txs/TxTypeMethod"

type Props = {
  item: Transaction
  hash: string
  isLoading?: boolean
  osType: OSType
}

const AddressTxsTableItem = ({ item, hash, isLoading, osType }: Props) => {
  const timeAgo = useTimeAgoIncrement(item.timestamp)

  return (
    <Tr role="group">
      <Td>
        <VStack alignItems="stretch" spacing={1} overflow="hidden">
          <TxV2 hash={item.hash} isLoading={isLoading} fallback="-" />
          {item.timestamp && (
            <Skeleton
              color="neutral.light.5"
              textStyle="8125"
              isLoaded={!isLoading}
            >
              <span>{timeAgo}</span>
            </Skeleton>
          )}
        </VStack>
      </Td>
      <Td>
        <TxStatus
          status={item.status}
          isLoading={isLoading}
          errorText={item.status === "error" ? item.result : undefined}
        />
      </Td>
      <Td>
        <TxTypeMethod
          isLoading={isLoading}
          method={item.method}
          tx_types={item.tx_types}
        ></TxTypeMethod>
      </Td>

      <Td textAlign="right">
        <BlockV2
          float="right"
          isLoading={isLoading}
          number={item.block}
          noIcon
          noCopy
        />
      </Td>

      {osType === "EVM" && (
        <Td>
          <TransferDirection
            isLoading={isLoading}
            from={item.from}
            to={item.to || item.created_contract}
            current={hash}
            tx_types={item.tx_types}
            method={item.method}
            osType={osType}
          />
        </Td>
      )}

      <Td textAlign="right">
        <CurrencyValue
          value={item.value}
          accuracy={9}
          color="neutral.light.7"
          textStyle="875"
          isLoading={isLoading}
          osType={osType}
          fallback="-"
        />
      </Td>

      <Td textAlign="right">
        <CurrencyValue
          value={item.fee?.value}
          isLoading={isLoading}
          osType={osType}
          fallback="-"
        />
      </Td>
    </Tr>
  )
}

export default memo(AddressTxsTableItem, (prev, next) => {
  return (
    prev.item.hash === next.item.hash &&
    prev.isLoading === next.isLoading &&
    prev.hash === next.hash
  )
})
