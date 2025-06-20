import { Td, Tr, VStack } from "@chakra-ui/react"
import useTimeAgoIncrement from "lib/hooks/useTimeAgoIncrement"
import { memo } from "react"
import type { Transaction } from "types/api/transaction"
import type { OSType } from "types/base"
import CurrencyValue from "ui/shared/CurrencyValue"
import TxV2 from "ui/shared/entities/tx/TxEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"
import TransferDirection from "ui/shared/transfer/TransferDirection"
import TxStatus from "ui/tx/tag/TxStatus"
import TxTypeMethod from "ui/txs/TxTypeMethod"

type Props = {
  item: Transaction
  isLoading?: boolean
  osType: OSType
}

const BlockTxsTableItem = ({ item, isLoading, osType }: Props) => {
  const timeAgo = useTimeAgoIncrement(item.timestamp)

  return (
    <Tr role="group">
      <Td>
        <VStack alignItems="stretch" spacing={1} overflow="hidden">
          <TxV2 hash={item.hash} isLoading={isLoading} fallback="-" />
          {item.timestamp && (
            <SkeletonText
              color="neutral.light.5"
              textStyle="8125"
              isLoading={isLoading}
            >
              {timeAgo}
            </SkeletonText>
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

      {osType === "EVM" && (
        <Td>
          <TransferDirection
            isLoading={isLoading}
            from={item.from}
            to={item.to || item.created_contract}
            direction="down"
            tx_types={item.tx_types}
            method={item.method}
          ></TransferDirection>
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
          color="neutral.light.7"
          textStyle="875"
          justifyContent="end"
          fallback="-"
        />
      </Td>
    </Tr>
  )
}

export default memo(BlockTxsTableItem, (prev, next) => {
  return prev.item === next.item && prev.isLoading === next.isLoading
})
