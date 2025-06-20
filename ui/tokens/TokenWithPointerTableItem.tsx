import { Flex, Td, Tr } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { getAssociationTokenData } from "lib/association"
import { memo, useMemo } from "react"
import type { TokenInfo } from "types/api/token"
import CurrencyValue from "ui/shared/CurrencyValue"
import AddressV2 from "ui/shared/entities/address/AddressEntityV2"
import TokenV2 from "ui/shared/entities/token/TokenEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"

type Props = {
  item: TokenInfo
  isLoading?: boolean
  index: number
  page: number
}

const TokenWithPointerTableItem = ({ item, isLoading, index, page }: Props) => {
  const address = useMemo(
    () => ({
      hash: item.address,
      name: "",
      implementations: null,
      is_contract: true,
      is_verified: false,
    }),
    [item.address],
  )

  const associationTokenData = useMemo(
    () => getAssociationTokenData(item),
    [item],
  )

  return (
    <Tr role="group">
      <Td>
        <SkeletonText isLoading={isLoading} color="neutral.light.7" size="875">
          {(page - 1) * 50 + index + 1}
        </SkeletonText>
      </Td>
      <Td>
        <Flex flexDirection="column" gap={1} overflow="hidden">
          <TokenV2
            noCopy
            textStyle="87500"
            token={item}
            isLoading={isLoading}
            confirmIconPosition="symbol"
            confirmIconProps={{
              boxSize: 5,
            }}
            showAssociation
            showFullyInfo
            symbolProps={{
              flexShrink: 0,
              maxWidth: "7rem",
            }}
          />

          <AddressV2
            noIcon
            address={address}
            isLoading={isLoading}
            textStyle="875"
            fallback="-"
          />
        </Flex>
      </Td>

      <Td>
        <AddressV2
          noIcon
          address={{ hash: associationTokenData?.associationAddress as any }}
          isLoading={isLoading}
          fallback="-"
        />
      </Td>
      <Td>
        <CurrencyValue
          value={item.total_supply}
          decimals={item.decimals}
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

export default memo(TokenWithPointerTableItem, (prev, next) => {
  return (
    prev.item === next.item &&
    prev.isLoading === next.isLoading &&
    prev.index === next.index &&
    prev.page === next.page
  )
})
