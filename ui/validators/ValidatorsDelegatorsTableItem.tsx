import { Td, Tr } from "@chakra-ui/react"
import { memo } from "react"
import type { IValidatorsDelegator } from "types/api/validator"
import CurrencyValue from "ui/shared/CurrencyValue"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import ValidatorsShow from "./ValidatorsShow"

interface Props {
  item: IValidatorsDelegator
  isLoading?: boolean
}

const ValidatorsDelegatorsTableItem = ({ item, isLoading }: Props) => {
  return (
    <Tr role="group">
      <Td>
        <AddressEntityV2
          address={{
            hash: item.delegator_address,
          }}
          isLoading={isLoading}
          noIcon
          noName
        />
      </Td>
      <Td>
        <ValidatorsShow isLoading={isLoading} validators={item.validators} />
      </Td>

      <Td textAlign="right">
        <CurrencyValue
          isLoading={isLoading}
          value={item.percentage}
          decimals={0}
          currency="%"
          keepIntegerPart
          stickyCurrency={false}
        />
      </Td>
      <Td textAlign="right">
        <CurrencyValue
          isLoading={isLoading}
          value={item.total_stake_amount}
          decimals={6}
          keepIntegerPart
          currency="SEI"
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

export default memo(ValidatorsDelegatorsTableItem, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.item === next.item
})
