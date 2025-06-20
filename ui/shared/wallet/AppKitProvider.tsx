import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import type { AppKitNetwork } from "@reown/appkit-common"
import { type CaipNetworkId, createAppKit } from "@reown/appkit/react"
import { walletConnectProjectId } from "configs/hydration/wallet"
import { type ReactNode, memo, useMemo } from "react"
import {
  type Config,
  type Storage,
  WagmiProvider,
  cookieStorage,
  createStorage,
} from "wagmi"
import { chainConfigs } from "../../../configs/frontend/chain/chainConfigs"
import { seiConnector } from "./seiConnector"

const metadata = {
  name: "1mscan",
  description: "Connect your wallet to 1mscan",
  url: "https://1mscan.com", // origin must match your domain & subdomain
  icons: ["https://1mscan.com/icons/logo/logo.svg"],
}

/**
 * AppKitProvider
 * @param param0 children
 * @returns AppKitProvider
 */
const AppKitProvider = ({ children }: { children?: ReactNode }) => {
  const wagmiConfig = useMemo(() => {
    const chainConfig = chainConfigs?.[0]?.config

    const wagmiAdapter = new WagmiAdapter({
      storage: createStorage({
        key: "wagmi",
        storage: cookieStorage,
      }) as Storage,
      connectors: [seiConnector()],
      networks: [chainConfig as AppKitNetwork],
      projectId: walletConnectProjectId,
      ssr: true,
      chains: [chainConfig],
      multiInjectedProviderDiscovery: true,
      syncConnectedChain: false,
      customRpcUrls: {
        [`eip155:${chainConfig.id}` as CaipNetworkId]: [
          {
            url: chainConfig.rpcUrls.default.http[0],
            // config: viemConfig,
          },
        ],
      },
    })

    const wagmiConfig = wagmiAdapter.wagmiConfig as Config

    createAppKit({
      adapters: [wagmiAdapter],
      networks: [chainConfig as AppKitNetwork],
      allowUnsupportedChain: true,
      enableWalletConnect: true,
      enableCoinbase: false,
      enableEIP6963: true,
      enableWallets: true,
      enableInjected: true,
      enableNetworkSwitch: true,
      enableWalletGuide: false,
      enableAuthLogger: true,
      projectId: walletConnectProjectId,
      features: {
        email: false,
        history: true,
        socials: false,
        allWallets: true,
        emailShowWallets: false,
        smartSessions: true,
        swaps: false,
        onramp: false,
      },
      debug: false,
      metadata: metadata,
      themeMode: "light",
      themeVariables: {
        "--w3m-z-index": 999,
      },
    })

    return wagmiConfig
  }, [])

  return (
    <WagmiProvider reconnectOnMount={true} config={wagmiConfig}>
      {children}
    </WagmiProvider>
  )
}

export default memo(AppKitProvider, (prev, next) => {
  return prev.children === next.children
})
