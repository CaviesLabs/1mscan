import { HStack, Skeleton, Stack, Td, Tr } from "@chakra-ui/react"
import useTimeAgoIncrement from "lib/hooks/useTimeAgoIncrement"
import { memo } from "react"
import type { IIBCChannelTransaction } from "types/api/ibcRelayer"
import CurrencyValue from "ui/shared/CurrencyValue"
import BlockEntityV2 from "ui/shared/entities/block/BlockEntityV2"
import TxEntityV2 from "ui/shared/entities/tx/TxEntityV2"
import TransferDirection from "ui/shared/transfer/TransferDirection"
import TxStatus from "ui/tx/tag/TxStatus"
import TxTypeMethod from "ui/txs/TxTypeMethod"

type Props = {
  item: IIBCChannelTransaction
  isLoading?: boolean
}

const IBCTransactionTableItem = ({ item, isLoading }: Props) => {
  const {
    ibc_message: { transaction },
    status,
    type,
    amount,
    token_info,
  } = item
  const timeAgo = useTimeAgoIncrement(transaction.timestamp)

  return (
    <Tr role="group">
      <Td>
        <Stack spacing={1} overflow="hidden" maxWidth={250}>
          <TxEntityV2 hash={transaction.hash} isLoading={isLoading} />
          {transaction.timestamp && (
            <Skeleton
              color="neutral.light.5"
              textStyle="8125"
              isLoaded={!isLoading}
            >
              <span>{timeAgo}</span>
            </Skeleton>
          )}
        </Stack>
      </Td>
      <Td>
        <TxStatus
          status={
            (status === "ack_success" && "ok") ||
            (status === "ongoing" && "pending") ||
            "error"
          }
          isLoading={isLoading}
          errorText={
            (status === "ack_success" && "Success") ||
            (status === "ongoing" && "Pending") ||
            "Failed"
          }
        />
      </Td>
      <Td whiteSpace="nowrap">
        <TxTypeMethod
          isLoading={isLoading}
          method={transaction.method}
          tx_types={transaction.tx_types}
        ></TxTypeMethod>
      </Td>

      <Td textAlign="center">
        <HStack justifyContent="flex-end">
          <BlockEntityV2
            isLoading={isLoading}
            number={transaction.block}
            noIcon
            fontSize="0.875rem"
            lineHeight={5}
            fontWeight={400}
          />
        </HStack>
      </Td>

      <Td textAlign="center">
        <TransferDirection
          display="inline-flex"
          isLoading={isLoading}
          direction={
            (type === "recv_packet" && "in") ||
            (type === "send_packet" && "out") ||
            undefined
          }
          fallback=""
          from={undefined}
          to={undefined}
        />
      </Td>

      <Td paddingRight="1.25rem !important" textAlign="right" overflow="hidden">
        <CurrencyValue
          isTruncated
          value={amount}
          accuracy={9}
          color="neutral.light.7"
          textStyle="875"
          defaultIsTruncated={true}
          currency={
            token_info?.symbol ||
            token_info?.token_denom ||
            token_info?.base_denom
          }
          isLoading={isLoading}
          decimals={
            Object.entries(token_info?.denom_units || {})?.find(
              ([key]) => key === token_info?.display,
            )?.[1]?.exponent || 0
          }
        />
      </Td>

      <Td textAlign="right">
        <CurrencyValue
          value={transaction.fee?.value}
          isLoading={isLoading}
          osType="Cosmos"
        />
      </Td>
    </Tr>
  )
}

export default memo(IBCTransactionTableItem, (prev, next) => {
  return prev.item === next.item && prev.isLoading === next.isLoading
})
