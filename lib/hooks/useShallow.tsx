import type { DebouncedFuncLeading } from "lodash"
import { cloneDeep, debounce, isEqual } from "lodash"
import type { DependencyList, EffectCallback } from "react"
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"

function deepCompareEquals(a: any, b: any) {
  // TODO: implement deep comparison here
  // something like lodash
  return isEqual(a, b)
}

function useDeepCompareMemoize(value: any) {
  const ref = useRef<any>(null)
  // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = cloneDeep(value)
  }

  return ref.current
}

export function customThrottle<
  T extends (...args: any) => any = (...args: any) => any,
>(func: T, wait: number) {
  let lastExecuted = 0
  let result: ReturnType<T> | undefined = undefined

  return (...args: Parameters<T>) => {
    const now = Date.now()

    if (now - lastExecuted >= wait) {
      lastExecuted = now
      // @ts-ignore
      result = func(...args)
    }
    return result
  }
}

export type Options = { defer?: boolean; once?: boolean } & (
  | { debounce?: number; throttle?: never }
  | { debounce?: never; throttle?: number }
)

const useKeeper = (options?: Options) => {
  return useMemo(() => {
    if (options?.throttle) {
      return customThrottle((dependencies) => dependencies, options?.throttle)
    }
    if (options?.debounce) {
      return debounce((dependencies) => dependencies, options?.debounce)
    }
    return ((dependencies) => dependencies) as DebouncedFuncLeading<
      (dependencies: DependencyList) => DependencyList
    >
  }, [options?.throttle, options?.debounce])
}

export function useShallowEffect(
  callback: EffectCallback,
  dependencies: DependencyList,
  options?: Options,
) {
  const isMountingRef = useRef(!options?.defer ? true : false)
  useEffect(() => {
    if (!options?.defer) return
    isMountingRef.current = true
  }, [])

  const keeperFunction = useKeeper(options)

  const isOnceOkRef = useRef(false)

  useEffect(
    () => {
      if (isMountingRef.current) {
        if (!callback) return
        if (options?.once && isOnceOkRef.current) return
        const onUnmout = callback()
        isOnceOkRef.current = true
        return () => {
          onUnmout?.()
          callback = null as any
        }
      } else {
        isMountingRef.current = false
      }
    },
    keeperFunction(dependencies.map(useDeepCompareMemoize)),
  )
}

export function useShallowLayoutEffect(
  callback: EffectCallback,
  dependencies: DependencyList,
  options?: Options,
) {
  const memorizeRef = useRef<DependencyList>(
    options?.defer ? dependencies : [Math.random()],
  )

  if (!deepCompareEquals(dependencies, memorizeRef.current)) {
    memorizeRef.current = cloneDeep(dependencies)

    callback()
  }
}

export function useShallowMemo<T>(
  factory: () => T,
  dependencies: DependencyList,
  options?: {
    initial?: T
    debounce?: number
    reactivity?: boolean
  },
  // options?: Options & { callback?: EffectCallback; defer?: boolean },
) {
  // const isMountingRef = useRef(!options?.defer ? true : false);
  // useEffect(() => {
  //   if (!options?.defer) return;
  //   isMountingRef.current = true;
  // }, []);

  const [, forceUpdate] = useState(0)

  const cacheRef = useRef<T>(options?.initial as T)

  const debounced = useCallback(
    debounce((callback: AnyFunction<T>) => {
      cacheRef.current = callback(cacheRef.current)
      if (options?.reactivity) {
        forceUpdate((prev) => prev + 1)
      }
    }, options?.debounce || 100),
    [],
  )

  return useMemo<T>(() => {
    // if (isMountingRef.current) {
    //   options?.callback?.();
    // } else {
    //   isMountingRef.current = false;
    // }

    if (options?.debounce) {
      debounced(factory)
      return cacheRef.current
    }

    return factory()
  }, dependencies.map(useDeepCompareMemoize))
}

export const useShallowMemoRef = <T,>(
  factory: (props: { pre: T }) => T,
  dependencies: DependencyList,
) => {
  const memorizeResultRef = useRef<T>(undefined as T)
  useShallowMemo(() => {
    memorizeResultRef.current = factory({
      pre: memorizeResultRef.current,
    })
  }, dependencies)
  return memorizeResultRef
}

export function useShallowLayoutMemo<T>(
  factory: () => T,
  dependencies: DependencyList,
) {
  const memorizeRef = useRef<DependencyList>([Math.random()])
  const memorizeResultRef = useRef<T>(factory())
  if (!deepCompareEquals(dependencies, memorizeRef.current)) {
    memorizeRef.current = cloneDeep(dependencies)
    memorizeResultRef.current = factory()
  }
  return memorizeResultRef.current
}

export function useShallowLayoutMemoRef<T>(
  factory: () => T,
  dependencies: DependencyList,
) {
  const memorizeRef = useRef<DependencyList>([Math.random()])
  const memorizeResultRef = useRef<T>(factory())
  if (!deepCompareEquals(dependencies, memorizeRef.current)) {
    memorizeRef.current = cloneDeep(dependencies)
    memorizeResultRef.current = factory()
  }
  return memorizeResultRef
}

export const useShadowCallback = <T extends AnyFunction>(
  callback: T,
  dependencies: DependencyList,
  options?: Options,
) => {
  const keeperFunction = useKeeper(options)

  return useCallback(
    callback,
    keeperFunction(dependencies.map(useDeepCompareMemoize)),
  )
}

export const useShallowHandler = <T extends AnyFunction>(
  callback: T,
  dependencies: DependencyList,
  options?: Options,
) => {
  const keeperFunction = useKeeper()

  const handler = useCallback(
    callback,
    keeperFunction(dependencies.map(useDeepCompareMemoize)),
  )

  const setQuery = useCallback(
    options?.throttle
      ? customThrottle(handler, options?.throttle)
      : debounce(handler, options?.debounce || 100),
    [options?.throttle, options?.debounce],
  )
  return setQuery
}

export const useShallowIsMounted = (
  dependencies: any[],
  options?: {
    disabled?: boolean
  },
) => {
  const isMountedRef = useRef(Boolean(options?.disabled))
  const isMounted = useMemo(() => {
    if (isMountedRef.current) return true
    if (dependencies.every(Boolean)) {
      isMountedRef.current = true
      return true
    }
    return false
  }, dependencies)

  return [isMounted, isMountedRef] as const
}

export const useCacheMemo = <T,>(
  callback: (prev: T) => T,
  dependencies: DependencyList,
  options?: {
    initial?: T
  },
) => {
  const cacheRef = useRef<T>(options?.initial as T)
  return useMemo(() => {
    const next = callback(cacheRef.current)
    cacheRef.current = next
    return next
  }, dependencies)
}

export const useMemoEffect = (
  callback: EffectCallback,
  dependencies: DependencyList,
) => {
  const cleanup = useMemo(callback, dependencies)
  useLayoutEffect(() => cleanup, [cleanup])
}

// export const useDebounceMemo = <T,>(
//   callback: (prev: T) => T,
//   initial: T,
//   dependencies: DependencyList,
//   options?: {
//     wait?: number;
//   },
// ) => {
//   const cacheRef = useRef<T>(initial);
//   const debounced = useCallback(
//     debounce((callback: AnyFunction<T>) => {
//       cacheRef.current = callback(cacheRef.current);
//     }, options?.wait || 100),
//     [],
//   );
//   return useMemo(() => {
//     debounced(callback);
//     return cacheRef.current;
//   }, dependencies);
// };
