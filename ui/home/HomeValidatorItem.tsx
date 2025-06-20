import { Td, Text, Tr } from "@chakra-ui/react"
import { memo } from "react"
import type { ValidatorWithAdditionalInfo } from "types/api/validator"
import CurrencyValue from "ui/shared/CurrencyValue"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"

type Props = {
  item: ValidatorWithAdditionalInfo
  isLoading: boolean | undefined
}

const HomeValidatorItem = ({ item, isLoading }: Props) => {
  return (
    <Tr role="group">
      <Td paddingLeft="1rem !important">
        <AddressEntityV2
          address={{
            hash: item.operator_address,
            name: item.name,
            image_url: item.image_url,
          }}
          gap={3}
          iconProps={{
            boxSize: "2rem",
          }}
          isLoading={isLoading}
          isValidator
          noCopy
          textStyle="87500"
        />
      </Td>
      <Td>
        <CurrencyValue
          value={item.voting_power_amount}
          decimals={0}
          accuracy={0}
          prefix={<Text color="neutral.light.6">Delegated:</Text>}
          currency="SEI"
          isLoading={isLoading}
        />
      </Td>
      <Td paddingRight="1rem !important">
        <CurrencyValue
          float="right"
          value={item.apr}
          decimals={0}
          accuracy={2}
          fixedAccuracy
          prefix={<Text color="neutral.light.6">APR:</Text>}
          currency="%"
          stickyCurrency={false}
          isLoading={isLoading}
        />
      </Td>
    </Tr>
  )
}

export default memo(HomeValidatorItem, (prev, next) => {
  return prev.item.operator_address === next.item.operator_address
})
