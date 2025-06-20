import {
  Flex,
  GridItem,
  HStack,
  Skeleton,
  Stack,
  chakra,
} from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"

import type { AddressNFT } from "types/api/address"

import { route } from "nextjs-routes"

import { isNil } from "lodash"
import Router from "next/router"
import { memo } from "react"
import Tag from "ui/shared/chakra/Tag"
import NFTV2 from "ui/shared/entities/nft/NFTEntityV2"
import TokenV2 from "ui/shared/entities/token/TokenEntityV2"
import NftMedia from "ui/shared/nft/NftMedia"

type Props = {
  isLoading?: boolean
  tokenInstance: AddressNFT
  withTokenLink?: boolean
}

const NFTItem = ({ isLoading, tokenInstance, withTokenLink }: Props) => {
  const tokenInstanceLink =
    !isNil(tokenInstance.id) &&
    route({
      pathname: "/token/[...slug]",
      query: {
        slug: [tokenInstance?.token.address, "instance", tokenInstance.id],
      },
    })

  const token = tokenInstance.token

  return (
    <GridItem
      display="flex"
      flexDirection="column"
      flex={1}
      alignItems="stretch"
      gap={{ base: 2, lg: 3 }}
      width="full"
      textStyle="1"
      position="relative"
    >
      <Tag
        colorScheme="gray"
        zIndex={1}
        position="absolute"
        top={2}
        right={2}
        whiteSpace="nowrap"
        isLoading={isLoading}
      >
        {tokenInstance.token.type}
      </Tag>

      <NftMedia
        url={tokenInstance?.animation_url || tokenInstance?.image_url || null}
        isLoading={isLoading}
        onClick={(e) => {
          if (!tokenInstanceLink) return
          Router.push(tokenInstanceLink)
          e.stopPropagation()
        }}
      />

      <Stack mx={1} alignItems="stretch" spacing={1}>
        <Flex justifyContent="space-between" w="100%">
          <HStack spacing={1} overflow="hidden">
            <chakra.span color="neutral.light.6" whiteSpace="pre">
              ID#
            </chakra.span>
            <NFTV2
              hash={tokenInstance.token.address}
              id={tokenInstance.id}
              isLoading={isLoading}
              noIcon
              src={undefined}
            />
          </HStack>
          <Skeleton isLoaded={!isLoading}>
            {Number(tokenInstance.value) > 1 && (
              <Flex>
                <chakra.span color="neutral.light.6" whiteSpace="pre">
                  {getLanguage("address.qty")}
                </chakra.span>
                {tokenInstance.value}
              </Flex>
            )}
          </Skeleton>
        </Flex>
        {withTokenLink && (
          <Flex alignItems="flex-end">
            <TokenV2
              token={token || tokenInstance.token}
              isLoading={isLoading}
              noCopy
              noSymbol
              confirmIconProps={{
                boxSize: 5,
              }}
            />
          </Flex>
        )}
      </Stack>
    </GridItem>
  )
}

export default memo(NFTItem, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.tokenInstance === next.tokenInstance &&
    prev.withTokenLink === next.withTokenLink
  )
})
