import { type ReactNode, memo } from "react"
import SkeletonText from "../text/SkeletonText"
import {
  BasePanels,
  BaseTabs,
  type BaseTabsProps,
  type MatchTabItem,
  type None,
  type TabItem,
} from "./components"

const MapItemCounter = ({
  count: _count,
  isCounterLoading,
  isOverflow,
  isLoading,
  isCount,
}: {
  count: TabItem<object, any>["count"]
  isLoading?: boolean
  isCounterLoading?: boolean
  isCount?: boolean
  isOverflow?: boolean
}) => {
  const count = Number(_count)

  if (!isLoading && !isCount) return <></>

  const isOverload = isOverflow || count > 50

  return (
    <SkeletonText isLoading={isCounterLoading}>
      {`(${isOverload ? "50+" : count.toFixed()})`}
    </SkeletonText>
  )
}

const MapItem = memo(
  ({
    title,
    isCount,
    count,
    isOverflow,
    isLoading,
    isCounterLoading,
  }: TabItem<object, any> & { isCount: boolean }) => {
    return (
      <>
        {title}
        <MapItemCounter
          count={count}
          isCounterLoading={isCounterLoading}
          isOverflow={isOverflow}
          isLoading={isLoading}
          isCount={isCount}
        />
      </>
    )
  },
  (prev, next) => {
    return (
      prev.title === next.title &&
      prev.count === next.count &&
      prev.isCounterLoading === next.isCounterLoading &&
      prev.isLoading === next.isLoading &&
      prev.isOverflow === next.isOverflow &&
      prev.isCount === next.isCount
    )
  },
)

type Props<L extends (TabItem<object, any> | None)[]> = {
  id: string
  tabs: {
    [N in keyof L]: MatchTabItem<L[N]>
  }
  isActive?: boolean
  middleSlot?: ReactNode
} & Pick<
  BaseTabsProps<L>,
  | "onChange"
  | "indicatorProps"
  | "cleanupOnTabChange"
  | "hideOnSingle"
  | "isLoading"
  | "itemProps"
  | "listProps"
>

const ScrollTabFloat = <L extends (TabItem<object, any> | None)[]>({
  tabs,
  onChange,
  isLoading,
  id,
  indicatorProps,
  cleanupOnTabChange,
  middleSlot,
  hideOnSingle,
  itemProps,
  listProps,
  isActive,
  ...props
}: Props<L>) => {
  return (
    <BaseTabs
      id={id}
      isLoading={isLoading}
      tabs={tabs as never}
      onChange={onChange}
      indicatorProps={{
        backgroundColor: "neutral.light.7",
        height: "1px",
        bottom: "0.5px",
        zIndex: 0,
        transitionProperty: "transform, width",
        ...indicatorProps,
      }}
      itemProps={{
        height: "2rem",
        paddingY: 2,
        gap: 2,
        alignItems: "center",
        paddingX: 5,
        zIndex: 0,
        ...itemProps,
      }}
      cleanupOnTabChange={cleanupOnTabChange}
      hideOnSingle={hideOnSingle}
      enabledIndicator
      listProps={listProps}
      {...props}
      mapItem={MapItem}
    >
      {middleSlot}
      {tabs?.some((tab: any) => tab?.component) && (
        <BasePanels isActive={isActive} />
      )}
    </BaseTabs>
  )
}

export default memo(ScrollTabFloat) as <
  L extends (TabItem<object, any> | None)[],
>(
  props: Props<L>,
) => ReactNode
