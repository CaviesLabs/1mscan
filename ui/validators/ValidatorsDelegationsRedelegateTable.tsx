import { Th, Thead, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { IValidatorDelegation } from "types/api/validator"
import TableNotice from "ui/shared/TableNotice"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import ValidatorsDelegationsRedelegateTableItem from "./ValidatorsDelegationsRedelegateTableItem"

interface Props {
  items: IValidatorDelegation[] | undefined
  isLoading: boolean
}

const ValidatorsDelegationsRedelegateTable = ({ items, isLoading }: Props) => {
  return (
    <ScrollTable variant="v2" sizes={[20, 20, 20, 20, 10, 10]}>
      <Thead>
        <TableNotice>
          {getLanguage("validators_page.delegations.re_delegations.note")}
        </TableNotice>
        <Tr>
          <Th>
            {getLanguage(
              "validators_page.delegations.re_delegations.delegator",
            )}
          </Th>
          <Th>
            {getLanguage(
              "validators_page.delegations.re_delegations.from_validator",
            )}
          </Th>
          <Th>
            {getLanguage(
              "validators_page.delegations.re_delegations.to_validator",
            )}
          </Th>
          <Th textAlign="right">
            {getLanguage("validators_page.delegations.re_delegations.amount")}
          </Th>
          <Th>
            {getLanguage(
              "validators_page.delegations.re_delegations.transaction",
            )}
          </Th>
          <Th textAlign="right">
            {getLanguage("validators_page.delegations.re_delegations.age")}
          </Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => (
          <ValidatorsDelegationsRedelegateTableItem
            item={item}
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
export default memo(ValidatorsDelegationsRedelegateTable, (prev, next) => {
  return prev.items === next.items && prev.isLoading === next.isLoading
})
