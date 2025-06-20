import EventEmitter2 from "eventemitter2"
import { customThrottle } from "lib/hooks/useShallow"
import { useMemo } from "react"
import { useCosmosChain } from "../wallet/useCosmosChain"
import { useEvmEffect } from "../wallet/useEvmEffect"

export const GlobalWalletEventEmitter = new EventEmitter2({
  wildcard: true,
  verboseMemoryLeak: true,
})

export type IConnectType = "evm" | "native" | "both"

export const emitGlobalWallet = {
  connect: customThrottle(() => {
    GlobalWalletEventEmitter.emit("connect")
  }, 500),
}

export const useGlobalWallet = (options?: { tracking?: IConnectType }) => {
  const { trackEVM, trackNATIVE } = useMemo(() => {
    if (!options?.tracking || options?.tracking === "both") {
      return { trackEVM: true, trackNATIVE: true }
    }
    return {
      trackEVM: options.tracking === "evm",
      trackNATIVE: options.tracking === "native",
    }
  }, [options?.tracking])

  const evmChain = trackEVM
    ? useEvmEffect()!
    : ({} as ReturnType<typeof useEvmEffect>)

  const nativeChain = trackNATIVE
    ? useCosmosChain()
    : ({} as ReturnType<typeof useCosmosChain>)

  return useMemo(() => {
    return {
      evmHash: evmChain?.account?.address || "",
      nativeHash: nativeChain?.address || "",
      isEVMConnecting: evmChain?.account?.isConnecting,
      isNATIVEConnecting: nativeChain?.isWalletConnecting,
      get connectEVM() {
        return evmChain?.handleConnect
      },
      get connectNATIVE() {
        return nativeChain?.connect
      },
      get disconnectEVM() {
        return evmChain?.handleDisconnect
      },
      get disconnectNATIVE() {
        return nativeChain?.disconnect
      },
      get isEVMConnected() {
        return Boolean(this.evmHash)
      },
      get isNATIVEConnected() {
        return Boolean(this.nativeHash)
      },
      get count() {
        if (trackEVM && trackNATIVE) {
          return Number(this.isEVMConnected) + Number(this.isNATIVEConnected)
        }
        if (trackEVM) {
          return Number(this.isEVMConnected)
        }
        if (trackNATIVE) {
          return Number(this.isNATIVEConnected)
        }
        return 0
      },
      get isConnected(): boolean {
        if (trackEVM && trackNATIVE) {
          return this.isEVMConnected && this.isNATIVEConnected
        }
        if (trackEVM) {
          return this.isEVMConnected
        }
        if (trackNATIVE) {
          return this.isNATIVEConnected
        }
        return false
      },
      get isConnecting(): boolean {
        if (trackEVM && trackNATIVE) {
          return this.isEVMConnecting && this.isNATIVEConnecting
        }
        if (trackEVM) {
          return this.isEVMConnecting
        }
        if (trackNATIVE) {
          return this.isNATIVEConnecting
        }
        return false
      },
      get onConnect() {
        return (options?: { tracking?: IConnectType }) => {
          if (!options?.tracking) {
            emitGlobalWallet.connect()
            return
          }
          if (options.tracking === "evm") {
            if (!this?.isEVMConnected) {
              this.connectEVM()
              return
            }
            return
          }
          if (options.tracking === "native") {
            if (!this?.isNATIVEConnected) {
              this.connectNATIVE()
              return
            }
            return
          }
          if (options.tracking === "both") {
            if (!this?.isEVMConnected || !this?.isNATIVEConnected) {
              emitGlobalWallet.connect()
              return
            }
            return
          }
        }
      },
    }
  }, [evmChain, evmChain.account, nativeChain, trackEVM, trackNATIVE])
}
