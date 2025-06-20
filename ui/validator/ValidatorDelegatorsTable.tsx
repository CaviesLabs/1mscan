import { Th, Thead, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { IValidatorDelegator } from "types/api/validator"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import ValidatorDelegatorsTableItem from "./ValidatorDelegatorsTableItem"

interface Props {
  items: IValidatorDelegator[] | undefined
  isLoading: boolean
}

const ValidatorDelegatorsTable = ({ items, isLoading }: Props) => {
  return (
    <ScrollTable variant="v2" sizes={[25, 25, 25, 25]}>
      <Thead>
        <Tr>
          <Th>{getLanguage("validator_page.delegators.delegator")}</Th>
          <Th textAlign="right">
            {getLanguage("validator_page.delegators.validators")}
          </Th>
          <Th textAlign="right">
            {getLanguage("validator_page.delegators.percentage")}
          </Th>
          <Th textAlign="right">
            {getLanguage("validator_page.delegators.stake_amount")}
          </Th>
          <Th textAlign="right">
            {getLanguage("validator_page.delegators.stake_txs")}
          </Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => (
          <ValidatorDelegatorsTableItem
            item={item}
            isLoading={isLoading}
            key={generateKey(
              index,
              isLoading,
              item.delegator_address,
              item.stake_amount,
              item.percentage,
              item.txs_count,
            )}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(ValidatorDelegatorsTable, (prev, next) => {
  return prev.items === next.items && prev.isLoading === next.isLoading
})
