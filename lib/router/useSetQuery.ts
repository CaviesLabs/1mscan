import { chainKey } from "configs/frontend/chain/utils"
import type { Options } from "lib/hooks/useShallow"
import { useShallowHandler } from "lib/hooks/useShallow"
import { omit } from "lodash"
import Router from "next/router"
import { useMemo } from "react"
import { toQueryString } from "./toQueryString"
import { usePrefetchQuery } from "./usePrefetchQuery"

export const useSetQuery = (
  queryName: any,
  options?: Options & {
    cleanUp?: { keepQueries?: string[] }
    removeQueries?: string[]
    prefetchDebounce?: number
    hash?: string
  },
) => {
  const prefetchQuery = usePrefetchQuery(queryName, {
    debounce: options?.prefetchDebounce,
  })

  const handler = useShallowHandler(
    (value: any) => {
      return Router.replace(
        {
          pathname: Router.pathname,
          query: omit(
            {
              ["chain"]: chainKey,
              ...(options?.cleanUp ? {} : Router.query),
              ...Object.fromEntries(
                (options?.cleanUp?.keepQueries || []).map((key) => [
                  key,
                  Router.query[key],
                ]),
              ),
              [queryName]: toQueryString(value),
            },
            ...(options?.removeQueries || []),
          ),
          hash: options?.hash || Router.asPath.split("#")[1],
        },
        undefined,
        { scroll: false, shallow: true },
      )
    },
    [queryName],
    {
      ...options,
      debounce: (options?.throttle ? 0 : (options?.debounce ?? 100)) as any,
    },
  )

  const extendedHandler = useMemo(() => {
    ;(handler as any).prefetch = prefetchQuery
    return handler as typeof handler & { prefetch: typeof prefetchQuery }
  }, [handler, prefetchQuery])
  return extendedHandler
}
