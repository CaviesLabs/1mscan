import type { QueryKey, UseQueryOptions } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import type {
  AbiFunction,
  ContractFunctionArgs,
  ContractFunctionName,
  ReadContractParameters,
  ReadContractReturnType,
} from "viem"
import type {
  EvmFunctionParams,
  IGetPrecompileAbi,
  IModulePrecompile,
} from "./types"
import { useEvmQueryClient } from "./useEvmQueryClient"

export const getEvmQueryKey = <
  M extends string = IModulePrecompile,
  A extends Readonly<AbiFunction[]> = M extends IModulePrecompile
    ? IGetPrecompileAbi<M> | Readonly<AbiFunction[]>
    : Readonly<AbiFunction[]>,
  F extends ContractFunctionName<A, "pure" | "view"> = ContractFunctionName<
    A,
    "pure" | "view"
  >,
  P extends object = EvmFunctionParams<A, F, "pure" | "view">,
>(
  module: M,
  method: F,
  params: P,
) => {
  return [
    module,
    method,
    ...Object.entries(params as object)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([key, value]) => `${key}_${JSON.stringify(value)}`),
  ] as ReadonlyArray<string>
}

export const useEvmQuery = <
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
  R extends ReadContractReturnType<A, F, Args> = ReadContractReturnType<
    A,
    F,
    Args
  >,
>(
  module: M,
  method: F,
  params: P,
  options?: Omit<
    ReadContractParameters<A, F, Args>,
    "abi" | "functionName" | "args" | "address"
  > &
    // {
    //   address: M extends IModulePrecompile
    //     ? A extends IGetPrecompileAbi<M>
    //       ? never
    //       : Hex
    //     : Hex;
    // } &
    Omit<UseQueryOptions<R, Error, R, QueryKey>, "queryKey" | "queryFn">,
) => {
  const { query } = useEvmQueryClient()

  const queryKey = useMemo(
    () => getEvmQueryKey(module, method, params),
    [module, method, params],
  )

  return useQuery<R, Error, R, QueryKey>({
    ...(options || {}),
    queryKey: queryKey,
    queryFn: () => {
      return query(module, method, params, options as never) as never
    },
  })
}
