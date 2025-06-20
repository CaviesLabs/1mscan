import { customThrottle, useMemoEffect } from "lib/hooks/useShallow"
import { debounce } from "lodash"
import { useRouter } from "next/router"
import { useCallback, useMemo, useRef, useState } from "react"
import getQueryParamString from "./getQueryParamString"
import { setQuery } from "./setQuery"

// export const useSetStateQuery = <
//   T extends string | string[] | undefined = string | undefined,
//   R extends Primitive | Primitive[] | undefined = T,
//   E extends Primitive | Primitive[] | undefined = T,
// >(
//   queryName: any,
//   watch?: any[],
//   options?: Options & {
//     cleanUp?: { keepQueries?: string[] };
//     removeQueries?: string[];
//     autoArray?: boolean;
//     decode?: (value: T) => R;
//     encode?: (value: E) => T;
//     isDisabled?: boolean;
//   },
// ): [R, (nextValue: E | ((e: R) => E)) => void] => {
//   const router = useRouter();
//   const setQuery = useSetQuery(queryName, options);
//   const [value, setValue] = useWatchState<R>(
//     getQueryParamString(router.query[queryName]) as never,
//     watch,
//     {
//       ...options,
//       transform: options?.decode as any,
//     },
//   );

//   return [
//     value,
//     (nextValue) => {
//       const encoded = options?.encode
//         ? options.encode(
//             typeof nextValue === "function" ? nextValue(value) : nextValue,
//           )
//         : typeof nextValue === "function"
//           ? nextValue(value)
//           : nextValue;
//       setValue(encoded, {
//         preset: () => {
//           setQuery(encoded);
//         },
//       });
//     },
//   ];
// };

export const useSetStateQuery = <
  T extends string | string[] | undefined = string | undefined,
  R extends Primitive | Primitive[] | undefined = T,
  E extends Primitive | Primitive[] | undefined = T,
>(
  queryName: string,
  _ = [],
  options?: {
    isActive?: boolean
    debounce?: number
    throttle?: number
    decode?: (value: T) => R
    encode?: (value: E) => T
    cleanUp?: { keepQueries?: string[] }
    removeQueries?: string[]
  },
): [R, (nextValue: E | ((e: R) => E)) => void] => {
  const router = useRouter()

  const queryValue = useMemo(() => {
    return getQueryParamString(router.query[queryName])
  }, [router.query[queryName]])

  const valueRef = useRef<any>(queryValue)
  const [, forceUpdate] = useState(0)

  useMemoEffect(() => {
    if (options?.isActive === false) return
    valueRef.current = queryValue
  }, [queryValue, options?.isActive])

  const setValue = useCallback(
    (options?.throttle ? customThrottle : debounce)(
      (nextValueOrFunction: any) => {
        const nextValue =
          typeof nextValueOrFunction === "function"
            ? nextValueOrFunction(valueRef.current)
            : nextValueOrFunction

        const tempValue = options?.encode
          ? options.encode(nextValue)
          : nextValue
        const lastValue = valueRef.current
        valueRef.current = tempValue
        if (lastValue !== tempValue) {
          forceUpdate((prev) => prev + 1)
        }
        setQuery(queryName, tempValue, {
          cleanUp: options?.cleanUp,
          removeQueries: options?.removeQueries,
        })
      },
      options?.throttle || options?.debounce || 100,
    ),
    [
      options?.throttle,
      options?.debounce,
      queryName,
      options?.cleanUp,
      options?.removeQueries,
    ],
  )

  const value = useMemo(() => {
    try {
      if (options?.decode) return options.decode(valueRef.current)
      return valueRef.current
    } catch (error) {
      console.log(error)
      return null
    }
  }, [valueRef.current, options?.decode])

  return [value, setValue]
}
