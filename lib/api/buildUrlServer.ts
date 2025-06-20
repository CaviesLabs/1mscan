import type { ChainKey } from "configs/frontend/chain/data"
import type { NextPageContext } from "next"
import type { GetServerSidePropsContext } from "nextjs-routes"
import { compile } from "path-to-regexp"
import queryString from "query-string"
import { appendNodeSlug } from "./appendNodeSlug"
import { RESOURCES } from "./mapping"
import type {
  IResourceName,
  IResourcePathParam,
  IResourceRootItem,
} from "./resources"

export const buildUrlServer = <R extends IResourceName>(
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
  chainKey: ChainKey,
  pathParams?: IResourcePathParam<R>,
  queryParams?:
    | Record<string, Primitive | Primitive[] | undefined | null>
    | undefined,
): string => {
  const resource = RESOURCES[resourceName] as IResourceRootItem

  const resourceUrl = appendNodeSlug(resource.endpoint, chainKey)

  // Compile the path using pathParams (if any)
  const compiledPath = compile(resource.path)(pathParams || {})

  const sourceUrl = `${resourceUrl}${compiledPath}`

  if (resource.defaultFilters) {
    queryParams = {
      ...(resource.defaultFilters || {}),
      ...(queryParams || {}),
    }
  }

  const qs = queryString.stringify(queryParams || {}, {
    skipNull: true,
    skipEmptyString: true,
  })

  return `${sourceUrl}${qs ? `?${qs}` : ""}`
}
