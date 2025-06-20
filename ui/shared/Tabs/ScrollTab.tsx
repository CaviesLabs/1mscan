import {
  Box,
  Flex,
  HStack,
  Skeleton,
  type TabsProps,
  chakra,
} from "@chakra-ui/react"
import { type ComponentType, type JSX, type ReactNode, memo } from "react"
import IconSvg from "../IconSvg"
import TabCounter from "./TabCounter"
import {
  type BaseItemState,
  BasePanels,
  BaseTabs,
  type BaseTabsProps,
  type MatchTabItem,
  type None,
  type TabItem,
} from "./components"

type ScrollTabItem<P extends object, E> = {
  id: string
  count?: number | Falsy
  isOverflow?: boolean
  isLoading?: boolean
  comingSoon?: boolean
  isNew?: boolean
  isCounterLoading?: boolean
  rightLabel?: ReactNode
  isChecked?: boolean | Falsy
  component?: ComponentType<E>
  props?: P
  next_page_params?: any
  title: string | ((props: { isActive: boolean }) => ReactNode)
}

const MapItem = <P extends object, E>({
  title,
  isActive,
  isLoading,
  isCounterLoading,
  isCount,
  count,
  comingSoon,
  isChecked,
  isOverflow,
  isDisabled,
  isNew,
}: Omit<BaseItemState<TabItem<P, E>>, "title"> & ScrollTabItem<P, E>) => {
  return (
    <>
      {isLoading && isActive && (
        <Skeleton position="absolute" inset={2}></Skeleton>
      )}
      <Skeleton
        isLoaded={!isLoading}
        flexShrink={0}
        position="relative"
        height="full"
      >
        <Flex
          paddingY="0.38rem"
          paddingX={5}
          data-continious={Boolean(
            isCount || isCounterLoading || isChecked || isNew,
          )}
          sx={{
            "&[data-continious=true]": {
              paddingRight: "0.38rem !important",
            },
          }}
          aria-disabled={comingSoon || isDisabled}
          alignItems="center"
          gap={2}
          height="full"
          width="full"
          justifyContent="space-between"
          _disabled={{
            cursor: "default",
          }}
        >
          <HStack spacing={1}>
            <chakra.span
              aria-disabled={comingSoon || isDisabled}
              _disabled={{
                opacity: 0.5,
              }}
            >
              {typeof title === "function"
                ? title({ isActive: isActive })
                : title}
            </chakra.span>
            {comingSoon && (
              <Box
                alignSelf="flex-start"
                borderColor="primary.light.2"
                bgColor="primary.light.1"
                color="primary.light.4"
                borderWidth="0.5px"
                borderRadius="0.125rem"
                paddingX={1}
                paddingY={0}
                textStyle="625"
              >
                Coming soon
              </Box>
            )}
            {isNew && (
              <Box
                alignSelf="flex-start"
                // borderColor="secondary.01"
                // color="secondary.01.text"
                // borderWidth="0.5px"
                // borderRadius="0.125rem"
                textStyle="125"
                paddingX={1}
                paddingY={0}
              >
                🔥
              </Box>
            )}
          </HStack>
          <TabCounter
            count={count}
            isLoading={isCounterLoading}
            isActive={isActive}
            isOverflow={isOverflow}
            isCount={isCount}
          />
          {isChecked && (
            <IconSvg
              marginRight={1}
              name="status/success"
              boxSize={6}
              color="secondary.02"
            />
          )}
        </Flex>
      </Skeleton>
    </>
  )
}

type Props<L extends (ScrollTabItem<object, any> | None)[]> = {
  id?: string
  tabs: {
    [N in keyof L]: MatchTabItem<L[N]>
  }
  isActive?: boolean
  middleSlot?: ReactNode
} & Pick<
  BaseTabsProps<TabItem<object, any>[]>,
  | "onChange"
  | "indicatorProps"
  | "cleanupOnTabChange"
  | "hideOnSingle"
  | "isLoading"
  | "itemProps"
  | "listStyleImage"
  | "rightSlot"
  | "listProps"
  | "noFallback"
  | "allowToggle"
> &
  Omit<TabsProps, "onChange" | "children">

const ScrollTab = <L extends (TabItem<object, any> | None)[]>({
  tabs,
  onChange,
  isLoading,
  id = "tab",
  cleanupOnTabChange,
  middleSlot,
  hideOnSingle,
  rightSlot,
  itemProps,
  listProps,
  isActive,
  ...props
}: Props<L>) => {
  return (
    <BaseTabs
      id={id || "tab"}
      isLoading={isLoading}
      tabs={tabs as any}
      onChange={onChange as any}
      itemProps={{
        role: "group",
        overflow: "hidden",
        padding: 0,
        sx: {
          _loading: {
            backgroundColor: "transparent",
            _selected: {
              backgroundColor: "transparent",
            },
            _hover: {
              backgroundColor: "transparent",
            },
          },
        },
        _selected: {
          backgroundColor: "neutral.light.7",
          color: "neutral.light.1",
          _hover: {
            backgroundColor: "neutral.light.7",
            color: "neutral.light.1",
          },
        },
        color: "neutral.light.7",
        display: "flex",
        alignItems: "center",
        gap: 2,
        height: 10,
        textStyle: "1",
        borderRadius: "0.75rem",
        flexShrink: 0,
        position: "relative",
        ...itemProps,
      }}
      mapItem={MapItem}
      listProps={{
        id: "routed-tabs",
        ...listProps,
      }}
      cleanupOnTabChange={cleanupOnTabChange}
      hideOnSingle={hideOnSingle}
      rightSlot={rightSlot}
      {...props}
    >
      {middleSlot}

      {tabs?.some((tab: any) => tab?.component) && (
        <BasePanels isActive={isActive} />
      )}
    </BaseTabs>
  )
}

export type ScrollTabProps<L extends (ScrollTabItem<object, any> | None)[]> =
  Props<L>

export default memo(ScrollTab) as <
  L extends (ScrollTabItem<object, any> | None)[],
>(
  props: ScrollTabProps<L>,
) => JSX.Element
