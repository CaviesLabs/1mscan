import { Flex, Text } from "@chakra-ui/react"
import moment from "moment"
import { route } from "nextjs-routes"
import { memo, useMemo } from "react"
import type { ISearchTransaction } from "types/api/search"
import IconSvg from "ui/shared/IconSvg"
import SearchLink from "./SearchLink"

type Props = {
  item: ISearchTransaction & {
    identifier: string
  }
  onSelect: AnyFunction
}

const SearchTransaction = ({ item, onSelect }: Props) => {
  const href = useMemo(() => {
    return route({ pathname: "/tx/[hash]", query: { hash: item.tx_hash } })
  }, [item.tx_hash])

  const date = useMemo(
    () => moment(item.timestamp).format("llll"),
    [item.timestamp],
  )
  return (
    <SearchLink href={href} onClick={onSelect}>
      <Flex alignItems="center" gap={3} overflow="hidden">
        <IconSvg name="exchange" boxSize={4} color="secondary.04" />

        <Flex flexDirection="column" gap={1} flex={1} overflow="hidden">
          <Text width="full" isTruncated color="neutral.light.8" size="875">
            {item.tx_hash}
          </Text>
          <Text width="full" isTruncated color="neutral.light.6" size="8125">
            {date}
          </Text>
        </Flex>
      </Flex>
    </SearchLink>
  )
}

export default memo(SearchTransaction, (prev, next) => {
  return prev.item.identifier === next.item.identifier
})
