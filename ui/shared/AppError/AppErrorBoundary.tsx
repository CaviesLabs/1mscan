import type { IFetchError } from "lib/hooks/useFetch"
import { type ComponentType, type ErrorInfo, type ReactNode, memo } from "react"
import { ErrorBoundary, type FallbackProps } from "react-error-boundary"
import AppError from "./AppContentError"
type Props = {
  children: ReactNode
  FallbackComponent?: ComponentType<FallbackProps>
}

const logError = (
  error: Error | IFetchError | undefined,
  info: ErrorInfo | undefined,
) => {
  // Do something with the error, e.g. log to an external API

  // const body = {
  //   chain: chainKey,
  //   url: (error as IFetchError)?.config?.url,
  //   payload: (error as IFetchError)?.payload,
  //   status: (error as IFetchError)?.status,
  //   cause: (error as Error)?.cause,
  //   message: (error as Error)?.message,
  //   stack: (error as Error)?.stack,
  //   info: info?.componentStack,
  // };
  console.log(error)
  // rawFetch("/api/log/collect", {
  //   method: "POST",
  //   body: body,
  // });

  // captureException(body);
}

const AppErrorBoundary = ({ children, FallbackComponent }: Props) => {
  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent || AppError}
      onError={logError}
    >
      {children}
    </ErrorBoundary>
  )
}

export default memo(AppErrorBoundary, (prev, next) => {
  return prev.children === next.children
})
