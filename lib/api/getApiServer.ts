import { getServerChain } from "configs/server/chain"
import type { Params as FetchParams } from "lib/hooks/useFetch"
import { getCache } from "lib/memory"
import type { NextPageContext } from "next"
import type { GetServerSidePropsContext } from "nextjs-routes"
import { buildUrlServer } from "./buildUrlServer"
import { getResourceKey } from "./getResourceKey"
import type { IResourceName, IResourcePathParam, IResponse } from "./resources"

export interface Params<R extends IResourceName> {
  pathParams?: IResourcePathParam<R>
  queryParams?: Record<
    string,
    string | Array<string> | number | boolean | undefined
  >
  fetchParams?: Pick<FetchParams, "body" | "method" | "signal">
  noCache?: boolean
}

export default async function getApiServer<R extends IResourceName>(
  context:
    | GetServerSidePropsContext
    | (Partial<NextPageContext> & Required<Pick<NextPageContext, "query">>)
    | {
        query: {
          chain: string
        }
        req: {
          headers: {
            host: string
            cookie?: string
          }
        }
      },
  resourceName: R,
  { pathParams, queryParams, fetchParams, noCache }: Params<R> = {},
) {
  const chainKey = getServerChain(context.query, context.req)

  const queryFn = async () => {
    const url = buildUrlServer(
      context,
      resourceName,
      chainKey,
      pathParams,
      queryParams,
    )

    console.log("url", url)

    const response = await fetch(url, {
      method: fetchParams?.method || "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: fetchParams?.body ? JSON.stringify(fetchParams.body) : undefined,
      signal: fetchParams?.signal,
    })

    if (!response.ok) {
      console.error(`Failed to fetch: ${response.statusText}`)
      return
    }

    const data = (await response.json()) as IResponse<R>

    return data
  }

  if (noCache) {
    return queryFn()
  }

  const cacheKey = getResourceKey(resourceName, {
    pathParams,
    queryParams,
    chain: chainKey,
  }).join("&")

  return getCache(cacheKey, queryFn, 1000 * 60 * 1) as IResponse<R> | undefined
}
