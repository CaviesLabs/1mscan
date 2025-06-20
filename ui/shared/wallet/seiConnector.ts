import { createGlobalWalletClient } from "@dynamic-labs/global-wallet-client"
import { createEIP1193Provider } from "@dynamic-labs/global-wallet-client/ethereum"
import type {
  AddEthereumChainParameter,
  Address,
  EIP1193Provider,
  ProviderConnectInfo,
  ProviderRpcError,
  RpcError,
} from "viem"
import {
  ResourceUnavailableRpcError,
  SwitchChainError,
  UserRejectedRequestError,
  getAddress,
  numberToHex,
  withRetry,
  withTimeout,
} from "viem"
import type { Connector } from "wagmi"
import { ChainNotConfiguredError, createConnector } from "wagmi"

const seiConfig = {
  walletName: "Sei Global Wallet",
  // Wallet icon will be seen as the Wallet icon
  walletIcon:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMwIiBoZWlnaHQ9IjEzMCIgdmlld0JveD0iMCAwIDEzMCAxMzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNjQuOTY0MiAxMjkuNjk1Qzg0LjE3OTYgMTI5LjY5NSAxMDEuNDQzIDEyMS4zMzggMTEzLjMxOCAxMDguMDU5QzEwNy43OTQgMTAzLjI1OCA5OS40Njk2IDEwMi45NjYgOTMuNTg4OSAxMDcuNzEyTDkyLjQ2NTQgMTA4LjYxOEM4MS42OTgyIDExNy4zMDYgNjYuMDA5IDExNi4wMjMgNTYuNzk2NSAxMDUuNzAxQzUxLjc3MTggMTAwLjA3MSA0My4xNjY3IDk5LjQ5NjcgMzcuNDM4IDEwNC40MDhMMjQuNDg1IDExNS41MTNDMzUuNTc5MSAxMjQuMzg4IDQ5LjY1MTggMTI5LjY5NSA2NC45NjQyIDEyOS42OTVaTTg1Ljk4OTYgOTguMjkzOEM5Ni4yNDUyIDkwLjAxODQgMTEwLjY2IDkwLjMxNTIgMTIwLjUyNCA5OC4zMDc4QzEyNi40MiA4OC41MzkxIDEyOS44MTIgNzcuMDg5NSAxMjkuODEyIDY0Ljg0NzVDMTI5LjgxMiA1MS4yNDQ3IDEyNS42MjQgMzguNjIwMyAxMTguNDY2IDI4LjE5MzJDMTEzLjg1MiAyNy4yMTA1IDEwOC44NTEgMjguMzU4MiAxMDUuMDU0IDMxLjcyMjRMMTAzLjk3NCAzMi42Nzk5QzkzLjYxODkgNDEuODU1OSA3Ny44ODc0IDQxLjI5ODIgNjguMjA4MyAzMS40MTIzQzYyLjkyOTMgMjYuMDIwNiA1NC4zMDY3IDI1Ljg0MzUgNDguODEwOCAzMS4wMTQxTDMzLjczNzMgNDUuMTk1TDI1LjQ0NTIgMzYuMzgxMUw0MC41MTg3IDIyLjIwMDFDNTAuODEzOSAxMi41MTQ0IDY2Ljk2NjEgMTIuODQ2MSA3Ni44NTUxIDIyLjk0NjJDODIuMDIyMSAyOC4yMjM3IDkwLjQyMDIgMjguNTIxNCA5NS45NDggMjMuNjIyOUw5Ny4wMjgzIDIyLjY2NTRDMTAwLjM4NCAxOS42OTIgMTA0LjI2NiAxNy42ODc0IDEwOC4zMzEgMTYuNjMzMkM5Ni44NDE5IDYuMjkyODkgODEuNjM4IDAgNjQuOTY0MiAwQzMyLjA0NSAwIDQuODU0OTcgMjQuNTI5IDAuNjc0MDIzIDU2LjMwNjZDMTAuNjcyOSA1MS41MDg1IDIzLjAwNjQgNTMuMzU0OCAzMS4xNTkxIDYxLjcwMzVDMzYuMzA1OSA2Ni45NzQgNDQuNTkzIDY3LjUzMDMgNTAuMzk4MSA2Mi45OTUxTDU4LjgyNiA1Ni40MTA4QzY5LjQxNzcgNDguMTM2IDg0LjM5MDcgNDguNTM2NSA5NC41MjQ4IDU3LjM2NjFMMTEwLjkzMyA3MS42NjE1TDEwMi45ODQgODAuNzg1Nkw4Ni41NzU1IDY2LjQ5MDJDODAuODEyOSA2MS40Njk2IDcyLjI5OSA2MS4yNDE3IDY2LjI3NiA2NS45NDcxTDU3Ljg0ODMgNzIuNTMxMkM0Ny4xODI3IDgwLjg2MzcgMzEuOTU3IDc5Ljg0MTUgMjIuNTAxIDcwLjE1ODJDMTcuMDAyNCA2NC41MjczIDguMDA5MzQgNjQuMzMwOSAyLjI3MDA3IDY5LjcxNjNMMC40NDYyODkgNzEuNDI3NUMxLjgxMTE2IDg0Ljk3MTkgNy4zNDM4OCA5Ny4yODYgMTUuNzQyNCAxMDcuMDY4TDI5LjU2MTUgOTUuMjIwOEM0MC4yOTI5IDg2LjAyMDYgNTYuNDEyNiA4Ny4wOTczIDY1LjgyNSA5Ny42NDMyQzcwLjc0MyAxMDMuMTUzIDc5LjExODEgMTAzLjgzOCA4NC44NjYyIDk5LjIwMDRMODUuOTg5NiA5OC4yOTM4WiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzEwOV8xOTEpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMTA5XzE5MSIgeDE9IjY1LjAyMDUiIHkxPSIxMjkuMTQ4IiB4Mj0iNjUuMDIwNSIgeTI9Ii0yLjg3ODM2ZS0wNyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjQjUyQTJBIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzc4MDAwMCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=",
  // URL of your wallet domain (e.g. https://dynamic.example.com)
  walletUrl: "https://global-wallet.sei.io",
  // Environment ID of your wallet (e.g. 1234567890)
  environmentId: "36b63d10-7ba6-49a3-9614-22f471b9283c",
  // EIP6963 configuration
  eip6963: {
    // RDNS of your wallet (e.g. com.example.wallet)
    rdns: "io.sei.global-wallet",
  },
}

seiConnector.type = "seiConnector"
export function seiConnector() {
  // Wallet name will be seen as the Wallet name

  const Wallet = createGlobalWalletClient({
    environmentId: seiConfig.environmentId,
    popup: {
      url: seiConfig.walletUrl,
    },
  })
  const provider = createEIP1193Provider(Wallet)

  type Provider = EIP1193Provider
  type Properties = {
    onConnect(connectInfo: ProviderConnectInfo): void
    onDisplayUri(uri: string): void
  }
  type Listener = Parameters<Provider["on"]>[1]

  let accountsChanged: Connector["onAccountsChanged"] | undefined
  let chainChanged: Connector["onChainChanged"] | undefined
  let connect: Connector["onConnect"] | undefined

  let disconnect: Connector["onDisconnect"] | undefined

  return createConnector<Provider, Properties>((config) => ({
    get icon() {
      return seiConfig.walletIcon
    },
    rdns: [seiConfig.eip6963.rdns],
    get id() {
      return "sei.wagmi.connector"
    },
    get name() {
      return seiConfig.walletName
    },
    /** @deprecated */
    get supportsSimulation() {
      return true
    },
    type: seiConnector.type,
    async setup() {
      // Only start listening for events if `target` is set, otherwise `injected()` will also receive events
      if (provider?.on) {
        if (!connect) {
          connect = this.onConnect.bind(this)
          provider.on("connect", connect!)
        }

        // We shouldn't need to listen for `'accountsChanged'` here since the `'connect'` event should suffice (and wallet shouldn't be connected yet).
        // Some wallets, like MetaMask, do not implement the `'connect'` event and overload `'accountsChanged'` instead.
        if (!accountsChanged) {
          accountsChanged = this.onAccountsChanged.bind(this)
          provider.on("accountsChanged", accountsChanged!)
        }
      }

      const recentChainID = await config.storage?.getItem<
        string,
        number,
        undefined
      >("wagmi-sei_connector-chain_id")

      const connectorChains = config.chains.map((x) => x.id)

      if (connectorChains.includes(recentChainID!)) {
        await this.connect({ chainId: Number(recentChainID) })
      }
    },
    async connect({ chainId } = {}) {
      try {
        const recentChainID = await config.storage?.getItem(
          "wagmi-sei_connector-chain_id",
        )

        if (recentChainID === chainId?.toString()) {
          await this.disconnect()
        }

        const requestedAccounts = await provider.request({
          method: "eth_requestAccounts",
        })

        const accounts = requestedAccounts.map((x) => getAddress(x))

        // Manage EIP-1193 event listeners
        // https://eips.ethereum.org/EIPS/eip-1193#events
        if (connect) {
          provider.removeListener("connect", connect)
          connect = undefined
        }
        if (!accountsChanged) {
          accountsChanged = this.onAccountsChanged.bind(this)
          provider.on("accountsChanged", accountsChanged!)
        }
        if (!chainChanged) {
          chainChanged = this.onChainChanged.bind(this)
          provider.on("chainChanged", chainChanged!)
        }
        if (!disconnect) {
          disconnect = this.onDisconnect.bind(this)
          provider.on("disconnect", disconnect!)
        }

        // Switch to chain if provided
        let currentChainId = await this.getChainId()
        if (chainId && currentChainId !== chainId) {
          const chain = await this.switchChain!({ chainId }).catch((error) => {
            if (error.code === UserRejectedRequestError.code)
              return Promise.reject(error)
            return Promise.reject(new SwitchChainError(error))
          })
          currentChainId = chain?.id ?? currentChainId
        }

        await config.storage
          ?.setItem("wagmi-sei_connector-chain_id", currentChainId)
          ?.catch(console.log)

        return { accounts, chainId: currentChainId }
      } catch (err) {
        const error = err as RpcError
        if (error.code === UserRejectedRequestError.code)
          return Promise.reject(new UserRejectedRequestError(error))
        if (error.code === ResourceUnavailableRpcError.code)
          return Promise.reject(new ResourceUnavailableRpcError(error))
        return Promise.reject(error)
      }
    },
    async disconnect() {
      // Manage EIP-1193 event listeners
      if (chainChanged) {
        provider.removeListener("chainChanged", chainChanged)
        chainChanged = undefined
      }
      if (disconnect) {
        provider.removeListener("disconnect", disconnect)
        disconnect = undefined
      }
      if (!connect) {
        connect = this.onConnect.bind(this)
        provider.on("connect", connect!)
      }
      // Experimental support for MetaMask disconnect
      // https://github.com/MetaMask/metamask-improvement-proposals/blob/main/MIPs/mip-2.md
      try {
        // Adding timeout as not all wallets support this method and can hang
        // https://github.com/wevm/wagmi/issues/4064
        await withTimeout(
          () =>
            // TODO: Remove explicit type for viem@3
            provider.request<{
              Method: "wallet_revokePermissions"
              Parameters: [permissions: { eth_accounts: Record<string, any> }]
              ReturnType: null
            }>({
              // `'wallet_revokePermissions'` added in `viem@2.10.3`
              method: "wallet_revokePermissions",
              params: [{ eth_accounts: {} }],
            }),
          { timeout: 100 },
        )
      } catch {}
      await config.storage?.removeItem("wagmi-sei_connector-chain_id")
    },
    async getAccounts() {
      const accounts = await provider.request({ method: "eth_accounts" })
      return accounts.map((x) => getAddress(x))
    },
    async getChainId() {
      const hexChainId = await provider.request({ method: "eth_chainId" })
      return Number(hexChainId)
    },
    async getProvider() {
      if (typeof window === "undefined") return undefined as unknown as Provider

      return provider
    },
    async isAuthorized() {
      try {
        // Use retry strategy as some injected wallets (e.g. MetaMask) fail to
        // immediately resolve JSON-RPC requests on page load.
        const accounts = await withRetry(
          () => this.getAccounts() as Promise<Address[]>,
        )
        return Boolean(accounts.length)
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async switchChain({ addEthereumChainParameter, chainId }) {
      const chain = config.chains.find((x) => x.id === chainId)
      if (!chain)
        return Promise.reject(
          new SwitchChainError(new ChainNotConfiguredError()),
        )

      const promise = new Promise<void>((resolve) => {
        const listener = ((data) => {
          if ("chainId" in data && data.chainId === chainId) {
            config.emitter.off("change", listener)
            resolve()
          }
        }) satisfies Parameters<typeof config.emitter.on>[1]
        config.emitter.on("change", listener)
      })

      try {
        await Promise.all([
          provider
            .request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: numberToHex(chainId) }],
            })
            // During `'wallet_switchEthereumChain'`, MetaMask makes a `'net_version'` RPC call to the target chain.
            // If this request fails, MetaMask does not emit the `'chainChanged'` event, but will still switch the chain.
            // To counter this behavior, we request and emit the current chain ID to confirm the chain switch either via
            // this callback or an externally emitted `'chainChanged'` event.
            // https://github.com/MetaMask/metamask-extension/issues/24247
            .then(async () => {
              const currentChainId = await this.getChainId()
              if (currentChainId === chainId)
                config.emitter.emit("change", { chainId })
            }),
          promise,
        ])
        return chain
      } catch (err) {
        const error = err as RpcError

        // Indicates chain is not added to provider
        if (
          error.code === 4902 ||
          // Unwrapping for MetaMask Mobile
          // https://github.com/MetaMask/metamask-mobile/issues/2944#issuecomment-976988719
          (
            error as ProviderRpcError<{
              originalError?: { code: number }
            }>
          )?.data?.originalError?.code === 4902
        ) {
          try {
            const { default: blockExplorer, ...blockExplorers } =
              chain.blockExplorers ?? {}
            let blockExplorerUrls: string[] | undefined
            if (addEthereumChainParameter?.blockExplorerUrls)
              blockExplorerUrls = addEthereumChainParameter.blockExplorerUrls
            else if (blockExplorer)
              blockExplorerUrls = [
                blockExplorer.url,
                ...Object.values(blockExplorers).map((x) => x.url),
              ]

            let rpcUrls: readonly string[]
            if (addEthereumChainParameter?.rpcUrls?.length)
              rpcUrls = addEthereumChainParameter.rpcUrls
            else rpcUrls = [chain.rpcUrls.default?.http[0] ?? ""]

            const addEthereumChain = {
              blockExplorerUrls,
              chainId: numberToHex(chainId),
              chainName: addEthereumChainParameter?.chainName ?? chain.name,
              iconUrls: addEthereumChainParameter?.iconUrls,
              nativeCurrency:
                addEthereumChainParameter?.nativeCurrency ??
                chain.nativeCurrency,
              rpcUrls,
            } satisfies AddEthereumChainParameter

            await Promise.all([
              provider
                .request({
                  method: "wallet_addEthereumChain",
                  params: [addEthereumChain],
                })
                .then(async () => {
                  const currentChainId = await this.getChainId()
                  if (currentChainId === chainId)
                    config.emitter.emit("change", { chainId })
                  else
                    return Promise.reject(
                      new UserRejectedRequestError(
                        new Error("User rejected switch after adding network."),
                      ),
                    )
                }),
              promise,
            ])

            return chain
          } catch (error) {
            return Promise.reject(new UserRejectedRequestError(error as Error))
          }
        }

        if (error.code === UserRejectedRequestError.code)
          return Promise.reject(new UserRejectedRequestError(error))
        return Promise.reject(new SwitchChainError(error))
      }
    },
    async onAccountsChanged(accounts) {
      // Disconnect if there are no accounts
      if (accounts.length === 0) this.onDisconnect()
      // Connect if emitter is listening for connect event (e.g. is disconnected and connects through wallet interface)
      else if (config.emitter.listenerCount("connect")) {
        const chainId = (await this.getChainId()).toString()
        this.onConnect({ chainId })
        // Remove disconnected shim if it exists
      }
      // Regular change event
      else
        config.emitter.emit("change", {
          accounts: accounts.map((x) => getAddress(x)),
        })
    },
    onChainChanged(chain) {
      const chainId = Number(chain)
      config.emitter.emit("change", { chainId })
    },
    async onConnect(connectInfo) {
      const accounts = await this.getAccounts()
      if (accounts.length === 0) return

      const chainId = Number(connectInfo.chainId)
      config.emitter.emit("connect", { accounts, chainId })

      const provider = await this.getProvider()
      if (connect) {
        provider.removeListener("connect", connect)
        connect = undefined
      }
      if (!accountsChanged) {
        accountsChanged = this.onAccountsChanged.bind(this)
        provider.on("accountsChanged", accountsChanged as Listener)
      }
      if (!chainChanged) {
        chainChanged = this.onChainChanged.bind(this)
        provider.on("chainChanged", chainChanged as Listener)
      }
      if (!disconnect) {
        disconnect = this.onDisconnect.bind(this)
        provider.on("disconnect", disconnect as Listener)
      }
    },
    async onDisconnect(error) {
      const provider = await this.getProvider()

      // If MetaMask emits a `code: 1013` error, wait for reconnection before disconnecting
      // https://github.com/MetaMask/providers/pull/120
      if (error && (error as RpcError<1013>).code === 1013) {
        if (provider && !!(await this.getAccounts()).length) return
      }

      config.emitter.emit("disconnect")
      await config.storage?.removeItem("wagmi-sei_connector-chain_id")

      // Manage EIP-1193 event listeners
      if (chainChanged) {
        provider.removeListener("chainChanged", chainChanged)
        chainChanged = undefined
      }
      if (disconnect) {
        provider.removeListener("disconnect", disconnect)
        disconnect = undefined
      }
      if (!connect) {
        connect = this.onConnect.bind(this)
        provider.on("connect", connect as Listener)
      }
    },
    onDisplayUri(uri) {
      config.emitter.emit("message", { type: "display_uri", data: uri })
    },
  }))
}
