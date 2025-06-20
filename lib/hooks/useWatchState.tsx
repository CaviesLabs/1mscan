import { debounce } from "lodash"
import { useCallback, useMemo, useState } from "react"
import { customThrottle, useShallowEffect } from "./useShallow"

const handleTransform = <T, R>(
  value: T | undefined,
  transform?: (value: T | undefined) => R,
) => {
  if (transform) {
    return transform(value)
  }
  return value as R | undefined
}

export const useWatchState = <T, R = T>(
  state?: T,
  watch?: any[],
  options?: {
    debounce?: number
    throttle?: number
    transform?: (value: T | undefined) => R
  },
) => {
  // const tabFreeze = useTabFreezeContext();
  // const isFreeze = tabFreeze?.isFreeze;

  const [local, setLocal] = useState(state)
  const timingSetLocal = useCallback(
    (options?.throttle ? customThrottle : debounce)(
      (value, opts?: { preset?: (value: R) => void }) => {
        // if (isFreeze) return;
        if (opts?.preset) {
          opts.preset(value)
        }

        setLocal(value)
      },
      options?.throttle || options?.debounce || 0,
    ),
    [options?.debounce, options?.throttle],
  )

  useShallowEffect(() => {
    // if (isFreeze) return;

    setLocal(state)
  }, [state, ...(watch || [])])

  const transformed = useMemo(
    () => handleTransform(local, options?.transform),
    [local, options?.transform],
  )

  return [transformed, timingSetLocal] as [
    R,
    (
      value: T | ((pre: T) => T),
      opts?: { preset?: (value: R) => void },
    ) => void,
  ]
}
