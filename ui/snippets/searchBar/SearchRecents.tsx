import { Center, HStack, Stack, Text } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { useWatch } from "react-hook-form"
import SearchRecentItem from "./SearchRecentItem"
import type { IForm } from "./types"
import type { ISearchDBItem } from "./utils"

type Props = {
  onSelect: (item: ISearchDBItem) => void
  onRemove: (item: ISearchDBItem) => void
  isEnabled: boolean
  onClear: () => void
}

const SearchRecents = ({ onSelect, onRemove, isEnabled, onClear }: Props) => {
  const recents = useWatch<IForm>({
    name: "recents" as const,
    exact: true,
  }) as ISearchDBItem[]

  return (
    <Stack
      data-state={isEnabled ? "open" : "closed"}
      _closed={{
        display: "none",
      }}
      flex={1}
      gap={0}
      onClick={() => {
        document.body.style.overflowY = "scroll"
      }}
    >
      {!recents.length && (
        <Center flex={1} textStyle="875" color="neutral.light.5">
          {getLanguage("header.search_bar.enter_keyword_for_searching")}
        </Center>
      )}
      {recents.length && (
        <>
          <HStack
            justifyContent="space-between"
            marginTop={4}
            marginX={4}
            marginBottom={1}
          >
            <Text textStyle="8125500" color="neutral.light.5">
              {getLanguage("header.search_bar.recent")}
            </Text>
            <Text
              _hover={{ textDecoration: "underline" }}
              color="accent.blue"
              onClick={onClear}
              textStyle="875"
              cursor="pointer"
            >
              {getLanguage("header.search_bar.clear_all")}
            </Text>
          </HStack>

          {recents.map((item) => (
            <SearchRecentItem
              key={item.id}
              item={item}
              onSelect={onSelect}
              onRemove={onRemove}
            />
          ))}
        </>
      )}
    </Stack>
  )
}

export default memo(SearchRecents, (prev, next) => {
  return prev.isEnabled === next.isEnabled
})
