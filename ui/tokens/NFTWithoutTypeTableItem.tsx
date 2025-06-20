import { Flex, HStack, Td, Tr } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { getAssociationTokenData } from "lib/association"
import { memo, useMemo } from "react"
import type { TokenInfo } from "types/api/token"
import CurrencyValue from "ui/shared/CurrencyValue"
import AddressV2 from "ui/shared/entities/address/AddressEntityV2"
import { CollectionIcon } from "ui/shared/entities/nft/CollectionEntityV2"
import TokenV2 from "ui/shared/entities/token/TokenEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"

type Props = {
  item: TokenInfo
  isLoading?: boolean
  index: number
  page: number
}

const NFTTableWithoutTypeTableItem = ({
  item,
  isLoading,
  index,
  page,
}: Props) => {
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
        <HStack spacing={3} whiteSpace="nowrap">
          <CollectionIcon
            isLoading={isLoading}
            address={item.address}
            token_denom={item.token_denom}
            boxSize="2.5rem"
            borderRadius="0.25rem"
          ></CollectionIcon>
          <Flex flexDirection="column" gap={1} overflow="hidden">
            <TokenV2
              noCopy
              noSymbol
              noIcon
              showFullyInfo
              textStyle="87500"
              token={item}
              isLoading={isLoading}
              confirmIconPosition="symbol"
              confirmIconProps={{
                boxSize: 5,
              }}
              showAssociation
            />

            <AddressV2
              noIcon
              address={address}
              isLoading={isLoading}
              textStyle="875"
              fallback="-"
            />
          </Flex>
        </HStack>
      </Td>

      <Td>
        <AddressV2
          noIcon
          address={{ hash: associationTokenData?.associationAddress as any }}
          isLoading={isLoading}
          fallback="-"
        />
      </Td>

      <Td textAlign="right">
        <CurrencyValue
          isLoading={isLoading}
          value={item.total_supply}
          decimals={item.decimals || 0}
          fallback="-"
        ></CurrencyValue>
      </Td>

      <Td textAlign="right">
        <SkeletonText isLoading={isLoading}>
          {BigNumber(item.holders || 0).toFormat()}
        </SkeletonText>
      </Td>
    </Tr>
  )
}

export default memo(NFTTableWithoutTypeTableItem, (prev, next) => {
  return (
    prev.item.address === next.item.address &&
    prev.item.total_supply === next.item.total_supply &&
    prev.item.holders === next.item.holders &&
    prev.isLoading === next.isLoading
  )
})
