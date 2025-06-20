import type { AbiFunction } from "abitype"
import { useCallback } from "react"
import type {
  ContractFunctionArgs,
  ContractFunctionName,
  Hex,
  ReadContractParameters,
  TransactionReceipt,
} from "viem"
import { getAddress } from "viem"
import type { Config, UseWalletClientReturnType } from "wagmi"
import { usePublicClient, useWalletClient } from "wagmi"
import { useShallowMemoRef } from "../../../lib/hooks/useShallow"
import type {
  EvmFunctionParams,
  IGetPrecompileAbi,
  IModulePrecompile,
} from "./types"
import { precompiles } from "./types"

export type UseEvmMsg = <
  M extends string = IModulePrecompile,
  A extends Readonly<AbiFunction[]> = M extends IModulePrecompile
    ? IGetPrecompileAbi<M> | Readonly<AbiFunction[]>
    : Readonly<AbiFunction[]>,
  F extends ContractFunctionName<
    A,
    "nonpayable" | "payable"
  > = ContractFunctionName<A, "nonpayable" | "payable">,
  P extends object = EvmFunctionParams<A, F, "nonpayable" | "payable">,
  Args extends ContractFunctionArgs<
    A,
    "nonpayable" | "payable",
    F
  > = ContractFunctionArgs<A, "nonpayable" | "payable", F>,
>(
  module: M,
  method: F,
  params: P,
  options?: Omit<
    ReadContractParameters<A, F, Args>,
    "abi" | "functionName" | "args" | "address"
  > & {
    address: M extends IModulePrecompile
      ? A extends IGetPrecompileAbi<M>
        ? never
        : Hex
      : Hex
  },
) => Promise<TransactionReceipt>

export const useEvmMsgClient = () => {
  const { data: walletClient } = useWalletClient()

  const walletClientRef = useShallowMemoRef(() => walletClient, [walletClient])

  const publicClient = usePublicClient()

  const publicClientRef = useShallowMemoRef(() => publicClient, [publicClient])

  const execute = useCallback(
    (async (module, method, params, options) => {
      const abi = precompiles[
        `${module.toUpperCase()}_PRECOMPILE_ABI` as never
      ] as Readonly<AbiFunction[]>

      const metadata = abi.find((item) => item.name === method)!
      const args = metadata.inputs.map((input) => params[input.name as never])
      const address = getAddress(
        precompiles[`${module.toUpperCase()}_PRECOMPILE_ADDRESS` as never],
      )

      const hash = await walletClientRef.current?.writeContract({
        abi: abi,
        functionName: method,
        args: args,
        address: address,
        account: walletClientRef.current?.account.address,
        ...(options || {}),
      })

      return await publicClientRef.current?.waitForTransactionReceipt({
        hash: hash!,
      })
    }) as UseEvmMsg,
    [],
  )
  return {
    ...walletClient,
    execute,
  } as UseWalletClientReturnType<Config, number>["data"] & {
    execute: UseEvmMsg
  }
}
