"use client"

import { useCacheMemo } from "lib/hooks/useShallow"
import { isEqual } from "lodash"
import { type ComponentType, memo } from "react"

type Props = {
  isActive: boolean
  inputs: Record<string, any>
  view: ComponentType<Record<string, unknown>>
}

const DistributeLazy = ({ isActive, inputs, view: View }: Props) => {
  const isMounted = useCacheMemo<boolean>(
    (prev) => (isActive ? true : prev),
    [isActive],
    {
      initial: isActive,
    },
  )

  const internalProps = useCacheMemo<Record<string, any>>(
    (prev) => (!isActive ? prev : inputs),
    [inputs, isActive],
    {
      initial: undefined,
    },
  )

  if (!isMounted) return null

  return <View {...internalProps} isActive={isActive} />
}

export default memo(DistributeLazy, (prev, next) => {
  return (
    prev.isActive === next.isActive &&
    prev.view === next.view &&
    isEqual(prev.inputs, next.inputs)
  )
})
