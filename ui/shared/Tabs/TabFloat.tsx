import type {
  TabIndicatorProps,
  TabListProps,
  TabProps,
  TabsProps,
} from "@chakra-ui/react"
import {
  Skeleton,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  chakra,
} from "@chakra-ui/react"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import _ from "lodash"
import { isValidElement, useMemo } from "react"
import type { RoutedTab } from "./types"

type Props<T extends string, K extends boolean> = {
  /**
   * @description ID of this property when active in router
   */
  id?: string
  tabs: ((RoutedTab<T> & { tabProps?: TabProps }) | Falsy)[]
  isSetOnRouter?: K
  /**
   * Required when isSetOnRouter = false
   */
  value?: T
  onChange?: (newId: T) => void
  disableIndicator?: boolean
  indicatorProps?: TabIndicatorProps
  tabListProps?: TabListProps
  cleanupOnTabChange?:
    | {
        keepQueries?: string[]
      }
    | boolean
  hideOnSingle?: boolean
  isLoading?: boolean
  globalTabProps?: TabProps
} & Partial<Omit<TabsProps, "value" | "onChange" | "index">>

const TabFloat = <T extends string = string, K extends boolean = true>({
  id,
  tabs: _tabs,
  value,
  isSetOnRouter = true as K,
  onChange,
  indicatorProps,
  tabListProps,
  disableIndicator,
  cleanupOnTabChange,
  hideOnSingle = false,
  isLoading,
  globalTabProps,
  ...props
}: Props<T, K>) => {
  const tabs = useMemo(() => _.compact(_tabs), [_tabs])

  const [activeIndex, setTabQuery] = useSetStateQuery(id || "", [], {
    throttle: 100,
    cleanUp: cleanupOnTabChange
      ? {
          keepQueries: [
            ...((cleanupOnTabChange as any)["keepQueries"] || []),
            "tab",
          ],
        }
      : undefined,

    decode: (nextValue) =>
      id
        ? _.clamp(
            tabs.findIndex(
              (tab) => tab.id === (isSetOnRouter ? nextValue : value),
            ),
            0,
            tabs.length - 1,
          )
        : 0,
  })

  return (
    <Tabs
      position="relative"
      variant="unstyled"
      scrollBehavior="smooth"
      index={activeIndex || 0}
      onChange={(index) => {
        if (!id) return
        const newId = String(tabs[index]?.id || undefined)
        if (
          isSetOnRouter &&
          newId !== String(tabs[activeIndex || 0]?.id || undefined)
        ) {
          setTabQuery(newId || "")
        }
        onChange?.(newId as T)
      }}
      display="flex"
      flexDirection="column"
      gap={{ base: 3, lg: 5 }}
      {...props}
    >
      {!(hideOnSingle && tabs.length <= 1) && (
        <TabList
          position="relative"
          overflowX="auto"
          paddingBottom="1px"
          width="full"
          alignItems="stretch"
          scrollBehavior="smooth"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "&": {
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            },
          }}
          {...tabListProps}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={tab.id}
              minWidth="4.5625rem"
              minHeight="1.5rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
              color="neutral.light.6"
              _selected={{
                color: "neutral.light.8",
              }}
              {...globalTabProps}
              {...tab.tabProps}
            >
              <Skeleton
                isLoaded={!isLoading && !tab.isCounterLoading && !tab.isLoading}
              >
                <chakra.span
                  fontSize="1rem"
                  fontWeight={400}
                  lineHeight="1.5rem"
                  whiteSpace="nowrap"
                >
                  {isValidElement(tab.title)
                    ? tab.title
                    : typeof tab.title === "function"
                      ? tab.title({ isActive: Boolean(activeIndex === index) })
                      : tab.title}{" "}
                  {typeof tab.count === "number" && `(${tab.count})`}
                </chakra.span>
              </Skeleton>
            </Tab>
          ))}
          {disableIndicator !== true && (
            <TabIndicator
              bottom="0.5px"
              display={
                tabs[activeIndex as any].isCounterLoading ||
                tabs[activeIndex as any].isLoading
                  ? "none"
                  : undefined
              }
              height="1px"
              backgroundColor="neutral.light.7"
              {...indicatorProps}
            ></TabIndicator>
          )}
        </TabList>
      )}

      {tabs.some((tab) => tab.component) && (
        <TabPanels padding={0}>
          {tabs.map((tab) => (
            <TabPanel key={tab.id} padding={0}>
              {tab.component}
            </TabPanel>
          ))}
        </TabPanels>
      )}
    </Tabs>
  )
}

export type TabFloatProps<
  T extends string = string,
  K extends boolean = true,
> = Props<T, K>

export default TabFloat
