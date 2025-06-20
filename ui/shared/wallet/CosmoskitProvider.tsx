import { Decimal } from "@cosmjs/math"
import { GasPrice } from "@cosmjs/stargate"
import { wallets as compassExtension } from "@cosmos-kit/compass-extension"
import type { EndpointOptions, WalletConnectOptions } from "@cosmos-kit/core"
import { wallets as cosmostations } from "@cosmos-kit/cosmostation"
import { wallets as keplrs } from "@cosmos-kit/keplr"
import { wallets as leapExtension } from "@cosmos-kit/leap-extension"
import { wallets as leapMobile } from "@cosmos-kit/leap-mobile"
import { ChainProvider } from "@cosmos-kit/react"
import { chainKey } from "configs/frontend/chain/utils"
import { walletConnectProjectId } from "configs/hydration/wallet"
import { type ReactNode, memo } from "react"
import { CosmosMainNet } from "../../../configs/frontend/chain/chainConfigs"
import isBrowser from "../../../lib/isBrowser"

const activaties = [
  ...compassExtension,
  ...leapMobile,
  ...leapExtension,
  ...keplrs,
  ...cosmostations,
]

const walletConnectOptions = {
  signClient: {
    projectId: walletConnectProjectId,
    relayUrl: "wss://relay.walletconnect.org",
    customStoragePrefix: "seitrace",
    metadata: {
      name: "1Mscan",
      description: "Connect to Sei wallets",
      url: isBrowser() ? window.location.origin : "",
      icons: [
        ...([CosmosMainNet.logo_URIs?.svg, CosmosMainNet.logo_URIs?.png].filter(
          Boolean,
        ) as string[]),
      ],
    },
  },
} satisfies WalletConnectOptions

const signerOptions = {
  signingStargate: (chain: any) => {
    const chainName = typeof chain === "string" ? chain : chain.chain_name
    switch (chainName) {
      case "sei":
        return {
          // @ts-ignore
          gasPrice: new GasPrice(Decimal.zero(1), "usei"),
        }
      default:
        return void 0
    }
  },
}

const endpointOptions = {
  isLazy: true,
  endpoints: chainKey === "pacific-1" && {
    sei: {
      rpc: [CosmosMainNet.apis!.rpc![0].address],
      rest: [CosmosMainNet.apis!.rest![0].address],
      isLazy: true,
    },
  },
} as EndpointOptions

type Props = {
  children: ReactNode
}

const CosmoskitProvider = ({ children }: Props) => {
  return (
    <ChainProvider
      assetLists={[]}
      chains={[CosmosMainNet] as any}
      wallets={activaties}
      defaultNameService="stargate"
      walletConnectOptions={walletConnectOptions}
      signerOptions={signerOptions}
      endpointOptions={endpointOptions}
      modalTheme={{
        defaultTheme: "light",
        overrides: {},
        themeDefs: [],
        customTheme: "",
      }}
      throwErrors={false}
      logLevel="ERROR"
      subscribeConnectEvents={true}
      // walletModal={NativeSeiModal}
    >
      {children}
    </ChainProvider>
  )
}

export default memo(CosmoskitProvider, (prev, next) => {
  return prev.children === next.children
})
