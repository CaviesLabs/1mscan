import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import type { Address, AddressTokensCounter } from "types/api/address"
import ScrollTabFloat from "ui/shared/Tabs/ScrollTabFloat"
import AddressCW20Token from "./AddressCW20Token"
import AddressERC20Token from "./AddressERC20Token"
import AddressERC404Token from "./AddressERC404Token"
import AddressICS20Token from "./AddressICS20Token"
import AddressNATIVEToken from "./AddressNATIVEToken"
import AddressNFTs from "./tokens/AddressNFTs"

type Props = {
  address: Address | undefined
  evmHash: string | undefined
  nativeHash: string | undefined
  isLoading?: boolean
  counter: AddressTokensCounter & {
    nft_count: number
    total_count: number
  }
  isActive?: boolean
}
const AddressTokens = ({
  evmHash,
  nativeHash,
  isLoading,
  counter,
  isActive,
}: Props) => {
  return (
    <ScrollTabFloat
      id="token_holdings"
      cleanupOnTabChange={{
        keepQueries: ["hash", "tab"],
      }}
      isActive={isActive}
      listProps={{
        width: "full",
        borderBottomColor: "neutral.light.4",
        borderBottomWidth: "1px",
        paddingBottom: "7px",
      }}
      isLoading={isLoading}
      tabs={[
        evmHash && {
          id: "erc-20",
          title: "ERC-20",
          component: AddressERC20Token,
          props: {
            hash: evmHash,
            isLoading,
          },
          count: counter.erc20_count,
        },
        nativeHash && {
          id: "cw-20",
          title: "CW-20",
          component: AddressCW20Token,
          props: {
            hash: nativeHash,
            isLoading,
          },
          count: counter.cw20_count,
        },
        nativeHash && {
          id: "ics-20",
          title: getLanguage("token.ibc_tokens"),
          component: AddressICS20Token,
          props: {
            hash: nativeHash,
            isLoading,
          },
          count: counter.ics20_count,
        },
        nativeHash && {
          id: "native",
          title: getLanguage("token.native_tokens"),
          component: AddressNATIVEToken,
          props: {
            hash: nativeHash,
            isLoading,
          },
          count: counter.native_count,
        },
        evmHash && {
          id: "erc-404",
          title: "ERC-404",
          component: AddressERC404Token,
          props: {
            hash: evmHash,
            isLoading,
          },
          count: counter.erc404_count,
        },
        {
          id: "nfts",
          title: getLanguage("token.nfts"),
          component: AddressNFTs,
          props: {
            evmHash,
            nativeHash,
            isLoading,
          },
          count: counter.nft_count,
        },
      ]}
    />
  )
}

export default memo(AddressTokens, (prev, next) => {
  return (
    prev.address === next.address &&
    prev.evmHash === next.evmHash &&
    prev.nativeHash === next.nativeHash &&
    prev.isLoading === next.isLoading &&
    prev.counter === next.counter &&
    prev.isActive === next.isActive
  )
})
