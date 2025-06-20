import { getHost } from "configs/hydration/api"
import dynamic from "next/dynamic"
import type { ReactNode } from "react"
import { ErrorBoundary } from "react-error-boundary"

// Lazy-load MetaMaskProvider
export const MetaMaskProvider = dynamic(
  () =>
    import("@metamask/sdk-react").then((module) => ({
      default: ({
        children,
        fallback,
      }: {
        children: ReactNode
        fallback?: ReactNode
      }) => (
        <ErrorBoundary
          fallback={
            fallback || (
              <ErrorBoundary fallback={<></>}>{children}</ErrorBoundary>
            )
          }
        >
          <module.MetaMaskProvider
            sdkOptions={{
              dappMetadata: {
                name: "1Mscan",
                url: getHost(),
                iconUrl: `${getHost()}/favicon/favicon.png`,
              },
            }}
            debug={true}
          >
            {children}
          </module.MetaMaskProvider>
        </ErrorBoundary>
      ),
    })),
  {
    ssr: false,
  },
)
