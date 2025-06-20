import { HStack, Th, Thead, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { IValidatorsDelegator } from "types/api/validator"
import Hint from "ui/shared/Hint"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import ValidatorsDelegatorsTableItem from "./ValidatorsDelegatorsTableItem"

interface Props {
  items: IValidatorsDelegator[] | undefined
  isLoading: boolean
}

const ValidatorsDelegatorsTable = ({ items, isLoading }: Props) => {
  return (
    <ScrollTable variant="v2" sizes={[20, 20, 20, 20, 20]}>
      <Thead>
        <Tr>
          <Th>{getLanguage("validators_page.delegators.delegator")}</Th>
          <Th>{getLanguage("validators_page.delegators.validators")}</Th>
          <Th textAlign="right">
            <HStack float="right" justifyContent="flex-end">
              <Hint
                label={getLanguage(
                  "validators_page.delegators.the_delegator's_total_stake_across_all_validators_as_a_percentage_of_all_token_staked_from_all_delegators",
                )}
              />
              <span>
                {getLanguage("validators_page.delegators.percentage")}
              </span>
            </HStack>
          </Th>
          <Th textAlign="right">
            {getLanguage("validators_page.delegators.stake_amount")}
          </Th>
          <Th textAlign="right">
            {getLanguage("validators_page.delegators.stake_txs")}
          </Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => (
          <ValidatorsDelegatorsTableItem
            item={item}
            isLoading={isLoading}
            key={generateKey(
              index,
              isLoading,
              item.id,
              item.delegator_address,
              item.total_stake_amount,
              item.total_delegator_shares,
              item.txs_count,
            )}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(ValidatorsDelegatorsTable, (prev, next) => {
  return prev.items === next.items && prev.isLoading === next.isLoading
})
