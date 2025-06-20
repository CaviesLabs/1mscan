import { Box, type ButtonProps, Skeleton, chakra } from "@chakra-ui/react"
import {
  type ForwardedRef,
  type default as React,
  type ReactNode,
  memo,
  useCallback,
  useMemo,
} from "react"
import { multipleRef } from "ui/utils/dom"
import { useSnapshot } from "valtio"
import type { IStore, TabItem } from "./types"

type BaseItemProps<T extends TabItem<object, any>> = Partial<
  Omit<ButtonProps, "children" | "onClick">
> & {
  store: IStore
  tab: T
  clickPrevented?: React.MutableRefObject<boolean>
  mapItem: (
    props: {
      index: number
      isActive: boolean
      isCount: boolean
    } & T,
  ) => ReactNode
  setTabQuery: (id: T["id"]) => Promise<boolean> | undefined
  onClick?: (id: T["id"]) => any
  index: number
  ref?: ForwardedRef<HTMLButtonElement>
  allowToggle?: boolean
}

const BaseItem = ({
  store,
  tab,
  clickPrevented,
  onClick,
  isLoading,
  mapItem: MapItem,
  setTabQuery,
  index,
  ref,
  allowToggle,
  ...props
}: BaseItemProps<TabItem<object, any>>) => {
  const snap = useSnapshot(store)

  const handleClick = useCallback(
    (onClick?: AnyFunction) => {
      if (clickPrevented?.current) {
        console.log("click prevented")
        return // Do nothing if the tab was dragged
      }
      if (tab.comingSoon || tab.isDisabled) return

      const nextId = allowToggle
        ? tab.id === store.active_id
          ? ""
          : tab.id
        : tab.id

      return setTabQuery?.(nextId)
        ?.then(() => {
          store.set_active_id = nextId
        })
        .finally(() => {
          onClick?.(nextId)
        })
    },
    [tab.id, setTabQuery, tab.comingSoon, tab.isDisabled, allowToggle],
  )

  const isCount = useMemo(() => !Number.isNaN(Number(tab.count)), [tab.count])

  const totalIsLoading = tab.isLoading || isLoading

  return (
    <chakra.button
      role="group"
      overflow="hidden"
      data-counterloading={tab.isCounterLoading}
      aria-disabled={tab.comingSoon || tab.isDisabled}
      aria-selected={snap.active_id === tab.id}
      onClick={handleClick.bind(null, onClick)}
      _selected={{
        color: "neutral.light.8",
      }}
      _hover={{
        color: "neutral.light.8",
      }}
      color="neutral.light.6"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      verticalAlign="middle"
      textStyle="1"
      borderRadius="0.75rem"
      flexShrink={0}
      position="relative"
      transition="all 0.2s ease-in-out"
      {...props}
      ref={(el) => multipleRef(el, ref)}
    >
      {totalIsLoading && (
        <Box
          position="absolute"
          inset={0}
          zIndex={1}
          width="full"
          height="full"
          flexShrink={0}
          backgroundColor="neutral.light.2"
        >
          <Skeleton width="full" height="full" />
        </Box>
      )}
      <MapItem
        {...tab}
        isActive={snap.active_id === tab.id}
        isCount={isCount}
        title={tab.title}
        count={tab.count}
        index={index}
      />
    </chakra.button>
  )
}

export default memo(BaseItem, (prev, next) => {
  return (
    prev.tab === next.tab &&
    prev.isLoading === next.isLoading &&
    prev.tab.isDisabled === next.tab.isDisabled &&
    prev.ref === next.ref &&
    prev.allowToggle === next.allowToggle
  )
}) as <T extends TabItem<object, any>>(props: BaseItemProps<T>) => ReactNode
