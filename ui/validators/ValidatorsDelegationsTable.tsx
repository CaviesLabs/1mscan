import { Th, Thead, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { IDelegationType, IValidatorDelegation } from "types/api/validator"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import ValidatorsDelegationsTableItem from "./ValidatorsDelegationsTableItem"

interface Props {
  items: IValidatorDelegation[] | undefined
  isLoading: boolean
  type: Extract<IDelegationType, "delegate" | "unbond">
}

const ValidatorsDelegationsTable = ({ items, isLoading, type }: Props) => {
  return (
    <ScrollTable variant="v2" sizes={[25, 15, 20, 20, 10, 10]}>
      <Thead>
        <Tr>
          <Th>
            {getLanguage("validators_page.delegations.delegations.validator")}
          </Th>
          <Th>
            {getLanguage("validators_page.delegations.delegations.delegator")}
          </Th>
          <Th textAlign="right">
            {getLanguage("validators_page.delegations.delegations.amount")}
          </Th>
          <Th>
            {getLanguage("validators_page.delegations.delegations.transaction")}
          </Th>
          <Th textAlign="right">
            {getLanguage("validators_page.delegations.delegations.age")}
          </Th>
          <Th></Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => (
          <ValidatorsDelegationsTableItem
            item={item}
            type={type}
            isLoading={isLoading}
            key={generateKey(
              index,
              isLoading,
              item.id,
              item.transaction_hash,
              item.validator_src.operator_address,
              item.validator_dst.operator_address,
              item.delegator_address,
            )}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(ValidatorsDelegationsTable, (prev, next) => {
  return prev.items === next.items && prev.isLoading === next.isLoading
})
