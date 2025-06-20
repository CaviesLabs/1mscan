import { Td, Tr } from "@chakra-ui/react"
import { memo } from "react"
import type { TokenHolderERC1155, TokenInfo } from "types/api/token"
import CurrencyValue from "ui/shared/CurrencyValue"
import AddressV2 from "ui/shared/entities/address/AddressEntityV2"
import { NFTIDV2 } from "ui/shared/entities/nft/NFTEntityV2"

type Props = {
  item: TokenHolderERC1155
  isLoading?: boolean
  token: TokenInfo | undefined
}

const HolderNFT1155TableItem = ({ item, isLoading, token }: Props) => {
  return (
    <Tr role="group">
      <Td>
        <AddressV2 address={item.address} isLoading={isLoading} />
      </Td>
      <Td textAlign="right">
        <NFTIDV2
          id={item.token_id}
          isLoading={isLoading}
          fallback="-"
          hash={token?.address}
        />
      </Td>
      <Td textAlign="right">
        <CurrencyValue
          value={item.value}
          decimals={0}
          isLoading={isLoading}
        ></CurrencyValue>
      </Td>
    </Tr>
  )
}

export default memo(HolderNFT1155TableItem, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.item.address === next.item.address &&
    prev.item.token_id === next.item.token_id &&
    prev.item.value === next.item.value &&
    prev.token === next.token
  )
})
