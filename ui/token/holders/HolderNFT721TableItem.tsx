import { Td, Tr } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { memo } from "react"
import type { TokenHolder20And721, TokenInfo } from "types/api/token"
import CurrencyValue from "ui/shared/CurrencyValue"
import Utilization from "ui/shared/Utilization/Utilization"
import AddressV2 from "ui/shared/entities/address/AddressEntityV2"

type Props = {
  item: TokenHolder20And721
  token: TokenInfo | undefined
  isLoading?: boolean
}

const HolderNFT721TableItem = ({ item, token, isLoading }: Props) => {
  return (
    <Tr role="group">
      <Td>
        <AddressV2 address={item.address} isLoading={isLoading} />
      </Td>
      <Td textAlign="right">
        <CurrencyValue value={item.value} decimals={0} isLoading={isLoading} />
      </Td>
      <Td textAlign="right">
        <Utilization
          value={BigNumber(item.value).div(BigNumber(token?.total_supply!))}
          colorScheme="green"
          isLoading={isLoading}
        />
      </Td>
    </Tr>
  )
}

export default memo(HolderNFT721TableItem, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.item.address === next.item.address &&
    prev.item.value === next.item.value &&
    prev.token?.address === next.token?.address
  )
})
