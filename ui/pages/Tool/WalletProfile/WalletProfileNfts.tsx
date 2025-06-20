import { memo } from "react"
import type { AddressTokensCounter } from "types/api/address"
import AddressLists from "ui/address/tokens/AddressLists"
import ScrollTabFloat from "ui/shared/Tabs/ScrollTabFloat"

type Props = {
  evmHash: string | undefined
  nativeHash: string | undefined
  isLoading: boolean | undefined
  counter: AddressTokensCounter | undefined
  isCounterLoading: boolean | undefined
}

const WalletProfileNfts = ({
  evmHash,
  nativeHash,
  isLoading,
  counter,
  isCounterLoading,
}: Props) => {
  return (
    <ScrollTabFloat
      id="nfts"
      tabs={[
        {
          id: "erc_721",
          title: "ERC-721",
          component: AddressLists,
          count: counter?.erc721_count,
          isCounterLoading: isCounterLoading,
          props: {
            evmHash: evmHash,
            nativeHash: nativeHash,
            tokenType: "ERC-721",
            isLoading: isLoading,
          },
        },
        {
          id: "cw_721",
          title: "CW-721",
          component: AddressLists,
          count: counter?.cw721_count,
          isCounterLoading: isCounterLoading,
          props: {
            evmHash: evmHash,
            nativeHash: nativeHash,
            tokenType: "CW-721",
            isLoading: isLoading,
          },
        },
        {
          id: "erc_1155",
          title: "ERC-1155",
          component: AddressLists,
          count: counter?.erc1155_count,
          isCounterLoading: isCounterLoading,
          props: {
            evmHash: evmHash,
            nativeHash: nativeHash,
            tokenType: "ERC-1155",
            isLoading: isLoading,
          },
        },
        {
          id: "erc_404",
          title: "ERC-404",
          count: counter?.erc404_count,
          isCounterLoading: isCounterLoading,
          component: AddressLists,
          props: {
            evmHash: evmHash,
            nativeHash: nativeHash,
            tokenType: "ERC-404",
            isLoading: isLoading,
          },
        },
      ]}
    />
  )
}

export default memo(WalletProfileNfts, (prev, next) => {
  return (
    prev.evmHash === next.evmHash &&
    prev.nativeHash === next.nativeHash &&
    prev.isLoading === next.isLoading &&
    prev.counter === next.counter &&
    prev.isCounterLoading === next.isCounterLoading
  )
})
