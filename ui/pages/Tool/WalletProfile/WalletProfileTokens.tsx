import { VStack } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { ALL_FT_TOKEN_TYPES } from "lib/token/tokenTypes"
import { memo, useEffect, useMemo } from "react"
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form"
import { generateKey } from "stubs/utils"
import type { AddressTokensCounter } from "types/api/address"
import DataListDisplay from "ui/shared/DataListDisplay"
import SearchInput from "ui/snippets/searchBar/SearchInput"
import { useFetchCoinBalance } from "../hooks/useFetchCoinBalance"
import { useFetchTokensInfinity } from "../hooks/useFetchTokensInfinity"
import WalletProfileTokenCategory from "./WalletProfileTokenCategory"

const TOKEN_TYPES = [
  {
    id: "COIN",
    title: "SEI",
  },
  ...ALL_FT_TOKEN_TYPES,
] as const

type Props = {
  current: string
  isLoading: boolean | undefined
  evmHash: string | undefined
  nativeHash: string | undefined
  counter: AddressTokensCounter | undefined
  isCounterLoading: boolean | undefined
  addressType: "evm" | "native"
}

const WalletProfileTokens = ({
  current,
  isLoading: _isLoading,
  evmHash,
  nativeHash,
  isCounterLoading,
  counter,
  addressType,
}: Props) => {
  const formApi = useForm({
    defaultValues: {
      search: "",
    },
  })
  const { control, reset } = formApi

  const search = useWatch({
    name: "search",
    control: control,
  })

  const {
    data: address,
    pages: coinPages,
    isLoading: isLoadingCoin,
  } = useFetchCoinBalance({
    hash: current,
  })

  const isLoading = isCounterLoading && _isLoading

  const tokensTabCounter = useMemo(() => {
    return {
      "ERC-20": counter?.erc20_count || 0,
      "CW-20": counter?.cw20_count || 0,
      "ICS-20": counter?.ics20_count || 0,
      NATIVE: (counter?.native_count || 0) + (address?.coin_balance ? -1 : 0),
      "ERC-404": counter?.erc404_count || 0,
      "ERC-721": counter?.erc721_count || 0,
      "CW-721": counter?.cw721_count || 0,
      "ERC-1155": counter?.erc1155_count || 0,
      COIN: address?.coin_balance ? 1 : 0,
    }
  }, [counter, address])

  const {
    data: raw,
    hasNextPages: hasNextPagesRaw,
    nextLoading: nextLoadingRaw,
    fetchNextPages: fetchNextPagesRaw,
  } = useFetchTokensInfinity({
    evmHash,
    nativeHash,
  })

  const data = useMemo(() => {
    const q = search.trim().toLowerCase()

    const base = Object.fromEntries(
      TOKEN_TYPES.map((tokenType) => {
        const pages = (raw[tokenType.id as keyof typeof raw] || []).map(
          (data) => ({
            items: data.items.filter((item) => {
              if (tokenType.id === "NATIVE" && item.token?.address === "usei") {
                return false
              }
              if (q) {
                return (
                  item.token?.name?.toLowerCase().includes(q) ||
                  item.token?.symbol?.toLowerCase().includes(q) ||
                  item.token?.address.toLowerCase().includes(q)
                )
              }
              return true
            }),
            page: data.page,
          }),
        )

        return [tokenType.id, pages]
      }),
    )

    const coin = (coinPages || []).map((data) => ({
      items: data.items.filter(() => {
        if (q) {
          return "usei".includes(q)
        }
        return true
      }),
      page: data.page,
    }))

    return {
      ...base,
      COIN: coin,
    } as Record<(typeof TOKEN_TYPES)[number]["id"], typeof coinPages>
  }, [raw, search, coinPages])

  const hasNextPages = useMemo(() => {
    return {
      ...hasNextPagesRaw,
      COIN: false,
    }
  }, [hasNextPagesRaw])

  const nextLoading = useMemo(() => {
    return {
      ...nextLoadingRaw,
      COIN: isLoadingCoin,
    }
  }, [isLoadingCoin, nextLoadingRaw])

  const fetchNextPages = useMemo(() => {
    return {
      ...fetchNextPagesRaw,
      COIN: () => {},
    }
  }, [fetchNextPagesRaw])

  useEffect(() => {
    reset({ search: "" })
  }, [current])

  return (
    <FormProvider {...formApi}>
      <VStack width="full" spacing={2} flex={1} alignItems="stretch">
        <Controller
          control={control}
          name="search"
          render={({ field: { value, onChange, ...props } }) => {
            return (
              <SearchInput
                {...props}
                placeholder={getLanguage(
                  "wallet_profile_page.search_by_token_name_or_symbol_or_address",
                )}
                width="full"
                value={value}
                onChange={(e) => {
                  onChange(e)
                }}
              />
            )
          }}
        />

        <DataListDisplay
          isLoading={isLoading}
          borderRadius="0.5rem"
          loadingProps={{
            borderWidth: "1px",
            borderColor: "neutral.light.4",
          }}
        >
          {TOKEN_TYPES.map((tokenType, index) => {
            const pages = data[tokenType.id]
            const isNextPageLoading = nextLoading[tokenType.id]
            const hasNextPage = hasNextPages[tokenType.id]
            const fetchNextPage = fetchNextPages[tokenType.id]
            return (
              <WalletProfileTokenCategory
                key={generateKey(
                  index,
                  false,
                  tokenType.id,
                  evmHash,
                  nativeHash,
                )}
                pages={pages}
                tokenType={tokenType.id}
                isNextPageLoading={isNextPageLoading}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                total={tokensTabCounter[tokenType.id]}
                isLoading={isLoading}
                addressType={addressType}
              />
            )
          })}
        </DataListDisplay>
      </VStack>
    </FormProvider>
  )
}

export default memo(WalletProfileTokens, (prev, next) => {
  return (
    prev.current === next.current &&
    prev.evmHash === next.evmHash &&
    prev.nativeHash === next.nativeHash &&
    prev.isLoading === next.isLoading &&
    prev.counter === next.counter &&
    prev.addressType === next.addressType &&
    prev.isCounterLoading === next.isCounterLoading
  )
})
