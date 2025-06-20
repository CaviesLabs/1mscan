import { Flex, Grid, Skeleton } from "@chakra-ui/react"
import type { AddressCollection } from "types/api/address"
import LinkInternal from "ui/shared/LinkInternal"
import NFTItem from "./NFTItem"

import { route } from "nextjs-routes"
import { memo, useMemo } from "react"
import { generateKey } from "stubs/utils"
import type { NFTTokenType } from "types/api/token"
import TokenV2 from "ui/shared/entities/token/TokenEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"
import NFTCollectionSeemore from "./NFTCollectionSeemore"

type Props = {
  isLoading?: boolean
  collection: AddressCollection
  hash: string | undefined
  tokenType: NFTTokenType
}

const NFTCollectionItem = ({
  collection,
  isLoading,
  hash,
  tokenType,
}: Props) => {
  const collectionUrl = useMemo(
    () =>
      route({
        pathname: "/token/[...slug]",
        query: {
          slug: [collection.token.address],
          tab: "inventory",
          holder_address_hash: hash || "",
        },
      }),
    [collection.token.address, hash],
  )

  return (
    <Flex
      flexDirection="column"
      flex={1}
      gap={3}
      width="full"
      paddingBottom={{ base: 0, lg: 6 }}
    >
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        alignItems={{ base: "flex-start", lg: "center" }}
        justifyContent="space-between"
        gap={{ base: 3, lg: 4 }}
      >
        <Flex alignItems={{ base: "flex-start", lg: "center" }} gap={2}>
          <TokenV2
            token={collection.token}
            noSymbol
            noCopy
            noLink
            isLoading={isLoading}
            iconProps={{
              boxSize: 4,
            }}
            textStyle="125"
          />
          <SkeletonText
            isLoading={isLoading}
            color="neutral.light.5"
            textStyle="87500"
          >
            ({collection.amount})
          </SkeletonText>
        </Flex>
        <LinkInternal href={collectionUrl} isLoading={isLoading}>
          <Skeleton isLoaded={!isLoading}>View in collection</Skeleton>
        </LinkInternal>
      </Flex>
      <Grid
        width="full"
        justifyContent="space-between"
        templateColumns={{
          base: "100%",
          lg: "repeat(4, minmax(calc(25% - 1.25rem), 1fr))",
          xl: "repeat(6, minmax(calc(16.66% - 1.25rem), 1fr))",
        }}
        gridTemplateRows="max-content"
        gap={5}
        aria-overflow={
          Number(collection.amount.slice(-2)) >
          Math.min(collection.token_instances.length, 11)
        }
        aria-count={Math.min(collection.token_instances.length, 12)}
        css={{
          "&[aria-overflow=true]": {
            "> #see-more": {
              display: "flex !important",
            },
          },
          // lg: {
          //   // hide item from 8 to 12
          //   "> :nth-of-type(n + 8)": {
          //     display: "none",
          //   },
          //   "& > :nth-of-type(n + 8) + a#see-more": {
          //     display: "flex !important",
          //   },
          // },
          xl: {
            // Show items 1 to 12, hide 13 onwards
            "> :nth-of-type(n + 13)": {
              display: "none",
            },
            "> :nth-of-type(-n + 12)": {
              display: "flex",
            },
          },
        }}
      >
        {collection.token_instances.slice(0, 11).map((tokenInstance, index) => (
          <NFTItem
            key={generateKey(index, isLoading, tokenType, tokenInstance.id)}
            tokenInstance={{ ...tokenInstance, token: collection.token }}
            isLoading={isLoading}
          ></NFTItem>
        ))}
        <NFTCollectionSeemore href={collectionUrl} />
      </Grid>
    </Flex>
  )
}

export default memo(NFTCollectionItem, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.collection === next.collection &&
    prev.hash === next.hash &&
    prev.tokenType === next.tokenType
  )
})
