import { Th, Thead, Tr } from "@chakra-ui/react"
import { useCurrentChain } from "lib/hooks/useCurrentChain"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { IBCChainDetails, IIBCChain } from "types/api/ibcRelayer"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import IBCRelayerDetailsTableItem from "./IBCRelayerDetailsTableItem"

type Props = {
  items: IBCChainDetails[] | undefined
  isLoading?: boolean
  counterparty: IIBCChain | undefined
}

const IBCRelayerDetailsTable = ({ items, isLoading, counterparty }: Props) => {
  const currentChain = useCurrentChain()
  return (
    <ScrollTable maxWidth="100%" minWidth="100%">
      <Thead>
        <Tr>
          <Th width="30%">{currentChain?.chainPrettyName}</Th>
          <Th width="3rem"></Th>
          <Th width="30%" textAlign="center">
            {counterparty?.pretty_name}
          </Th>
          <Th width="8rem" textAlign="center">
            Status
          </Th>
          <Th width="30%" textAlign="center">
            Operating Since
          </Th>
          <Th width="6rem" textAlign="right">
            Total
          </Th>
          <Th width="6rem" textAlign="right">
            Receive
          </Th>
          <Th width="5rem" textAlign="right">
            Send
          </Th>
          <Th width="6rem" textAlign="right"></Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => (
          <IBCRelayerDetailsTableItem
            key={generateKey(
              index,
              isLoading,
              item.channel_id,
              item.counterparty_channel_id,
            )}
            item={item}
            isLoading={isLoading}
          ></IBCRelayerDetailsTableItem>
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(IBCRelayerDetailsTable, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.items === next.items &&
    prev.counterparty === next.counterparty
  )
})
