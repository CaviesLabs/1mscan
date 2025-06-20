import type { Event, StdFee } from "@cosmjs/stargate"
import type { seiprotocol } from "@sei-js/proto"
import { get } from "lodash"
import { useCallback, useMemo } from "react"
import type {
  PathDecodeReturnType,
  PathValueType,
  ThreePartPath,
} from "./types"
import { type IUseCurrentChain, useCosmosChain } from "./useCosmosChain"

// Define the ISeiprotocol type based on the seiprotocol object, omitting the "ClientFactory" key
type ISeiprotocol = Omit<typeof seiprotocol, "ClientFactory">

type MsgResponse<D extends object> = {
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

export type UseSeiprotocolMsgExecute = <
  S extends Record<string, Record<string, any>> = ISeiprotocol,
  P extends string = ThreePartPath<S, keyof S>,
>(
  path: P,
  value: PathValueType<S, P>,
  options?: {
    fee: StdFee | "auto" | number
    memo?: string
    timeoutHeight?: bigint
  },
) => Promise<MsgResponse<PathDecodeReturnType<S, P>>>

export type UseSeiprotocolMsgClientReturnType = IUseCurrentChain & {
  execute: UseSeiprotocolMsgExecute
}

export const useSeiprotocolMsgClient = () => {
  const cosmosChain = useCosmosChain()

  const execute = useCallback<UseSeiprotocolMsgExecute>(
    async (path, value, options) => {
      const address = cosmosChain.address
      const getSigningStargateClient = cosmosChain.getSigningStargateClient

      if (!address) {
        return Promise.reject("Wallet not connected")
      }

      const cacheDeeplink = localStorage.getItem(
        "WALLETCONNECT_DEEPLINK_CHOICE",
      )

      localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE")

      return new Promise((resolve) => resolve(0))
        .then(async () => {
          const stargateClient = await getSigningStargateClient()
          const module = await import("@sei-js/proto")
            .then((module) => module.seiprotocol)
            .then((seiprotocol) => get(seiprotocol, path) as any)
          // const module = get(seiprotocol, path) as any;

          const msg = {
            typeUrl: `/seiprotocol.${path}`,
            value: value,
          }

          const res = await stargateClient.signAndBroadcast(
            address,
            [msg],
            options?.fee ?? "auto",
            options?.memo,
            options?.timeoutHeight,
          )

          // Ensure data has the type of an array of ReturnType of module.decode
          const data = res.msgResponses?.map(
            (msgResponse) => module.decode(msgResponse.value) as any,
          )

          return {
            ...res,
            data,
          }
        })
        .finally(() => {
          localStorage.setItem(
            "WALLETCONNECT_DEEPLINK_CHOICE",
            cacheDeeplink ?? "",
          )
        })
    },
    [cosmosChain],
  )

  return useMemo(() => {
    Reflect.set(cosmosChain, "execute", execute)
    return cosmosChain as unknown as UseSeiprotocolMsgClientReturnType
  }, [cosmosChain, execute])
}
