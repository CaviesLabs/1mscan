import { Flex, HStack, Skeleton, Td, Text, Tr } from "@chakra-ui/react"
import { memo } from "react"
import type { IIBCChain } from "types/api/ibcRelayer"
import { Icon } from "ui/shared/entities/address/AddressEntityV2"
import IBCRelayersStatusTag from "./IBCRelayersStatusTag"

type Props = {
  index: number
  item: IIBCChain
  isLoading?: boolean
  onOpen: (item: IIBCChain) => void
}

const IBCRelayersTableItem = ({ index, item, isLoading, onOpen }: Props) => {
  const {
    chain,
    total_asset_transfer,
    receive_asset_transfer,
    send_asset_transfer,
    open_channel,
    total_channel,
    pretty_name,
    logo_URLs,
    chain_id,
  } = item
  return (
    <Tr role="group">
      <Td>
        <Skeleton isLoaded={!isLoading}>{index + 1}</Skeleton>
      </Td>
      <Td
        onClick={() => onOpen(item)}
        _hover={{ backgroundColor: "rgb(62, 141, 249, 0.1)" }}
        transition="background-color 0.2s ease-in-out"
      >
        <HStack spacing={3}>
          <Icon
            address={{
              hash: chain,
              image_url: logo_URLs?.svg || logo_URLs?.png || undefined,
            }}
            isLoading={isLoading}
            boxSize="2.5rem"
          ></Icon>
          <Flex flexDirection="column" gap="0.12rem">
            <Skeleton isLoaded={!isLoading}>
              <Text color="accent.blue" textStyle="875000">
                {pretty_name || "Unknown chain name"}
              </Text>
            </Skeleton>
            <Skeleton isLoaded={!isLoading}>
              <Text textStyle="875" color="neutral.light.6">
                {chain}
              </Text>
            </Skeleton>
          </Flex>
        </HStack>
      </Td>
      <Td textAlign="right">
        <Skeleton isLoaded={!isLoading}>{total_asset_transfer}</Skeleton>
      </Td>
      <Td textAlign="right">
        <Skeleton isLoaded={!isLoading}>{receive_asset_transfer}</Skeleton>
      </Td>
      <Td textAlign="right">
        <Skeleton isLoaded={!isLoading}>{send_asset_transfer}</Skeleton>
      </Td>
      <Td textAlign="center">
        <IBCRelayersStatusTag
          isLoading={isLoading}
          status={(Boolean(open_channel) && "opened") || "closed"}
        ></IBCRelayersStatusTag>
      </Td>
      <Td textAlign="right">
        <Skeleton
          isLoaded={!isLoading}
        >{`${open_channel}/${total_channel}`}</Skeleton>
      </Td>
    </Tr>
  )
}

export default memo(IBCRelayersTableItem, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.item === next.item &&
    prev.index === next.index &&
    prev.onOpen === next.onOpen
  )
})
