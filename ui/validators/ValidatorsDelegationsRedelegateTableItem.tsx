import { Td, Tr } from "@chakra-ui/react"
import moment from "moment"
import { memo } from "react"
import type { IValidatorDelegation } from "types/api/validator"
import CurrencyValue from "ui/shared/CurrencyValue"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import TxEntityV2 from "ui/shared/entities/tx/TxEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"

interface Props {
  item: IValidatorDelegation
  isLoading?: boolean
}

const ValidatorsDelegationsRedelegateTableItem = ({
  item,
  isLoading,
}: Props) => {
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
        <AddressEntityV2
          address={{
            hash: item.validator_src.operator_address,
            name: item.validator_src.name,
            image_url: item.validator_src.image_url,
          }}
          iconProps={{
            boxSize: "2.5rem",
          }}
          nameProps={{
            textStyle: "87500",
          }}
          hashProps={{
            color: "neutral.light.6",
          }}
          maxWidth="20rem"
          isLoading={isLoading}
          isValidator
          showAddress
          copyProps={{
            wrapperProps: {
              alignSelf: "flex-end",
            },
          }}
        />
      </Td>

      <Td>
        <AddressEntityV2
          address={{
            hash: item.validator_dst.operator_address,
            name: item.validator_dst.name,
            image_url: item.validator_dst.image_url,
          }}
          iconProps={{
            boxSize: "2.5rem",
          }}
          nameProps={{
            textStyle: "87500",
          }}
          hashProps={{
            color: "neutral.light.6",
          }}
          isLoading={isLoading}
          isValidator
          showAddress
          copyProps={{
            wrapperProps: {
              alignSelf: "flex-end",
            },
          }}
        />
      </Td>

      <Td textAlign="right">
        <CurrencyValue
          value={item.amount}
          decimals={6}
          isLoading={isLoading}
          keepIntegerPart
          currency="SEI"
        />
      </Td>
      <Td>
        <TxEntityV2
          maxWidth="10rem"
          hash={item.transaction_hash}
          isLoading={isLoading}
        />
      </Td>
      <Td textAlign="right">
        <SkeletonText isLoading={isLoading} color="neutral.light.7">
          {moment(item.block_timestamp).fromNow()}
        </SkeletonText>
      </Td>
    </Tr>
  )
}

export default memo(ValidatorsDelegationsRedelegateTableItem, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.item === next.item
})
