import { Button, HStack } from "@chakra-ui/react"
import { type RefObject, useCallback } from "react"
import type { ISearchCategory, ISearchItem } from "types/api/search"

type Props = {
  itemsGroups: {
    id: ISearchCategory
    title: string
    items: ISearchItem[]
  }[]
  contentRef: RefObject<HTMLDivElement>
  activeTab: (index: number) => void
}

const SearchTabs = ({ itemsGroups, contentRef, activeTab }: Props) => {
  const handleScroll = useCallback((category: ISearchCategory) => {
    const index = itemsGroups.findIndex((group) => group.id === category)
    if (index === -1) {
      return
    }
    const content = contentRef.current!
    const group = content.children[index + 1] as HTMLElement

    if (!group) {
      return
    }
    const offsetTop = group.offsetTop

    content.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }, [])

  if (!(itemsGroups.length > 1)) return null
  return (
    <HStack
      flexWrap="wrap"
      flexShrink={0}
      paddingY={2}
      paddingX={4}
      width="100%"
      borderBottomWidth="1px"
      borderColor="neutral.light.3"
      boxShadow="md"
    >
      {itemsGroups.map((group, index) => (
        <Button
          key={group.id}
          paddingX={4}
          paddingY="0.38rem"
          backgroundColor="neutral.light.3"
          variant="secondary"
          height={8}
          _active={{
            backgroundColor: "neutral.light.3",
            color: "neutral.light.7",
          }}
          borderRadius={8}
          textStyle="875"
          onClick={() => {
            handleScroll(group.id)
            activeTab(index)
          }}
          sx={{
            [`[data-index="${index}"] &`]: {
              backgroundColor: "neutral.light.7",
              color: "neutral.light.1",
            },
          }}
        >
          {group.title}
        </Button>
      ))}
    </HStack>
  )
}

export default SearchTabs
