import { chainKey } from "configs/frontend/chain/utils"
import type { Options } from "lib/hooks/useShallow"
import { useShallowHandler } from "lib/hooks/useShallow"
import { omit } from "lodash"
import Router from "next/router"
import { route } from "nextjs-routes"
import { toQueryString } from "./toQueryString"

export const usePrefetchQuery = (
  queryName: any,
  options?: Options & {
    cleanUp?: { keepQueries?: string[] }
    removeQueries?: string[]
  },
) =>
  useShallowHandler(
    (value: any) => {
      const url = route({
        pathname: Router.pathname as any,
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
      })

      return Router.prefetch(url)
    },
    [queryName],
    {
      ...options,
      debounce: (options?.throttle ? 0 : (options?.debounce ?? 100)) as any,
    },
  )
