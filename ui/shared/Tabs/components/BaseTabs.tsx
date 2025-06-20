import {
  HStack,
  Tab,
  type TabIndicatorProps,
  TabList,
  type TabListProps,
  type TabProps,
  Tabs,
  type TabsProps,
} from "@chakra-ui/react"
import { useSetQuery } from "lib/router/useSetQuery"
import {
  type ForwardedRef,
  type ReactNode,
  memo,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react"
import { generateKey } from "stubs/utils"
import { useSnapshot } from "valtio"
import BaseIndicator from "./BaseIndicator"
import BaseItem from "./BaseItem"
import BaseProvider from "./BaseProvider"
import BaseTrigger from "./BaseTrigger"
import type { BaseItemState, IStore, None, TabItem } from "./types"

type BaseTabsProps<L extends (TabItem<object, any> | None)[]> = {
  /**
   * Array of tab items filtered to render
   */
  tabs: {
    [N in keyof L]: L[N] extends
      | {
          component: React.ComponentType<infer P>
          props: infer H
        }
      | None
      ? P extends {}
        ? H extends P
          ? L[N]
          : {
              component: Exclude<L[N], None>["component"]
              props: P
            }
        : {
            component: Exclude<L[N], None>["component"]
            props: P
          }
      :
          | {
              component: Exclude<L[N], None>["component"]
              props: object
            }
          | None
  }
  id?: string
  cleanupOnTabChange?: boolean | { keepQueries?: string[] }
  isLoading?: boolean
  onChange?: (value: Exclude<L[number], None>["id"]) => void
  indicatorProps?: Partial<TabIndicatorProps>
  mapItem: (props: BaseItemState<Exclude<L[number], None>>) => ReactNode
  children?: ReactNode
  hideOnSingle?: boolean
  ref?: ForwardedRef<BaseTabsState>
  rightSlot?:
    | ReactNode
    | ((props: {
        id: string
        activeId: Exclude<L[number], None>["id"]
      }) => ReactNode)
  enabledIndicator?: boolean
  listProps?: TabListProps
  itemProps?: TabProps
  noFallback?: boolean
  allowToggle?: boolean
} & Omit<TabsProps, "onChange" | "children">

export type BaseTabsState = {
  setTabQuery?: (value: any) => Promise<boolean> | undefined
}

const BaseTabs = ({
  tabs: _tabs,
  id = "tab",
  cleanupOnTabChange,
  isLoading,
  onChange,
  indicatorProps,
  mapItem,
  children,
  hideOnSingle,
  rightSlot,
  enabledIndicator,
  itemProps,
  listProps,
  ref,
  noFallback,
  allowToggle,
  ...props
}: BaseTabsProps<any>) => {
  const tabs = useMemo(() => {
    return _tabs.filter(Boolean) as TabItem<object, any>[]
  }, [_tabs])

  const store = useStore<IStore>({
    _active_id: (!noFallback && tabs?.[0]?.id) || "",
    set set_active_id(id: string) {
      if (this._active_id === id) return
      this._active_id = id
      onChange?.(id as any)
    },
    get active_id() {
      return this._active_id
    },
  } as IStore & {
    _active_id: string
  })

  const setTabQuery = useSetQuery(id, {
    throttle: 200,
    removeQueries: ["page"],
    cleanUp: cleanupOnTabChange
      ? {
          keepQueries: [
            ...((cleanupOnTabChange as any)["keepQueries"] || []),
            "tab",
            id,
          ],
        }
      : undefined,
    prefetchDebounce: 300,
  })

  useImperativeHandle(
    ref,
    () => {
      return {
        setTabQuery,
      }
    },
    [tabs, ref, setTabQuery],
  )

  const snap = useSnapshot(store)
  const tabListRef = useRef<HTMLDivElement | null>(null)
  return (
    <BaseProvider tabs={tabs} store={store} isLoading={isLoading}>
      <BaseTrigger
        id={id}
        store={store}
        tabListRef={tabListRef}
        noFallback={noFallback}
      />

      <Tabs
        variant="unstyled"
        flex={1}
        position="relative"
        defaultIndex={0}
        maxWidth="full"
        index={tabs.findIndex((tab) => tab.id === snap.active_id)}
        {...props}
      >
        <HStack
          flex={1}
          overflow="hidden"
          justifyContent="space-between"
          gap={4}
        >
          {(!hideOnSingle || tabs.length > 1) && (
            <TabList
              overflowX="auto"
              overflowY="hidden"
              gap={3}
              position="relative"
              {...listProps}
              sx={{
                /* Hide scrollbar for Webkit-based browsers (e.g., Chrome, Safari) */
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                /* Hide scrollbar for IE and Edge */
                msOverflowStyle: "none",
                /* Hide scrollbar for Firefox */
                scrollbarWidth: "none",
                ...(listProps?.sx || {}),
              }}
              ref={tabListRef}
            >
              {tabs.map((tab, index) => {
                return (
                  <BaseItem
                    as={Tab}
                    tab={tab as any}
                    key={generateKey(index, true, tab.id)}
                    store={store}
                    setTabQuery={setTabQuery}
                    isLoading={isLoading}
                    onMouseOver={async () => {
                      setTabQuery.prefetch(tab.id)
                    }}
                    index={index}
                    mapItem={mapItem}
                    allowToggle={allowToggle}
                    {...itemProps}
                  ></BaseItem>
                )
              })}
              {enabledIndicator && (
                <BaseIndicator isLoading={isLoading} {...indicatorProps} />
              )}
            </TabList>
          )}

          {typeof rightSlot === "function"
            ? rightSlot({ id, activeId: snap.active_id })
            : rightSlot}
        </HStack>
        {children}
      </Tabs>
    </BaseProvider>
  )
}

export type { BaseTabsProps }

export default memo(BaseTabs) as <T extends (TabItem<object, any> | None)[]>(
  props: BaseTabsProps<T>,
) => ReactNode
