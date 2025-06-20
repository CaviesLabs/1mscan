/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
} from "axios"
import axios from "axios"

import isBodyAllowed from "lib/api/isBodyAllowed"
import _ from "lodash"
import { useCallback } from "react"

export interface Params {
  method?: AxiosRequestConfig["method"] // Adjusted to string to align with axios method types
  headers?: AxiosRequestConfig["headers"]
  signal?: AbortSignal
  body?: Record<string, unknown> | FormData
  queries?: Record<string, unknown>
}

export type IFetchError = {
  payload: Error | undefined
  status: number | undefined
  statusText: string | undefined
  headers: AxiosResponseHeaders | undefined
  config: InternalAxiosRequestConfig | undefined
  request: any | undefined
}

export const rawFetch = async <T = any, _ = any>(
  url: string,
  options?: Params,
  configs?: AxiosRequestConfig,
): Promise<T> => {
  const _body = options?.body
  const isFormData = _body instanceof FormData
  const withBody = isBodyAllowed(options?.method)

  const data: FormData | Record<string, unknown> | undefined = _.chain(
    undefined,
  )
    .thru(() => {
      if (!withBody) {
        return
      }

      if (isFormData) {
        return _body
      }

      return _body as Record<string, unknown>
    })
    .value()

  return await axios({
    ...configs,
    url: url,
    params: options?.queries,
    method: options?.method,
    headers: {
      ...(withBody && !isFormData
        ? { "Content-type": "application/json" }
        : undefined),
      ...options?.headers,
    },
    data,
    signal: options?.signal,
  })
    .then((success) => success.data as T)
    .catch((error: AxiosError | Error) => {
      if (axios.isAxiosError(error)) {
        return Promise.reject({
          payload: error.response?.data as Error | undefined,
          status: error.response?.status,
          statusText: error.response?.statusText,
          headers: error.response?.headers,
          config: error.response?.config,
          request: error.response?.request,
        })
      } else {
        return Promise.reject({
          payload: error,
          status: undefined,
          statusText: undefined,
          headers: undefined,
          config: undefined,
          request: undefined,
        })
      }
    })
}

export default function useFetch() {
  return useCallback(rawFetch, [])
}
