import type { AbiFunction } from "abitype"
import { useCallback, useMemo } from "react"
import type {
  ContractFunctionArgs,
  ContractFunctionName,
  ReadContractParameters,
  ReadContractReturnType,
} from "viem"
import { getAddress } from "viem"
import type { Config, UsePublicClientReturnType } from "wagmi"
import { usePublicClient } from "wagmi"
import { useShallowMemoRef } from "../../../lib/hooks/useShallow"
import type {
  EvmFunctionParams,
  IGetPrecompileAbi,
  IModulePrecompile,
} from "./types"
import { precompiles } from "./types"

export type UseEvmQuery = <
  M extends string = IModulePrecompile,
  A extends Readonly<AbiFunction[]> = M extends IModulePrecompile
    ? IGetPrecompileAbi<M> | Readonly<AbiFunction[]>
    : Readonly<AbiFunction[]>,
  F extends ContractFunctionName<A, "pure" | "view"> = ContractFunctionName<
    A,
    "pure" | "view"
  >,
  P extends object = EvmFunctionParams<A, F, "pure" | "view">,
  Args extends ContractFunctionArgs<
    A,
    "pure" | "view",
    F
  > = ContractFunctionArgs<A, "pure" | "view", F>,
>(
  module: M,
  method: F,
  params: P,
  options?: Omit<
    ReadContractParameters<A, F, Args>,
    "abi" | "functionName" | "args" | "address"
  >,
  // &
  // {
  //   address: M extends IModulePrecompile
  //     ? A extends IGetPrecompileAbi<M>
  //       ? never
  //       : Hex
  //     : Hex;
  // },
) => Promise<ReadContractReturnType<A, F, Args>>

export const useEvmQueryClient = () => {
  const publicClient = usePublicClient()!

  const publicClientRef = useShallowMemoRef(() => publicClient, [publicClient])

  const query = useCallback(
    ((module, method, params, options) => {
      const abi = precompiles[
        `${module.toUpperCase()}_PRECOMPILE_ABI` as never
      ] as Readonly<AbiFunction[]>

      const metadata = abi.find((item) => item.name === method)!
      const args = metadata.inputs.map((input) => params[input.name as never])
      const address = getAddress(
        precompiles[`${module.toUpperCase()}_PRECOMPILE_ADDRESS` as never],
      )

      return publicClientRef.current?.readContract({
        abi: [abi],
        functionName: method,
        args: args,
        address: address,
        ...(options || {}),
      })
    }) as UseEvmQuery,
    [],
  )
  return useMemo(() => {
    Reflect.set(publicClient, "query", query)
    return publicClient as unknown as UsePublicClientReturnType<
      Config,
      number
    > & { query: UseEvmQuery }
  }, [publicClient, query])
}
