import { useQueryClient } from "@tanstack/react-query"
import type { AxiosRequestConfig } from "axios"
import { authEmitter } from "lib/events/authEmitter"
import type { Params as FetchParams } from "lib/hooks/useFetch"
import { rawFetch } from "lib/hooks/useFetch"
import { pickBy } from "lodash"
import { useCallback } from "react"
import buildUrl from "./buildUrl"
import { RESOURCES } from "./mapping"
import type {
  IResourceBody,
  IResourceName,
  IResourcePathParam,
  IResourceRootItem,
  IResponse,
} from "./resources"

export interface Params<R extends IResourceName> {
  pathParams?: IResourcePathParam<R>
  body?: IResourceBody<R>
  method?: AxiosRequestConfig["method"]
  queryParams?: Record<
    string,
    string | Array<string> | number | boolean | undefined
  >
  fetchParams?: Pick<FetchParams, "body" | "method" | "signal">
  configs?: AxiosRequestConfig
}

export default function useApiFetch() {
  const queryClient = useQueryClient()

  return useCallback(
    async <R extends IResourceName, T = IResponse<R>>(
      resourceName: R,
      {
        pathParams,
        queryParams,
        fetchParams,
        configs,
        body,
        method,
      }: Params<R> = {},
    ) => {
      const resource = RESOURCES[resourceName] as IResourceRootItem

      const headers = pickBy(
        {
          "x-endpoint": undefined,
        },
        Boolean,
      ) as AxiosRequestConfig["headers"]

      const url = buildUrl(resourceName, pathParams, queryParams)

      return rawFetch<T>(
        url,
        {
          headers,
          body,
          method: method || (body && "POST") || undefined,
          ...fetchParams,
        },
        {
          withCredentials: resource.needCredentials || undefined,
          ...configs,
        },
      ).catch((error) => {
        if (error.status === 401 || error.status === 403) {
          authEmitter.emit("AUTH::INVALID", error)
          // console.log(authEmitter.listenerCount("AUTH::INVALID"));
        }
        return Promise.reject(error)
      })
    },
    [queryClient],
  )
}
