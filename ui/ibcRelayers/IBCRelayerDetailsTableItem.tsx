import { Skeleton, Td, Tr } from "@chakra-ui/react"
import moment from "lib/date/moment"
import { memo } from "react"
import type { IBCChainDetails } from "types/api/ibcRelayer"
import IBCButtonView from "./IBCButtonView"
import IBCLinkIcon from "./IBCLinkIcon"
import IBCRelayersStatusTag from "./IBCRelayersStatusTag"

type Props = { isLoading?: boolean; item: IBCChainDetails }

const IBCRelayerDetailsTableItem = ({
  isLoading,
  item: {
    channel_id,
    counterparty_channel_id,
    state,
    total,
    receive,
    send,
    ibc_connection,
  },
}: Props) => {
  return (
    <Tr role="group">
      <Td width="30%">
        <Skeleton isLoaded={!isLoading}>{channel_id}</Skeleton>
      </Td>
      <Td width="3rem">
        <IBCLinkIcon state={state} isLoading={isLoading}></IBCLinkIcon>
      </Td>
      <Td width="30%" textAlign="center">
        <Skeleton isLoaded={!isLoading}>{counterparty_channel_id}</Skeleton>
      </Td>
      <Td width="5rem" textAlign="center">
        <IBCRelayersStatusTag
          status={
            (state === "OPEN" && "opened") ||
            (state === "CLOSE" && "closed") ||
            "closed"
          }
          isLoading={isLoading}
        ></IBCRelayersStatusTag>
      </Td>
      <Td width="30%" textAlign="center">
        <Skeleton isLoaded={!isLoading}>
          {moment(
            ibc_connection.ibc_client.operating_since_1 ||
              ibc_connection.ibc_client.operating_since_2,
          ).fromNow()}
        </Skeleton>
      </Td>
      <Td width="5rem" textAlign="right">
        <Skeleton isLoaded={!isLoading}>{total.aggregate.count}</Skeleton>
      </Td>
      <Td width="6rem" textAlign="right">
        <Skeleton isLoaded={!isLoading}>{receive.aggregate.count}</Skeleton>
      </Td>
      <Td width="5rem" textAlign="right">
        <Skeleton isLoaded={!isLoading}>{send.aggregate.count}</Skeleton>
      </Td>
      <Td width="5rem">
        <IBCButtonView
          float="right"
          isLoading={isLoading}
          channel_id={channel_id}
          counterparty_channel_id={counterparty_channel_id}
        ></IBCButtonView>
      </Td>
    </Tr>
  )
}

export default memo(IBCRelayerDetailsTableItem, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.item === next.item
})
