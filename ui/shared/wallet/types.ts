import * as _precompiles from "@sei-js/evm"

import type {
  Abi,
  AbiParameter,
  AbiParameterToPrimitiveType,
  AbiStateMutability,
  ExtractAbiFunction,
} from "abitype"
import type { Mutable } from "viem"

export const precompiles = _precompiles

// Utility type to determine the type of the final return from the path,
export type PathReturnType<
  T,
  P extends string,
> = P extends `${infer M}.${infer V}.${infer F}`
  ? M extends keyof T
    ? V extends keyof T[M]
      ? F extends keyof T[M][V]
        ? T[M][V][F] extends (...args: any) => any
          ? ReturnType<T[M][V][F]> // If 'fromPartial' exists, use its return type
          : T[M][V][F] // Otherwise, use the regular object type
        : never
      : never
    : never
  : never

// Utility type to determine the type of the final value from the path,
// checking specifically for the 'fromPartial' function if it exists
export type PathValueType<
  T,
  P extends string,
> = P extends `${infer M}.${infer V}.${infer F}`
  ? M extends keyof T
    ? V extends keyof T[M]
      ? F extends keyof T[M][V]
        ? T[M][V][F] extends { fromPartial: (...args: any) => any }
          ? ReturnType<T[M][V][F]["fromPartial"]> // If 'fromPartial' exists, use its return type
          : T[M][V][F] // Otherwise, use the regular object type
        : never
      : never
    : never
  : never

// Utility type to create three-part paths like 'M.V.F' where M, V, and F are object keys
export type ThreePartPath<T, M extends keyof T = keyof T> = M extends keyof T
  ? ObjectKeys<T[M]> extends infer V
    ? V extends keyof T[M]
      ? keyof T[M][V] extends infer F
        ? F extends keyof T[M][V]
          ? `${Extract<M, string>}.${Extract<V, string>}.${Extract<F, string>}`
          : never
        : never
      : never
    : never
  : never

// Utility type to determine the type of the final value from the path,
// checking specifically for the 'decode' function if it exists
export type PathDecodeReturnType<
  T,
  P extends string,
> = P extends `${infer M}.${infer V}.${infer F}`
  ? M extends keyof T
    ? V extends keyof T[M]
      ? F extends keyof T[M][V]
        ? T[M][V][F] extends { decode: (...args: any) => any }
          ? ReturnType<T[M][V][F]["decode"]> // If 'decode' exists, use its return type
          : never // If 'decode' doesn't exist, return never
        : never
      : never
    : never
  : never

// Utility type to filter and get only the keys that are objects
type ObjectKeys<T> = {
  [K in keyof T]: T[K] extends object ? K : never
}[keyof T]

export type IPrecompiles = typeof precompiles
type ExtractABIKeys<T> = {
  [K in keyof T]: K extends `${infer P}_PRECOMPILE_ABI` ? P : never
}[keyof T]

type ABIKeys = ExtractABIKeys<IPrecompiles>

export type IModulePrecompile = Lowercase<ABIKeys>

export type IGetPrecompileAbi<M extends IModulePrecompile> =
  IPrecompiles[`${Uppercase<M>}_PRECOMPILE_ABI`]

export type EvmFunctionParams<
  A extends Abi,
  M extends string,
  S extends AbiStateMutability,
  L extends AbiParameter[] = Mutable<ExtractAbiFunction<A, M, S>["inputs"]>,
  I extends number = keyof L extends number ? keyof L : never,
  P extends AbiParameter = L[I],
  N extends string = P["name"] extends string ? P["name"] : never,
> = {
  [K in N]: AbiParameterToPrimitiveType<P>
}

export type MsgResponse<D extends object> = {
  readonly height: number
  /** The position of the transaction within the block. This is a 0-based index. */
  readonly txIndex: number
  /** Error code. The transaction suceeded if and only if code is 0. */
  readonly code: number
  readonly transactionHash: string
  readonly events: readonly Event[]
  /**
   * A string-based log document.
   *
   * This currently seems to merge attributes of multiple events into one event per type
   * (https://github.com/tendermint/tendermint/issues/9595). You might want to use the `events`
   * field instead.
   *
   * @deprecated This field is not filled anymore in Cosmos SDK 0.50+ (https://github.com/cosmos/cosmos-sdk/pull/15845).
   * Please consider using `events` instead.
   */
  readonly rawLog?: string

  /**
   * The message responses of type `data` decoded from the module's decode function.
   */
  data: D[]
  /**
   * The message responses of the [TxMsgData](https://github.com/cosmos/cosmos-sdk/blob/v0.46.3/proto/cosmos/base/abci/v1beta1/abci.proto#L128-L140)
   * as `Any`s.
   * This field is an empty list for chains running Cosmos SDK < 0.46.
   */
  readonly msgResponses: Array<{
    readonly typeUrl: string
    readonly value: Uint8Array
  }>
  readonly gasUsed: bigint
  readonly gasWanted: bigint
}
