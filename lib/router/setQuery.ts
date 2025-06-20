import { chainKey } from "configs/frontend/chain/utils"
import { omit } from "lodash"
import Router from "next/router"
import type { Route } from "nextjs-routes"
import { toQueryString } from "./toQueryString"

export const setQuery = (
  queryName: string,
  value: any,
  options?: {
    hash?: string
    pathname?: Route["pathname"]
    cleanUp?: { keepQueries?: string[] }
    removeQueries?: string[]
    isPush?: boolean
  },
) => {
  return Router[options?.isPush ? "push" : "replace"](
    {
      pathname: options?.pathname || Router.pathname,
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
}

export const setRouter = (
  pathname: Route["pathname"] | "current" | string,
  query: Record<string, any>,
  options?: {
    hash?: string
    isReplace?: boolean
    cleanQuery?: boolean
    scroll?: boolean
  },
) => {
  return Router[options?.isReplace ? "replace" : "push"](
    {
      pathname:
        (pathname !== "current" ? pathname : undefined) || Router.pathname,
      query: {
        ...(options?.cleanQuery ? {} : Router.query),
        ...query,
        chain: chainKey,
      },
      hash: options?.hash || Router.asPath.split("#")[1] || "",
    },
    undefined,
    { scroll: options?.scroll ?? true, shallow: true },
  )
}
