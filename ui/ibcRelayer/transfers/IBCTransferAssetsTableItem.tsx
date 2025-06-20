import { Skeleton, Td, Tr } from "@chakra-ui/react"
import { memo } from "react"
import type { IIBCRelayerChannelTransferAssets } from "types/api/ibcRelayer"
import CurrencyValue from "ui/shared/CurrencyValue"
import Tag from "ui/shared/chakra/Tag"
import TokenEntityV2 from "ui/shared/entities/token/TokenEntityV2"

type Props = {
  item: IIBCRelayerChannelTransferAssets
  isLoading?: boolean
}

const IBCTransferAssetsTableItem = ({
  item: { token_info, total_messages, amount },
  isLoading,
}: Props) => {
  return (
    <Tr role="group">
      <Td>
        <TokenEntityV2
          noCopy
          maxWidth={300}
          overflow="hidden"
          isLoading={isLoading}
          token={{
            icon_url:
              token_info?.images?.svg || token_info?.images?.png || null,
            name: token_info?.name || "",
            address: token_info?.token_denom || "",
          }}
        ></TokenEntityV2>
      </Td>
      <Td>
        {(token_info?.token_type === "native" ||
          token_info?.token_type === "ics20") && (
          <Tag colorScheme="gray" isLoading={isLoading}>
            {(token_info?.token_type === "native" && "Native Coin") ||
              (token_info?.token_type === "ics20" && "IBC Token")}
          </Tag>
        )}
      </Td>
      <Td textAlign="right">
        <Skeleton isLoaded={!isLoading}>{total_messages}</Skeleton>
      </Td>
      <Td textAlign="right">
        <CurrencyValue
          isLoading={isLoading}
          value={amount}
          decimals={
            Object.entries(token_info?.denom_units || {})?.find(
              ([key]) => key === token_info?.display,
            )?.[1]?.exponent || 0
          }
        ></CurrencyValue>
      </Td>
      {/* <Td></Td> */}
    </Tr>
  )
}

export default memo(IBCTransferAssetsTableItem, (prev, next) => {
  return (
    prev.item.token_info?.token_denom === next.item.token_info?.token_denom &&
    prev.item.total_messages === next.item.total_messages &&
    prev.item.amount === next.item.amount
  )
})
