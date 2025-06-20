import { Flex, Td, Tr } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { memo, useMemo } from "react"
import type { TokenInfo } from "types/api/token"
import CurrencyValue from "ui/shared/CurrencyValue"
import AddressV2 from "ui/shared/entities/address/AddressEntityV2"
import TokenV2 from "ui/shared/entities/token/TokenEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"

type Props = {
  isLoading?: boolean
  page: number
  index: number
  item: TokenInfo
}

const PAGE_SIZE = 50

const TokenWithoutPointerTableItem = ({
  isLoading,
  page,
  index,
  item,
}: Props) => {
  const address = useMemo(
    () => ({
      hash: item.address === "usei" ? "" : item.address,
      name: "",
      implementations: null,
      is_contract: true,
      is_verified: false,
    }),
    [item.address],
  )
  return (
    <Tr role="group">
      <Td>
        <SkeletonText isLoading={isLoading} color="neutral.light.7" size="875">
          {(page - 1) * PAGE_SIZE + index + 1}
        </SkeletonText>
      </Td>
      <Td>
        <Flex flexDirection="column" gap={1} overflow="hidden">
          <TokenV2
            token={item}
            isLoading={isLoading}
            textStyle="87500"
            noCopy
            confirmIconPosition="symbol"
            confirmIconProps={{
              boxSize: 5,
            }}
            showFullyInfo
            symbolProps={{
              flexShrink: 0,
              maxWidth: "6rem",
            }}
          />
          <AddressV2
            noIcon
            address={address}
            isLoading={isLoading}
            textStyle="875"
            noName
            fallback="-"
          />
        </Flex>
      </Td>

      <Td>
        <CurrencyValue
          value={1}
          decimals={0}
          hideValue
          isLoading={isLoading}
          autoPrice={item.address || item.token_denom}
          fallbackUsd
          usdProps={{
            textStyle: "875",
            color: "neutral.light.7",
          }}
        />
      </Td>

      <Td textAlign="right">
        <SkeletonText isLoading={isLoading}>
          {BigNumber(item.holders || 0).toFormat()}
        </SkeletonText>
      </Td>
    </Tr>
  )
}

export default memo(TokenWithoutPointerTableItem, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.page === next.page &&
    prev.index === next.index &&
    prev.item === next.item
  )
})
