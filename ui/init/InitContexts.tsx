import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClientConfig } from "lib/api/useQueryClientConfig"
import ReduxTrigger from "lib/contexts/ReduxTrigger"
import ChakraProvider from "lib/contexts/chakra"
import SocketProvider from "lib/socket/SocketProvider"
import dynamic from "next/dynamic"
import { type ReactNode, memo } from "react"
import { ErrorBoundary } from "react-error-boundary"
import AppErrorDisruption from "ui/shared/AppError/AppErrorDisruption"
import GoogleTools from "ui/shared/GoogleTools"
import AppKitProvider from "ui/shared/wallet/AppKitProvider"
import CosmoskitProvider from "ui/shared/wallet/CosmoskitProvider"
import FormToast from "../shared/forms/FormToast"

const BuildHead = dynamic(() => import("ui/meta/BuildHead"), {
  ssr: false,
})

const ReduxProvider = dynamic(() => import("lib/contexts/ReduxContext"), {
  ssr: false,
})

type Props = {
  children: ReactNode
  chain: string
}

function InitContexts({ children, chain }: Props) {
  return (
    <ErrorBoundary
      onError={console.error}
      FallbackComponent={AppErrorDisruption}
    >
      <ChakraProvider>
        <ReduxProvider>
          <ReduxTrigger />
          <QueryClientProvider client={queryClientConfig}>
            <AppKitProvider>
              <CosmoskitProvider>
                <BuildHead />

                <FormToast />

                <SocketProvider>{children}</SocketProvider>
                <ReactQueryDevtools
                  buttonPosition="bottom-left"
                  position="left"
                />

                <GoogleTools />
              </CosmoskitProvider>
            </AppKitProvider>
          </QueryClientProvider>
        </ReduxProvider>
      </ChakraProvider>
    </ErrorBoundary>
  )
}

export default memo(InitContexts, (prev, next) => {
  return prev.chain === next.chain && prev.children === next.children
})
