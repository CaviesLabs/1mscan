import useApiQuery from "lib/api/useApiQuery"
import { useMemo } from "react"
import type { AddressTokensCounter } from "types/api/address"
import type { TokenType } from "types/api/token"
import useQueryWithInfinity from "ui/shared/pagination/useQueryWithInfinity"

export const useFetchTokensInfinity = ({
  isLoading: _isLoading,
  evmHash,
  nativeHash,
  counter,
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
  enableCounter = true,
}: {
  isLoading?: boolean
  evmHash: string | undefined
  nativeHash: string | undefined
  counter?: AddressTokensCounter
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
  enableCounter?: boolean
}) => {
  const { data: countersData, isFetching: countersIsLoading } = useApiQuery(
    "address_tokens_counter",
    {
      pathParams: { hash: evmHash || nativeHash },
      queryOptions: {
        enabled: Boolean(
          enableCounter &&
            (evmHash || nativeHash) &&
            !_isLoading &&
            enabled.length,
        ),
        select: (data) => {
          return {
            "ERC-20": data?.erc20_count || 0,
            "CW-20": data?.cw20_count || 0,
            "ICS-20": data?.ics20_count || 0,
            NATIVE: data?.native_count || 0,
            "ERC-404": data?.erc404_count || 0,
            "ERC-721": data?.erc721_count || 0,
            "ERC-1155": data?.erc1155_count || 0,
            "CW-721": data?.cw721_count || 0,
          }
        },
      },
      configs: {
        timeout: 15000,
      },
    },
  )

  const tokensTabCounter = enableCounter
    ? countersData
    : counter
      ? {
          "ERC-20": counter?.erc20_count || 0,
          "CW-20": counter?.cw20_count || 0,
          "ICS-20": counter?.ics20_count || 0,
          NATIVE: counter?.native_count || 0,
          "ERC-404": counter?.erc404_count || 0,
          "ERC-721": counter?.erc721_count || 0,
          "ERC-1155": counter?.erc1155_count || 0,
          "CW-721": counter?.cw721_count || 0,
        }
      : undefined

  const isLoading = countersIsLoading && _isLoading

  const {
    data: erc20Data,
    isFetchNextPageError: erc20IsFetchNextPageError,
    isFetchingNextPage: erc20IsFetchingNextPage,
    fetchNextPage: fetchNextPageERC20,
    hasNextPage: hasNextPageERC20,
    isFetching: erc20IsFetching,
  } = useQueryWithInfinity({
    resourceName: "address_tokens",
    pathParams: { hash: evmHash },
    filters: {
      type: "ERC-20",
    },
    options: {
      enabled: Boolean(
        evmHash &&
          !isLoading &&
          tokensTabCounter?.["ERC-20"] &&
          enabled.includes("ERC-20"),
      ),
    },
  })

  const {
    data: cw20Data,
    isFetchNextPageError: cw20IsFetchNextPageError,
    isFetchingNextPage: cw20IsFetchingNextPage,
    fetchNextPage: fetchNextPageCW20,
    hasNextPage: hasNextPageCW20,
    isFetching: cw20IsFetching,
  } = useQueryWithInfinity({
    resourceName: "address_tokens",
    pathParams: { hash: nativeHash },
    filters: {
      type: "CW-20",
    },
    options: {
      enabled: Boolean(
        nativeHash &&
          !isLoading &&
          tokensTabCounter?.["CW-20"] &&
          enabled.includes("CW-20"),
      ),
    },
  })

  const {
    data: ics20Data,
    isFetchNextPageError: ics20IsFetchNextPageError,
    isFetchingNextPage: ics20IsFetchingNextPage,
    fetchNextPage: fetchNextPageICS20,
    hasNextPage: hasNextPageICS20,
    isFetching: ics20IsFetching,
  } = useQueryWithInfinity({
    resourceName: "address_tokens",
    pathParams: { hash: nativeHash },
    filters: {
      type: "ICS-20",
    },
    options: {
      enabled: Boolean(
        nativeHash &&
          !isLoading &&
          tokensTabCounter?.["ICS-20"] &&
          enabled.includes("ICS-20"),
      ),
    },
  })

  const {
    data: nativeData,
    isFetchNextPageError: nativeIsFetchNextPageError,
    isFetchingNextPage: nativeIsFetchingNextPage,
    fetchNextPage: fetchNextPageNative,
    hasNextPage: hasNextPageNative,
    isFetching: nativeIsFetching,
  } = useQueryWithInfinity({
    resourceName: "address_tokens",
    pathParams: { hash: nativeHash },
    filters: {
      type: "NATIVE",
    },
    options: {
      enabled: Boolean(
        nativeHash &&
          !isLoading &&
          tokensTabCounter?.NATIVE &&
          enabled.includes("NATIVE"),
      ),
    },
  })

  const {
    data: erc721Data,
    isFetchNextPageError: erc721IsFetchNextPageError,
    isFetchingNextPage: erc721IsFetchingNextPage,
    fetchNextPage: fetchNextPageERC721,
    hasNextPage: hasNextPageERC721,
    isFetching: erc721IsFetching,
  } = useQueryWithInfinity({
    resourceName: "address_tokens",
    pathParams: { hash: evmHash },
    filters: {
      type: "ERC-721",
    },
    options: {
      enabled: Boolean(
        evmHash &&
          !isLoading &&
          tokensTabCounter?.["ERC-721"] &&
          enabled.includes("ERC-721"),
      ),
    },
  })

  const {
    data: erc1155Data,
    isFetchNextPageError: erc1155IsFetchNextPageError,
    isFetchingNextPage: erc1155IsFetchingNextPage,
    fetchNextPage: fetchNextPageERC1155,
    hasNextPage: hasNextPageERC1155,
    isFetching: erc1155IsFetching,
  } = useQueryWithInfinity({
    resourceName: "address_tokens",
    pathParams: { hash: evmHash },
    filters: {
      type: "ERC-1155",
    },
    options: {
      enabled: Boolean(
        evmHash &&
          !isLoading &&
          tokensTabCounter?.["ERC-1155"] &&
          enabled.includes("ERC-1155"),
      ),
    },
  })

  const {
    data: cw721Data,
    isFetchNextPageError: cw721IsFetchNextPageError,
    isFetchingNextPage: cw721IsFetchingNextPage,
    fetchNextPage: fetchNextPageCW721,
    hasNextPage: hasNextPageCW721,
    isFetching: cw721IsFetching,
  } = useQueryWithInfinity({
    resourceName: "address_tokens",
    pathParams: { hash: nativeHash },
    filters: {
      type: "CW-721",
    },
    options: {
      enabled: Boolean(
        nativeHash &&
          !isLoading &&
          tokensTabCounter?.["CW-721"] &&
          enabled.includes("CW-721"),
      ),
    },
  })

  const {
    data: erc404Data,
    isFetchNextPageError: erc404IsFetchNextPageError,
    isFetchingNextPage: erc404IsFetchingNextPage,
    fetchNextPage: fetchNextPageERC404,
    hasNextPage: hasNextPageERC404,
    isFetching: erc404IsFetching,
  } = useQueryWithInfinity({
    resourceName: "address_tokens",
    pathParams: { hash: evmHash },
    filters: {
      type: "ERC-404",
    },
    options: {
      enabled: Boolean(
        evmHash &&
          !isLoading &&
          tokensTabCounter?.["ERC-404"] &&
          enabled.includes("ERC-404"),
      ),
    },
  })

  const data = useMemo(() => {
    return {
      "ERC-20": erc20Data,
      "CW-20": cw20Data,
      "ICS-20": ics20Data,
      NATIVE: nativeData,
      "ERC-404": erc404Data,
      "ERC-721": erc721Data,
      "ERC-1155": erc1155Data,
      "CW-721": cw721Data,
    } as const
  }, [
    erc20Data,
    cw20Data,
    ics20Data,
    nativeData,
    erc404Data,
    erc721Data,
    erc1155Data,
    cw721Data,
  ])

  const nextLoading = useMemo(
    () =>
      ({
        "ERC-20": (!erc20Data && erc20IsFetching) || erc20IsFetchingNextPage,
        "CW-20": (!cw20Data && cw20IsFetching) || cw20IsFetchingNextPage,
        "ICS-20": (!ics20Data && ics20IsFetching) || ics20IsFetchingNextPage,
        NATIVE: (!nativeData && nativeIsFetching) || nativeIsFetchingNextPage,
        "ERC-404":
          (!erc404Data && erc404IsFetching) || erc404IsFetchingNextPage,
        "ERC-721":
          (!erc721Data && erc721IsFetching) || erc721IsFetchingNextPage,
        "ERC-1155":
          (!erc1155Data && erc1155IsFetching) || erc1155IsFetchingNextPage,
        "CW-721": (!cw721Data && cw721IsFetching) || cw721IsFetchingNextPage,
      }) as const,
    [
      erc20IsFetchingNextPage,
      cw20IsFetchingNextPage,
      ics20IsFetchingNextPage,
      nativeIsFetchingNextPage,
      erc721IsFetchingNextPage,
      erc1155IsFetchingNextPage,
      cw721IsFetchingNextPage,
      erc404IsFetchingNextPage,
      Boolean(erc20Data),
      Boolean(cw20Data),
      Boolean(ics20Data),
      Boolean(nativeData),
      Boolean(erc721Data),
      Boolean(erc1155Data),
      Boolean(cw721Data),
      Boolean(erc404Data),
      erc20IsFetching,
      cw20IsFetching,
      ics20IsFetching,
      nativeIsFetching,
      erc721IsFetching,
      erc1155IsFetching,
      cw721IsFetching,
      erc404IsFetching,
    ],
  )

  const errors = useMemo(
    () =>
      ({
        "ERC-20": erc20IsFetchNextPageError,
        "CW-20": cw20IsFetchNextPageError,
        "ICS-20": ics20IsFetchNextPageError,
        NATIVE: nativeIsFetchNextPageError,
        "ERC-721": erc721IsFetchNextPageError,
        "ERC-1155": erc1155IsFetchNextPageError,
        "CW-721": cw721IsFetchNextPageError,
        "ERC-404": erc404IsFetchNextPageError,
      }) as const,
    [
      erc20IsFetchNextPageError,
      cw20IsFetchNextPageError,
      ics20IsFetchNextPageError,
      nativeIsFetchNextPageError,
      erc721IsFetchNextPageError,
      erc1155IsFetchNextPageError,
      cw721IsFetchNextPageError,
      erc404IsFetchNextPageError,
    ],
  )

  const fetchNextPages = useMemo(
    () => ({
      "ERC-20": fetchNextPageERC20,
      "CW-20": fetchNextPageCW20,
      "ICS-20": fetchNextPageICS20,
      NATIVE: fetchNextPageNative,
      "ERC-721": fetchNextPageERC721,
      "ERC-1155": fetchNextPageERC1155,
      "CW-721": fetchNextPageCW721,
      "ERC-404": fetchNextPageERC404,
    }),
    [
      fetchNextPageERC20,
      fetchNextPageCW20,
      fetchNextPageICS20,
      fetchNextPageNative,
      fetchNextPageERC721,
      fetchNextPageERC1155,
      fetchNextPageCW721,
      fetchNextPageERC404,
    ],
  )

  const hasNextPages = useMemo(
    () =>
      ({
        "ERC-20": hasNextPageERC20,
        "CW-20": hasNextPageCW20,
        "ICS-20": hasNextPageICS20,
        NATIVE: hasNextPageNative,
        "ERC-721": hasNextPageERC721,
        "ERC-1155": hasNextPageERC1155,
        "CW-721": hasNextPageCW721,
        "ERC-404": hasNextPageERC404,
      }) as const,
    [
      hasNextPageERC20,
      hasNextPageCW20,
      hasNextPageICS20,
      hasNextPageNative,
      hasNextPageERC721,
      hasNextPageERC1155,
      hasNextPageCW721,
      hasNextPageERC404,
    ],
  )

  return {
    data,
    errors,
    fetchNextPages,
    hasNextPages,
    nextLoading,
    isLoading,
    counters: tokensTabCounter,
    get isFetching() {
      return Boolean(
        countersIsLoading ||
          erc20IsFetching ||
          cw20IsFetching ||
          ics20IsFetching ||
          nativeIsFetching ||
          erc721IsFetching ||
          erc1155IsFetching ||
          cw721IsFetching ||
          erc404IsFetching,
      )
    },
  }
}
