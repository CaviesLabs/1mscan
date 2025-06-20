import { HStack, Skeleton, chakra } from "@chakra-ui/react"
import { memo, useMemo } from "react"

import type BigNumber from "bignumber.js"
import type { TabItem } from "./components/types"

const COUNTER_OVERLOAD = 50

type Props = {
  count?: BigNumber.Value | Falsy
  isLoading?: boolean
  isActive?: boolean
  isCount?: boolean
} & Pick<TabItem<object, any>, "isOverflow">

const TabCounter = ({
  count: _count,
  isLoading,
  isActive,
  isOverflow,
  isCount,
}: Props) => {
  const count = useMemo(() => Number(_count as any), [_count])

  const isOverload = useMemo(
    () => isOverflow || count > COUNTER_OVERLOAD,
    [count, isOverflow],
  )

  if (!isLoading && !isCount) return <></>

  if (isLoading) {
    return (
      <Skeleton
        display="flex"
        minWidth="2.625rem"
        borderRadius="0.75rem"
        height="1.75rem"
        alignItems="center"
        startColor={isActive ? "rgba(255, 255, 255, 0.08)" : undefined}
        endColor={isActive ? "rgba(255, 255, 255, 0.8)" : undefined}
        flexShrink={0}
      ></Skeleton>
    )
  }
  return (
    <HStack
      minWidth="2.625rem"
      height="1.75rem"
      aria-selected={isActive}
      textStyle="1"
      alignItems="center"
      justifyContent="center"
      backgroundColor="neutral.light.3"
      _selected={{
        backgroundColor: "neutral.light.6",
        color: "neutral.light.1",
      }}
      color="neutral.light.7"
      borderRadius={3}
      paddingX={2}
      paddingY={1}
      display="inline-flex"
    >
      <chakra.span>
        {isOverload ? `${COUNTER_OVERLOAD}+` : count.toFixed()}
      </chakra.span>
    </HStack>
  )
}

export default memo(TabCounter, (prev, next) => {
  return (
    prev.count === next.count &&
    prev.isLoading === next.isLoading &&
    prev.isActive === next.isActive &&
    prev.isCount === next.isCount &&
    prev.isOverflow === next.isOverflow
  )
})
