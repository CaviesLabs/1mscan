import type { AxiosRequestConfig } from "axios"
import _ from "lodash"
import { RESOURCES } from "./mapping"
import type {
  IResourceBody,
  IResourceName,
  IResourceRootItem,
} from "./resources"

export function getResourceKey<R extends IResourceName>(
  resourceName: R,
  params?: {
    pathParams?: Record<
      string,
      Exclude<Primitive, object | Date> | string[] | undefined | null
    >
    queryParams?: Record<
      string,
      Exclude<Primitive, object | Date> | string[] | undefined | null
    >
    body?: IResourceBody<R>
    noMixing?: boolean
    isInfinite?: boolean
    page?: number
    chain?: string
    method?: AxiosRequestConfig["method"]
  },
): [string, ...string[]] {
  // Create a chain of key parts
  return _.chain<string[]>([resourceName])
    .thru((keys) => {
      if (params?.noMixing) {
        return keys
      }

      const resource = RESOURCES[resourceName] as IResourceRootItem

      return _.chain(keys)
        .tap((keys) => {
          if (resource.endpoint) {
            keys.push(resource.endpoint)
          }
        })
        .tap((keys) => {
          if (params?.chain) {
            keys.push(params.chain)
          }
        })
        .tap((keys) => {
          // Process pathParams if any
          if (params?.pathParams) {
            const pathKeyValuePairs = _.chain(
              params.pathParams as Record<string, string>,
            )
              .toPairs() // Convert to array of [key, value]
              .filter(
                ([key, value]) => Boolean(key) && Boolean(String(value ?? "")),
              ) // Filter out empty keys and values
              .sortBy(0) // Sort by key
              .map(([key, value]) =>
                [
                  "",
                  "path",
                  key,
                  _.castArray(value)
                    .map((x) => String(x ?? ""))
                    .join(","),
                ].join("_"),
              ) // Add prefix '_path_' to key
              .value() // Get the result

            // Add pathKeyValuePairs to keyParts

            keys.push(...pathKeyValuePairs)
          }
        })
        .tap((keys) => {
          // Process queryParams if any
          if (params?.queryParams) {
            const queryKeyValuePairs = _.chain(params.queryParams)
              .toPairs() // Convert to array of [key, value]
              .filter(
                ([key, value]) => Boolean(key) && Boolean(String(value ?? "")),
              ) // Filter out empty keys and values
              .sortBy(0) // Sort by key
              .map(([key, value]) =>
                [
                  "",
                  "query",
                  key,
                  _.castArray(value)
                    .map((x) => String(x ?? ""))
                    .join(","),
                ].join("_"),
              ) // Add prefix '_query_' to key
              .value() // Get the result

            // Add queryKeyValuePairs to keyParts

            keys.push(...queryKeyValuePairs)
          }
        })
        .tap((keys) => {
          // Process body if any
          if (params?.body) {
            const bodyKeyValuePairs = _.chain(params.body)
              .toPairs() // Convert to array of [key, value]
              .filter(([key, value]) => key && value) // Filter out empty keys and values
              .sortBy(0) // Sort by key
              .map(([key, value]) =>
                [
                  "",
                  "body",
                  key,
                  _.castArray(value)
                    .map((x) => JSON.stringify(x ?? ""))
                    .join(","),
                ].join("_"),
              ) // Add prefix '_body_' to key
              .value() // Get the result

            // Add bodyKeyValuePairs to keyParts

            keys.push(...bodyKeyValuePairs)
          }
        })
        .tap((keys) => {
          if (!params?.method) return

          keys.push(`_method_${params.method}_`)
        })
        .tap((keys) => {
          if (!params?.page) return

          keys.push(`_page_${params.page}_`)
        })
        .tap((keys) => {
          if (params?.isInfinite) {
            keys.push("_infinite_")
          }
        })
        .value()
    })
    .value() as [string, ...string[]]
}
