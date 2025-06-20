import { Td, Tr } from "@chakra-ui/react"
import { memo } from "react"
import type { AddressTokenBalance } from "types/api/address"
import CurrencyValue from "ui/shared/CurrencyValue"
import AddressV2 from "ui/shared/entities/address/AddressEntityV2"
import TokenV2 from "ui/shared/entities/token/TokenEntityV2"

type Props = { isLoading?: boolean; item: AddressTokenBalance }

const AddressTokensTableItem = ({ item, isLoading }: Props) => {
  const token = item.token

  return (
    <Tr role="group">
      <Td>
        <TokenV2
          token={item.token}
          isLoading={isLoading}
          noCopy
          textStyle="875"
          confirmIconPosition="symbol"
          confirmIconProps={{
            backgroundColor: "transparent",
            boxSize: 5,
          }}
        />
      </Td>
      <Td>
        <AddressV2
          address={{ hash: token?.address, name: token?.base_denom }}
          isLoading={isLoading}
          noIcon
          textStyle="875"
        />
      </Td>

      <Td textAlign="right">
        <CurrencyValue
          value={1}
          decimals={0}
          isLoading={isLoading}
          hideValue
          autoPrice={token?.address || token?.token_denom}
          usdProps={{
            color: "neutral.light.7",
          }}
        />
      </Td>

      <Td textAlign="right">
        <CurrencyValue
          value={item.value}
          decimals={token?.decimals || 0}
          isLoading={isLoading}
        />
      </Td>

      <Td textAlign="right">
        <CurrencyValue
          isLoading={isLoading}
          value={item.value}
          decimals={token?.decimals || 0}
          hideValue
          autoPrice={token?.address || token?.token_denom}
          usdProps={{
            color: "neutral.light.7",
          }}
        />
      </Td>
    </Tr>
  )
}

export default memo(AddressTokensTableItem, (prev, next) => {
  return prev.item === next.item && prev.isLoading === next.isLoading
})
