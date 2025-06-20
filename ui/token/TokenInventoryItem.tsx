import { Flex, Skeleton, Text } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import Router from "next/router"
import { route } from "nextjs-routes"
import { memo, useMemo } from "react"
import type { TokenInfo, TokenInstance } from "types/api/token"
import LinkInternal from "ui/shared/LinkInternal"
import AddressV2 from "ui/shared/entities/address/AddressEntityV2"
import NftMedia from "ui/shared/nft/NftMedia"
import { TruncatedTextTail } from "ui/shared/truncate"

type Props = {
  item: TokenInstance
  token: TokenInfo | undefined
  isLoading?: boolean
}

const TokenInventoryItem = ({ item, token, isLoading }: Props) => {
  const url = useMemo(
    () =>
      route({
        pathname: "/token/[...slug]",
        query: {
          slug: [item.token.address, "instance", encodeURIComponent(item.id)],
        },
      }),
    [item.token.address, item.id],
  )

  return (
    <Flex
      borderRadius="0.75rem"
      fontSize="sm"
      fontWeight={400}
      lineHeight="20px"
      flexDirection="column"
      justifyContent="space-between"
      gap={3}
      mb={{ base: "20px", md: 0 }}
    >
      <NftMedia
        url={item.animation_url || item.image_url}
        isLoading={isLoading}
        height="unset"
        onClick={() => Router.push(url)}
      />

      <Flex
        paddingX={1}
        flexDirection="column"
        columnGap={10}
        rowGap={1}
        flex={1}
        width="full"
        overflow="hidden"
      >
        {item.id && (
          <Flex overflow="hidden" width="full" gap={1}>
            <Skeleton isLoaded={!isLoading}>
              <Text
                as="span"
                whiteSpace="pre"
                // width="full"
                textStyle="875"
                color="neutral.light.6"
              >
                ID#
              </Text>
            </Skeleton>
            <LinkInternal
              display="block"
              isLoading={isLoading}
              href={url}
              isTruncated
            >
              <TruncatedTextTail label={item.id}>{item.id}</TruncatedTextTail>
            </LinkInternal>
          </Flex>
        )}
        {/* For 1155 we have a dedicated Holders table
        We only show Owner for 721 standards */}
        {item.owner && token?.type !== "ERC-1155" && (
          <Flex gap={2} alignItems="center">
            <Skeleton isLoaded={!isLoading}>
              <Text whiteSpace="pre" textStyle="875" color="neutral.light.6">
                {getLanguage("token.owner")}
              </Text>
            </Skeleton>
            <AddressV2
              address={item.owner}
              isLoading={isLoading}
              truncation="constant"
              headLength={4}
              tailLength={4}
              noCopy
              showWarning="burn"
            />
          </Flex>
        )}
        {item.owner?.association && (
          <Flex>
            <Skeleton isLoaded={!isLoading}>
              <Text
                whiteSpace="pre"
                textStyle="875"
                color="neutral.light.6"
                mr={2}
              >
                {getLanguage("token.associated")}
              </Text>
            </Skeleton>
            <AddressV2
              address={{
                hash:
                  (item.owner.association.evm_hash.toLowerCase() ===
                    item.owner.hash.toLowerCase() &&
                    item.owner.association.sei_hash) ||
                  item.owner.association.evm_hash ||
                  undefined,
              }}
              isLoading={isLoading}
              truncation="constant"
              headLength={4}
              tailLength={4}
              noCopy
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default memo(TokenInventoryItem, (prev, next) => {
  return (
    prev.item.id === next.item.id &&
    prev.isLoading === next.isLoading &&
    prev.token?.address === next.token?.address
  )
})
