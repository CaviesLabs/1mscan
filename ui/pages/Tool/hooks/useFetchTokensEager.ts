import { useShallowMemoRef } from "lib/hooks/useShallow"
import { useCallback } from "react"
import type { TokenType } from "types/api/token"
import type { IInfinateResponse } from "ui/shared/pagination/useQueryWithInfinity"
import { useFetchTokensInfinity } from "./useFetchTokensInfinity"

export const useFetchTokensEager = ({
  isLoading: _isLoading,
  evmHash,
  nativeHash,
  enabled = [
    "ERC-20",
    "CW-20",
    "ICS-20",
    "NATIVE",
    "ERC-404",
    "ERC-721",
    "ERC-1155",
    "CW-721",
  ],
}: {
  isLoading?: boolean
  evmHash?: string | undefined
  nativeHash?: string | undefined
  enabled?: Extract<
    TokenType,
    | "ERC-20"
    | "CW-20"
    | "ICS-20"
    | "NATIVE"
    | "ERC-404"
    | "ERC-721"
    | "ERC-1155"
    | "CW-721"
  >[]
}) => {
  const { fetchNextPages, counters, isLoading } = useFetchTokensInfinity({
    isLoading: _isLoading,
    evmHash,
    nativeHash,
    enabled,
  })

  const deliveryRefetch = useCallback(
    async (
      currentType: TokenType | "start",
      evmHash: string | undefined,
      nativeHash: string | undefined,
      q: string,
      counters: ReturnType<typeof useFetchTokensInfinity>["counters"],
      enabledSet: Set<TokenType>,
    ) => {
      const order = [
        {
          type: "ERC-20",
          hash: evmHash,
        },
        {
          type: "CW-20",
          hash: nativeHash,
        },
        {
          type: "ICS-20",
          hash: nativeHash,
        },
        {
          type: "NATIVE",
          hash: nativeHash,
        },
        {
          type: "ERC-721",
          hash: evmHash,
        },
        {
          type: "ERC-1155",
          hash: evmHash,
        },
        {
          type: "CW-721",
          hash: nativeHash,
        },
        {
          type: "ERC-404",
          hash: evmHash,
        },
      ] as const

      const store = {
        ["ERC-20"]: [],
        ["CW-20"]: [],
        ["ICS-20"]: [],
        ["NATIVE"]: [],
        ["ERC-721"]: [],
        ["ERC-1155"]: [],
        ["CW-721"]: [],
        ["ERC-404"]: [],
      } as {
        [key in TokenType]: IInfinateResponse<"address_tokens">[]
      }

      const index = order.findIndex((item) => item.type === currentType)

      // for i from index + 1 to order.length, checkStale, refetch if the first type not have data
      for (let i = index + 1; i < order.length; i++) {
        const rule = order[i]

        if (!enabledSet.has(rule.type)) {
          continue
        }

        if (!counters?.[rule.type]) {
          continue
        }

        if (!rule.hash) {
          return Promise.reject("Hash is not defined")
        }

        const fetchNextDebounced = () =>
          fetchNextPages[rule.type]().then(({ data, hasNextPage }) => {
            if (hasNextPage) {
              return fetchNextDebounced()
            }
            return data
          })

        store[rule.type] = await fetchNextDebounced().catch(() => {
          return []
        })
      }
      return store
    },
    [],
  )

  const initialRef = useShallowMemoRef(
    () => ({
      evmHash,
      nativeHash,
      enabled,
      counters,
    }),
    [evmHash, nativeHash, enabled, counters],
  )

  const execute = useCallback(async () => {
    if (!initialRef.current.enabled.length) {
      return Promise.reject("No token types are enabled")
    }

    if (
      initialRef.current.enabled.some(
        (type) => initialRef.current.counters?.[type] === undefined,
      )
    ) {
      return Promise.reject("Counters are not defined")
    }

    const enabledSet = new Set(initialRef.current.enabled)

    return deliveryRefetch(
      "start",
      initialRef.current.evmHash,
      initialRef.current.nativeHash,
      "",
      initialRef.current.counters,
      enabledSet,
    )
  }, [])

  return {
    execute,
    isLoading,
  }
}
