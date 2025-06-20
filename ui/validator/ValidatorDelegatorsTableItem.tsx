import { Td, Tr } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { memo } from "react"
import type { IValidatorDelegator } from "types/api/validator"
import CurrencyValue from "ui/shared/CurrencyValue"
import Utilization from "ui/shared/Utilization/Utilization"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"

interface Props {
  item: IValidatorDelegator

  isLoading?: boolean
}

const ValidatorDelegatorsTableItem = ({ item, isLoading }: Props) => {
  return (
    <Tr role="group">
      <Td>
        <AddressEntityV2
          address={{
            hash: item.delegator_address,
          }}
          isLoading={isLoading}
          noName
        />
      </Td>
      <Td textAlign="right">
        <CurrencyValue
          isLoading={isLoading}
          value={item.stake_amount}
          decimals={6}
          keepIntegerPart
          currency="SEI"
        />
      </Td>

      <Td textAlign="right">
        <Utilization
          value={BigNumber(item.percentage).div(100)}
          colorScheme="green"
          isLoading={isLoading}
          labelProps={{
            width: "5.5rem",
          }}
        />
      </Td>
      <Td textAlign="right">
        <CurrencyValue
          keepIntegerPart
          isLoading={isLoading}
          value={item.stake_amount}
          decimals={6}
          accuracyUsd={2}
          autoPrice
          hideValue
          fallbackUsd="-"
          usdProps={{
            color: "neutral.light.7",
            textStyle: "875",
          }}
        />
      </Td>

      <Td textAlign="right">
        <CurrencyValue
          isLoading={isLoading}
          value={item.txs_count}
          decimals={0}
          keepIntegerPart
        />
      </Td>
    </Tr>
  )
}

export default memo(ValidatorDelegatorsTableItem, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.item === next.item
})
