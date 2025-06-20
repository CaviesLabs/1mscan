import { HStack, Td, Tr } from "@chakra-ui/react"

import type { InternalTransaction } from "types/api/internalTransaction"

import { memo } from "react"
import CurrencyValue from "ui/shared/CurrencyValue"
import FromTo from "ui/shared/FromTo"
import Tag from "ui/shared/chakra/Tag"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import { TX_INTERNALS_ITEMS } from "ui/tx/internals/utils"
import TxStatus from "ui/tx/tag/TxStatus"

type Props = {
  isLoading?: boolean
  item: InternalTransaction
}

const TxInternalTableItem = ({ item, isLoading }: Props) => {
  const { type, to, value, success, error, gas_limit, created_contract } = item
  const typeTitle = TX_INTERNALS_ITEMS.find(({ id }) => id === type)?.title
  const toData = to ? to : created_contract

  return (
    <Tr role="group">
      <Td>
        <HStack spacing={2} flexWrap="wrap">
          {typeTitle && (
            <Tag colorScheme="cyan" isLoading={isLoading}>
              {typeTitle}
            </Tag>
          )}
          <TxStatus
            status={success ? "ok" : "error"}
            errorText={error}
            isLoading={isLoading}
          />
        </HStack>
      </Td>
      <Td>
        <AddressEntityV2 address={item.from} isLoading={isLoading} />
      </Td>
      <Td>
        {toData && (
          <HStack>
            <FromTo isLoading={isLoading} direction="right" />
            <AddressEntityV2 address={toData} isLoading={isLoading} />
          </HStack>
        )}
      </Td>
      <Td textAlign="right" paddingRight="1.25rem !important">
        <CurrencyValue
          isLoading={isLoading}
          value={value}
          osType="EVM"
        ></CurrencyValue>
      </Td>
      <Td textAlign="right">
        <CurrencyValue
          value={gas_limit}
          isLoading={isLoading}
          decimals={0}
        ></CurrencyValue>
      </Td>
    </Tr>
  )
}

export default memo(TxInternalTableItem)
