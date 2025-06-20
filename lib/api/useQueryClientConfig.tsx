import { QueryClient } from "@tanstack/react-query"
import getErrorObjPayload from "lib/errors/getErrorObjPayload"

import getErrorObjStatusCode from "lib/errors/getErrorObjStatusCode"

export const queryClientConfig = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: (failureCount, error) => {
        // console.error("===catch===", error);

        const errorPayload = getErrorObjPayload<{ status: number }>(error)
        const status = errorPayload?.status || getErrorObjStatusCode(error)
        if (status && status >= 400 && status < 500) {
          // don't do retry for client error responses
          return false
        }

        return failureCount < 2
      },
      // throwOnError: (error) => {
      //   const status = getErrorObjStatusCode(error);
      //   // don't catch error for "Too many requests" response
      //   return status === 429;
      // },
      // throwOnError: false,
    },
  },
})
