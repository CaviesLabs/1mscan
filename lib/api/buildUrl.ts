"use client"

import { chainKey } from "configs/frontend/chain/utils"
import { compile } from "path-to-regexp"
import queryString from "query-string"
import { appendNodeSlug } from "./appendNodeSlug"
import { RESOURCES } from "./mapping"
import type {
  IResourceName,
  IResourcePathParam,
  IResourceRootItem,
} from "./resources"

export default function buildUrl<R extends IResourceName>(
  resourceName: R,
  pathParams?: IResourcePathParam<R>,
  queryParams?:
    | Record<string, Primitive | Primitive[] | undefined | null>
    | undefined,
): string {
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
