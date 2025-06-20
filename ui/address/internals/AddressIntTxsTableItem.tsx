import { Flex, Td, Tr } from "@chakra-ui/react"
import useTimeAgoIncrement from "lib/hooks/useTimeAgoIncrement"
import { memo, useMemo } from "react"
import type { InternalTransaction } from "types/api/internalTransaction"
import CurrencyValue from "ui/shared/CurrencyValue"
import Tag from "ui/shared/chakra/Tag"
import BlockV2 from "ui/shared/entities/block/BlockEntityV2"
import TxV2 from "ui/shared/entities/tx/TxEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"
import TransferDirection from "ui/shared/transfer/TransferDirection"
import { TX_INTERNALS_ITEMS } from "ui/tx/internals/utils"
import TxStatus from "ui/tx/tag/TxStatus"

type Props = {
  item: InternalTransaction
  hash: string
  isLoading?: boolean
}

const AddressIntTxsTableItem = ({ item, hash, isLoading }: Props) => {
  const typeTitle = useMemo(
    () => TX_INTERNALS_ITEMS.find(({ id }) => id === item.type)?.title,
    [item.type],
  )

  const timeAgo = useTimeAgoIncrement(item?.timestamp)

  return (
    <Tr role="group">
      <Td>
        <Flex rowGap={1} flexDirection="column">
          <TxV2 hash={item.transaction_hash} isLoading={isLoading} />
          {item.timestamp && (
            <SkeletonText color="neutral.light.5" isLoading={isLoading}>
              {timeAgo}
            </SkeletonText>
          )}
        </Flex>
      </Td>
      <Td>
        <Flex gap={2} flexWrap="wrap">
          {typeTitle && (
            <Tag colorScheme="cyan" isLoading={isLoading}>
              {typeTitle}
            </Tag>
          )}
          <TxStatus
            status={item.success ? "ok" : "error"}
            errorText={item.error}
            isLoading={isLoading}
          />
        </Flex>
      </Td>
      <Td textAlign="right">
        <BlockV2
          isLoading={isLoading}
          number={item.block}
          noIcon
          textStyle="875"
        />
      </Td>

      <Td>
        <TransferDirection
          from={item.from}
          to={item.to || item.created_contract}
          current={hash}
          isLoading={isLoading}
        />
      </Td>

      <Td textAlign="right">
        <CurrencyValue
          value={item.value}
          decimals={18}
          fallback="-"
          isLoading={isLoading}
        ></CurrencyValue>
      </Td>
    </Tr>
  )
}

export default memo(AddressIntTxsTableItem, (prev, next) => {
  return (
    prev.item === next.item &&
    prev.hash === next.hash &&
    prev.isLoading === next.isLoading
  )
})
