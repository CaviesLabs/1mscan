import { Flex, Text } from "@chakra-ui/react"
import moment from "moment"
import { route } from "nextjs-routes"
import { memo, useMemo } from "react"
import type { ISearchBlock } from "types/api/search"
import IconSvg from "ui/shared/IconSvg"
import SearchLink from "./SearchLink"

type Props = {
  item: ISearchBlock & {
    identifier: string
  }
  onSelect: AnyFunction
}

const SearchBlock = ({ item, onSelect }: Props) => {
  const href = useMemo(() => {
    return route({
      pathname: "/block/[height_or_hash]",
      query: { height_or_hash: String(item.block_number) },
    })
  }, [item.block_number])

  const subTitle = useMemo(() => {
    if (item.description) return item.description
    if (!item.timestamp) return ""
    return moment(item.timestamp).format("llll")
  }, [item.timestamp, item.description])

  return (
    <SearchLink href={href} onClick={onSelect}>
      <Flex alignItems="center" gap={3} overflow="hidden">
        <IconSvg name="block" boxSize={4} color="secondary.03" />

        <Flex flexDirection="column" gap={1} flex={1} overflow="hidden">
          <Text width="full" isTruncated color="neutral.light.8" size="875">
            {item.block_number.toString()}
          </Text>
          <Text width="full" isTruncated color="neutral.light.6" size="8125">
            {subTitle}
          </Text>
        </Flex>
      </Flex>
    </SearchLink>
  )
}

export default memo(SearchBlock, (prev, next) => {
  return prev.item.identifier === next.item.identifier
})
