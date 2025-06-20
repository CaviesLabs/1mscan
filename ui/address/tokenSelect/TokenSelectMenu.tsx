import { Box, Center, Text, VStack } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { ALL_TOKEN_TYPE_IDS } from "lib/token/tokenTypes"
import { memo, useEffect, useMemo } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { generateKey } from "stubs/utils"
import type { AddressTokensCounter } from "types/api/address"
import { useFetchTokensInfinity } from "ui/pages/Tool/hooks/useFetchTokensInfinity"
import Loading from "ui/shared/Loading"
import SearchInput from "ui/snippets/searchBar/SearchInput"
import TokenSelectCategory from "./TokenSelectCategory"

type Props = {
  current: string
  evmHash: string | undefined
  nativeHash: string | undefined
  isLoading?: boolean
  counter: AddressTokensCounter | undefined
}

const TokenSelectMenu = ({
  current,
  evmHash,
  nativeHash,
  isLoading: _isLoading,
  counter,
}: Props) => {
  const { control, reset } = useForm({
    defaultValues: {
      search: "",
    },
  })

  const search = useWatch({
    name: "search",
    control: control,
  })

  const { data: raw, isFetching } = useFetchTokensInfinity({
    evmHash,
    nativeHash,
    isLoading: _isLoading,
    counter,
    enableCounter: false,
  })

  const tokensTabCounter = useMemo(() => {
    return {
      "ERC-20": counter?.erc20_count || 0,
      "CW-20": counter?.cw20_count || 0,
      "ICS-20": counter?.ics20_count || 0,
      NATIVE: counter?.native_count || 0,
      "ERC-404": counter?.erc404_count || 0,
      "ERC-721": counter?.erc721_count || 0,
      "CW-721": counter?.cw721_count || 0,
      "ERC-1155": counter?.erc1155_count || 0,
    }
  }, [counter])

  const data = useMemo(() => {
    const q = search.trim().toLowerCase()

    const base = Object.fromEntries(
      ALL_TOKEN_TYPE_IDS.map((tokenType) => {
        const items = raw[tokenType]?.[0]?.items || []

        return [
          tokenType,
          items.filter((item) => {
            if (q) {
              return (
                item.token?.name?.toLowerCase().includes(q) ||
                item.token?.symbol?.toLowerCase().includes(q) ||
                item.token?.address.toLowerCase().includes(q)
              )
            }
            return true
          }),
        ]
      }),
    )

    return base
  }, [raw, search])

  const hasToken = useMemo(() => {
    return Object.values(tokensTabCounter).some((count) => count > 0)
  }, [tokensTabCounter])

  useEffect(() => {
    reset({ search: "" })
  }, [current])

  const isLoading = _isLoading || isFetching

  return (
    <Box
      overflowX="hidden"
      overflowY="auto"
      borderRadius="0.75rem"
      padding={3}
      flex={1}
      transition="height 0.3s ease-in-out"
    >
      <VStack width="full" spacing={2} flex={1} alignItems="stretch">
        <Controller
          control={control}
          name="search"
          render={({ field: { value, onChange, ...props } }) => {
            return (
              <SearchInput
                {...props}
                placeholder={getLanguage(
                  "address.search_by_token_name_and_symbol",
                )}
                width="full"
                value={value}
                onChange={onChange}
              />
            )
          }}
        />

        <VStack spacing={4} _empty={{ display: "none" }}>
          {ALL_TOKEN_TYPE_IDS.filter(
            (tokenType) => data?.[tokenType]?.length,
          ).map((tokenType, index) => {
            const items = data[tokenType]

            const total = tokensTabCounter[tokenType]
            return (
              <TokenSelectCategory
                key={generateKey(index, false, tokenType, current)}
                items={items}
                total={total}
                tokenType={tokenType}
                hash={current}
              />
            )
          })}
          {isLoading ? (
            <Center height="5rem" flexDirection="column" gap={2}>
              <Loading />
              <Text textStyle="875" color="neutral.light.6">
                {getLanguage("address.loading")}
              </Text>
            </Center>
          ) : (
            !hasToken && (
              <Text textStyle="875" paddingY={3}>
                {getLanguage("address.could_not_find_any_matches")}
              </Text>
            )
          )}
        </VStack>
      </VStack>
    </Box>
  )
}

export default memo(TokenSelectMenu, (prev, next) => {
  return (
    prev.current === next.current &&
    prev.evmHash === next.evmHash &&
    prev.nativeHash === next.nativeHash &&
    prev.isLoading === next.isLoading
  )
})
