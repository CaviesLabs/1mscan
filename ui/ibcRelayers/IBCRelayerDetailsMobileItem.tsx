import { HStack, Skeleton, VStack } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import moment from "moment"
import { memo } from "react"
import type { IBCChainDetails } from "types/api/ibcRelayer"
import Divider from "ui/shared/Divider"
import IBCButtonView from "./IBCButtonView"
import IBCLinkIcon from "./IBCLinkIcon"
import IBCRelayersStatusTag from "./IBCRelayersStatusTag"

type Props = { isLoading?: boolean; item: IBCChainDetails }

const Item = ({
  label,
  value,
  isLoading,
}: {
  label: string
  value: string
  isLoading?: boolean
}) => {
  return (
    <HStack justifyContent="space-between" textStyle="875">
      <Skeleton isLoaded={!isLoading} color="neutral.light.5">
        <span>{label}</span>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} color="neutral.light.6">
        <span>{value}</span>
      </Skeleton>
    </HStack>
  )
}

const IBCRelayerDetailsMobileItem = ({
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
    <VStack
      alignItems="stretch"
      padding={3}
      spacing={2}
      borderRadius="0.25rem"
      borderWidth="1px"
      borderColor="neutral.light.4"
    >
      <HStack height={6} spacing={2} color="neutral.light.8" textStyle="87500">
        <Skeleton isLoaded={!isLoading}>{channel_id}</Skeleton>
        <IBCLinkIcon
          state={state}
          isLoading={isLoading}
          boxSize={5}
        ></IBCLinkIcon>
        <Skeleton isLoaded={!isLoading}>{counterparty_channel_id}</Skeleton>
      </HStack>

      <Divider backgroundColor="neutral.light.3"></Divider>
      <IBCRelayersStatusTag
        status={
          (state === "OPEN" && "opened") ||
          (state === "CLOSE" && "closed") ||
          "closed"
        }
        isLoading={isLoading}
        variant="outline"
      ></IBCRelayersStatusTag>

      <Item
        label="Operating Since"
        value={moment(
          ibc_connection.ibc_client.operating_since_1 ||
            ibc_connection.ibc_client.operating_since_2,
        ).fromNow()}
        isLoading={isLoading}
      ></Item>
      <Item
        label="Total"
        value={BigNumber(total.aggregate.count).toFormat()}
        isLoading={isLoading}
      ></Item>
      <Item
        label="Receive"
        value={BigNumber(receive.aggregate.count).toFormat()}
        isLoading={isLoading}
      ></Item>
      <Item
        label="Send"
        value={BigNumber(send.aggregate.count).toFormat()}
        isLoading={isLoading}
      ></Item>
      <IBCButtonView
        isLoading={isLoading}
        channel_id={channel_id}
        counterparty_channel_id={counterparty_channel_id}
        alignSelf="flex-end"
      ></IBCButtonView>
    </VStack>
  )
}

export default memo(IBCRelayerDetailsMobileItem, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.item === next.item
})
