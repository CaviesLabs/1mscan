import { getLanguage } from "languages/useLanguage"
import useApiQuery from "lib/api/useApiQuery"
import { memo, useMemo } from "react"
import ScrollTab from "ui/shared/Tabs/ScrollTab"
import WalletProfileNfts from "./WalletProfileNfts"
import WalletProfileTokens from "./WalletProfileTokens"

type Props = {
  current: string
  evmHash: string | undefined
  nativeHash: string | undefined
  addressType: "evm" | "native"
  isLoading: boolean | undefined
}

const WalletProfileDetails = ({
  current,
  evmHash,
  nativeHash,
  addressType,
  isLoading: _isLoading,
}: Props) => {
  const { data: counter, isFetching: isCounterLoading } = useApiQuery(
    "address_tokens_counter",
    {
      pathParams: { hash: current },
      queryOptions: {
        enabled: Boolean(current && !_isLoading),
      },
      configs: {
        timeout: 15000,
      },
    },
  )

  const total = useMemo(() => {
    if (isCounterLoading)
      return {
        token: 0,
        nft: 0,
      }
    return {
      token:
        (counter?.erc20_count ?? 0) +
        (counter?.cw20_count ?? 0) +
        (counter?.ics20_count ?? 0) +
        (counter?.native_count ?? 0) +
        (counter?.erc404_count ?? 0),
      nft:
        (counter?.erc721_count ?? 0) +
        (counter?.cw721_count ?? 0) +
        (counter?.erc1155_count ?? 0) +
        (counter?.erc404_count ?? 0),
    }
  }, [counter, isCounterLoading])

  const isLoading = isCounterLoading || _isLoading

  return (
    <ScrollTab
      isLoading={isLoading}
      backgroundColor={{
        base: "unset",
        lg: "neutral.light.1",
      }}
      boxShadow={{
        lg: "sm",
      }}
      borderWidth={{
        lg: "1px",
      }}
      borderRadius="0.75rem"
      borderColor="neutral.light.3"
      listProps={{
        paddingY: 3,
        paddingX: 3,
      }}
      padding={{
        lg: 3,
      }}
      cleanupOnTabChange={{
        keepQueries: ["address_type"],
      }}
      tabs={[
        {
          id: "tokens",
          title: getLanguage("token.tokens"),
          component: WalletProfileTokens,
          count: total.token,
          isCounterLoading: isCounterLoading,
          props: {
            current,
            isLoading,
            evmHash,
            nativeHash,
            counter,
            isCounterLoading,
            addressType,
          },
        },
        {
          id: "nfts",
          title: getLanguage("token.nfts"),
          component: WalletProfileNfts,
          count: total.nft,
          isCounterLoading: isCounterLoading,
          props: {
            counter,
            isLoading,
            evmHash,
            nativeHash,
            isCounterLoading,
          },
        },
      ]}
    ></ScrollTab>
  )
}

export default memo(WalletProfileDetails, (prev, next) => {
  return (
    prev.current === next.current &&
    prev.evmHash === next.evmHash &&
    prev.nativeHash === next.nativeHash &&
    prev.addressType === next.addressType &&
    prev.isLoading === next.isLoading
  )
})
