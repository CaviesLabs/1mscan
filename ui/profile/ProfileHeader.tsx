import { Flex, type FlexProps, Text } from "@chakra-ui/react"
import { type ReactNode, memo, useCallback, useContext } from "react"
import ActionToggle from "ui/shared/button/ActionToggle"
import { LayoutContext } from "ui/shared/layout/components/LayoutProvider"
import { useSnapshot } from "valtio"

type Props = {
  title?: string
  isLoading?: boolean
  tagsSlot?: ReactNode
  descriptionSlot?: ReactNode
  afterTitle?: ReactNode
  noToggle?: boolean
  titleTagProps?: FlexProps
}

const ProfileHeader = ({
  title,
  tagsSlot,
  descriptionSlot,
  afterTitle,
  noToggle,
  titleTagProps,
}: Props) => {
  const { store } = useContext(LayoutContext)
  const snap = useSnapshot(store)
  const tabItem = snap.item
  const open = snap.open
  const onOpen = useCallback(() => {
    store.open = true
  }, [])

  return (
    <Flex width="full" gap={4} justifyContent="space-between">
      {/* <BackLink
        onClick={() => {
          const item = navs
            .map((nav) => nav.items.find((item) => item.id === tabId))
            .find(Boolean);

          if (!item) return;
          onChangeTabId({ tabId: item.id, href: item.href });
        }}
      ></BackLink> */}
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        alignItems={{ base: "stretch", lg: "flex-start" }}
        rowGap={2}
        columnGap={6}
        flex={1}
      >
        <Flex flexDirection="column" flex={1} gap={1} alignItems="stretch">
          <Flex
            gap={4}
            flex={1}
            justifyContent="space-between"
            alignItems={{ lg: "flex-start" }}
          >
            <Flex
              alignItems={{ base: "flex-start", lg: "center" }}
              flexDirection={{ base: "column", lg: "row" }}
              flexWrap="wrap"
              rowGap={1}
              columnGap={4}
              flex={1}
              {...titleTagProps}
            >
              <Text as="h1" textStyle="175" color="neutral.light.8">
                {title || tabItem.title}
              </Text>
              {tagsSlot}
            </Flex>

            {!noToggle && (
              <ActionToggle
                display={{ lg: "none" }}
                isOpen={open}
                onClick={onOpen}
              ></ActionToggle>
            )}
          </Flex>

          {descriptionSlot && (
            <Text as="h2" color="neutral.light.7" textStyle="1">
              {descriptionSlot}
            </Text>
          )}
        </Flex>

        {afterTitle}
      </Flex>
    </Flex>
  )
}

export default memo(ProfileHeader, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.tagsSlot === next.tagsSlot &&
    prev.afterTitle === next.afterTitle &&
    prev.descriptionSlot === next.descriptionSlot
  )
})
