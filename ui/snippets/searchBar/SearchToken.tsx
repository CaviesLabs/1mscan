import { Box, Flex, Text } from "@chakra-ui/react"
import { route } from "nextjs-routes"
import { memo, useMemo } from "react"
import type { ISearchToken } from "types/api/search"
import { TokenIcon } from "ui/shared/entities/token/TokenEntityV2"
import TokenName from "ui/shared/entities/token/TokenName"
import SearchLink from "./SearchLink"

type Props = {
  item: ISearchToken & {
    identifier: string
  }
  onSelect: AnyFunction
}

const SearchToken = ({ item, onSelect }: Props) => {
  const href = useMemo(() => {
    return route({
      pathname: "/token/[...slug]",
      query: { slug: [item.address] },
    })
  }, [item.address])

  return (
    <SearchLink href={href} onClick={onSelect}>
      <Flex alignItems="center" gap={5} overflow="hidden">
        <Box boxSize={8} position="relative">
          <TokenIcon
            boxSize={8}
            token={{
              ...item,
              type: item.token_type,
            }}
            showConfirm
            confirmIconProps={{
              boxSize: 5,
              position: "absolute",
              right: 0,
              backgroundColor: "neutral.light.1",
              transform: "translateX(50%) translateZ(0)",
              bottom: "-0.125rem",
            }}
          />
        </Box>

        <Flex flexDirection="column" gap={1} flex={1} overflow="hidden">
          <TokenName
            width="full"
            isTruncated
            color="neutral.light.7"
            fontSize="0.875rem"
            fontWeight={400}
            lineHeight="1.25rem"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            identifier={item.address}
            defaultName={item.name}
            noLink
          />
          <Text
            width="full"
            isTruncated
            color="neutral.light.6"
            fontSize="0.8125rem"
            fontWeight={400}
            lineHeight="1rem"
          >
            {item.address}
          </Text>
        </Flex>
      </Flex>
    </SearchLink>
  )
}

export default memo(SearchToken, (prev, next) => {
  return prev.item.identifier === next.item.identifier
})
