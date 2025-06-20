import { HStack, Text } from "@chakra-ui/react"
import { memo } from "react"
import IconSvg from "ui/shared/IconSvg"
import type { ISearchDBItem } from "./utils"

type Props = {
  item: ISearchDBItem
  onSelect: (item: ISearchDBItem) => void
  onRemove: (item: ISearchDBItem) => void
}

const SearchRecentItem = ({ item, onSelect, onRemove }: Props) => {
  return (
    <HStack
      paddingY={3}
      paddingX={4}
      _hover={{
        backgroundColor: "primary.light.1",
      }}
      textStyle="875"
      color="neutral.light.8"
      onClick={() => onSelect(item)}
      justifyContent="space-between"
      cursor="pointer"
      columnGap={2}
      width="full"
      maxWidth="full"
    >
      <Text flex={1} isTruncated>
        {item.keyword}
      </Text>
      <IconSvg
        name="close"
        flexShrink={0}
        boxSize={4}
        color="neutral.light.5"
        onClick={(e) => {
          e.preventDefault()
          onRemove(item)
          e.stopPropagation()
        }}
      />
    </HStack>
  )
}

export default memo(SearchRecentItem, (prev, next) => {
  return prev.item.id === next.item.id
})
