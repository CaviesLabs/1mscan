import React from "react"
import { type Abi, getAddress } from "viem"
import {
  useAccount,
  useSwitchAccount,
  useSwitchChain,
  useWalletClient,
} from "wagmi"

import type { FormSubmitResult, SmartContractMethod } from "./types"

import { useCurrentChain } from "lib/hooks/useCurrentChain"
import { getNativeCoinValue } from "./utils"

interface Params {
  item: SmartContractMethod
  args: Array<unknown>
  addressHash: string
}

export default function useCallMethodWalletClient(): (
  params: Params,
) => Promise<FormSubmitResult> {
  const { data: walletClient } = useWalletClient()
  const { isConnected, chain, chainId, address: account } = useAccount()
  const { switchAccountAsync } = useSwitchAccount()
  const { switchChainAsync } = useSwitchChain()

  const chainConfig = useCurrentChain()

  return React.useCallback(
    async ({ args, item, addressHash }) => {
      if (!isConnected) {
        throw new Error("Wallet is not connected")
      }

      if (!walletClient) {
        throw new Error("Wallet Client is not defined")
      }

      if (chainId && chainId !== Number(chainConfig?.chainId)) {
        await switchChainAsync?.({ chainId: Number(chainConfig?.chainId) })
      }

      const address = getAddress(addressHash)

      if (item.type === "receive" || item.type === "fallback") {
        const value = getNativeCoinValue(args[0])
        const hash = await walletClient.sendTransaction({
          to: address,
          value,
        })
        return { source: "wallet_client", data: { hash } }
      }

      const methodName = item.name

      if (!methodName) {
        throw new Error("Method name is not defined")
      }

      const _args = args.slice(0, item.inputs.length)
      const value = getNativeCoinValue(args[item.inputs.length])

      // console.log({
      //   args: _args,
      //   // Here we provide the ABI as an array containing only one item from the submitted form.
      //   // This is a workaround for the issue with the "viem" library.
      //   // It lacks a "method_id" field to uniquely identify the correct method and instead attempts to find a method based on its name.
      //   // But the name is not unique in the contract ABI and this behavior in the "viem" could result in calling the wrong method.
      //   // See related issues:
      //   //    - https://github.com/blockscout/frontend/issues/1032,
      //   //    - https://github.com/blockscout/frontend/issues/1327
      //   abi: [item] as Abi,
      //   functionName: methodName,
      //   address,
      //   // value,
      //   account,
      // });

      const hash = await walletClient.writeContract({
        args: _args,
        // Here we provide the ABI as an array containing only one item from the submitted form.
        // This is a workaround for the issue with the "viem" library.
        // It lacks a "method_id" field to uniquely identify the correct method and instead attempts to find a method based on its name.
        // But the name is not unique in the contract ABI and this behavior in the "viem" could result in calling the wrong method.
        // See related issues:
        //    - https://github.com/blockscout/frontend/issues/1032,
        //    - https://github.com/blockscout/frontend/issues/1327
        abi: [item] as Abi,
        functionName: methodName,
        address,
        value: value,
        account,
      })

      return { source: "wallet_client", data: { hash } }
    },
    [
      chain?.id,
      isConnected,
      walletClient,
      account,
      isConnected,
      chain,
      walletClient,
      switchAccountAsync,
    ],
  )
}
