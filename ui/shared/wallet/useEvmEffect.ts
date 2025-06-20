import { useAppKit, useAppKitState } from "@reown/appkit/react"
import { useCallback } from "react"
import { useAccount, useDisconnect } from "wagmi"

export const useEvmEffect = () => {
  const { open } = useAppKit()
  const modalState = useAppKitState()

  const { disconnect } = useDisconnect()

  const account = useAccount()

  const handleConnect = useCallback(
    async (params?: { onConnect?: AnyFunction }) => {
      const onConnect = params?.onConnect
      await open()
      await Promise.resolve(onConnect)
    },
    [open],
  )

  const handleDisconnect = useCallback(
    async (params?: { onDisconnect?: AnyFunction }) => {
      const onDisconnect = params?.onDisconnect
      disconnect()
      await Promise.resolve(onDisconnect)
    },
    [disconnect],
  )

  return {
    handleDisconnect,
    handleConnect,
    modalState,
    account,
  }
}
