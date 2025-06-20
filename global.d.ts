import type {
  MetaMaskInpageProvider,
  MetaMaskSDK,
  SDKProvider,
} from "@metamask/sdk"
import type { OKXUniversalProvider } from "@okxconnect/universal-provider"
import type { IJsonChainConfigs } from "types/api"

type CPreferences = {
  zone: string
  width: string
  height: string
}

declare module "monaco-editor/esm/vs/editor/editor.api" {
  const content: any
  export default content
}

declare global {
  var assets: Record<string, VerifiedAsset>
  var configs: IJsonChainConfigs

  export interface Window {
    sdkProvider: SDKProvider
    chain: string
    ethereum?: SDKProvider
    mmsdk?: MetaMaskSDK
    extension?: MetaMaskInpageProvider
    okxwallet?: OKXUniversalProvider
    extensions?: any[]
    fin?: any
    compass?: any
    coinzilla_display: Array<CPreferences>
    adsbygoogle: { [key: string]: unknown }[]
    ga?: {
      getAll: () => Array<{ get: (prop: string) => string }>
    }
    AdButler: {
      ads: Array<unknown>
      register: (...args: unknown) => void
    }
    abkw: string
    String: String
    configs: IJsonChainConfigs
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production"
    }
  }

  interface String {
    capitalize(): string
    capitalizeFirstLetter(): string
  }

  interface Function {
    __wrapped?: boolean | undefined
  }

  type AnyFunction<T = void> = (...args: any[]) => T

  type ArrayRequired<T extends any[], K = T[number]> = Exclude<
    K,
    undefined | null
  >[]

  type Falsy = null | undefined | false | 0 | -0 | 0n | ""

  type Empty = null | undefined

  type Truthy<T> = T extends Falsy ? never : T

  type SortFunction<T extends Array> = <
    K =
      | []
      | [keyof T]
      | [keyof T, keyof T[keyof T]]
      | [keyof T, keyof T[keyof T], keyof T[keyof T][keyof T[keyof T]]]
      | [
          keyof T,
          keyof T[keyof T],
          keyof T[keyof T][keyof T[keyof T]],
          keyof T[keyof T][keyof T[keyof T]][keyof T[keyof T][keyof T[keyof T]]],
        ],
  >(
    order: "asc" | "desc",
    ...args: K
  ) => T[]

  type UnionKey<T, K = keyof T> = T[K] extends Record<string, object>
    ? K | `${K}.${UnionKey<T[K]>}`
    : K

  interface Array<T> {
    sum(): BigNumber
    sortByBigNumber: SortFunction<T>
    quickSortBigNumber: <P extends UnionKey<T>>(
      order: "asc" | "desc",
      path: P,
      defaultValue?: BigNumber.Value,
    ) => T[]
    insertDelimiters: <T>(delimiter: T) => T[]
  }

  interface BigInt {
    toJSON(): string
  }
  // Chuyển union type thành tuple để giữ thứ tự cố định
  type UnionToTuple<T, Acc extends any[] = []> = (
    (T extends any ? (t: () => T) => void : never) extends (t: infer U) => void
      ? U
      : never
  ) extends () => infer W
    ? UnionToTuple<Exclude<T, W>, [W, ...Acc]>
    : Acc

  // Tạo ra tất cả các tổ hợp từ tuple
  type TupleCombinations<T extends any[]> = T extends [infer F, ...infer R]
    ? [F] | [F, ...TupleCombinations<R>] | TupleCombinations<R>
    : []

  // Nối các phần tử trong tổ hợp thành chuỗi
  type Join<T extends any[], D extends string> = T extends []
    ? ""
    : T extends [infer F]
      ? `${F & string}`
      : T extends [infer F, ...infer R]
        ? `${F & string}${D}${Join<R, D>}`
        : string

  type JoinFilter<T extends string> = Join<
    TupleCombinations<UnionToTuple<T>>,
    ","
  >

  var useSplitProps: <
    T extends Record<string, any>,
    K extends string[] = (keyof T)[],
  >(
    props: T,
    keys: K,
  ) => [Pick<T, K[number]>, Omit<T, K[number]>]

  var useStore: <T extends object>(initialState: T) => T

  var console: Console

  type RemoveUndefined<T extends object> = {
    [K in keyof T as T[K] extends undefined ? never : K]: T[K]
  }

  type Primitive = string | number | boolean | symbol | bigint | object | Date

  type JSONString<T> = string & { __json: T }
}

import type BigNumber from "bignumber.js"
import type { VerifiedAsset } from "types/api/assetList"

declare module "bignumber.js" {
  interface BigNumber {
    humanizeCurrency(decimals?: number): BigNumber
  }
}
