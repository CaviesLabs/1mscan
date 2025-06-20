import { Th, Thead, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { IValidatorProposedBlock } from "types/api/validator"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import ValidatorProposedBlocksTableItem from "./ValidatorProposedBlocksTableItem"

interface Props {
  items: IValidatorProposedBlock[] | undefined
  isLoading: boolean
}

const ValidatorProposedBlocksTable = ({ items, isLoading }: Props) => {
  return (
    <ScrollTable variant="v2" sizes={[25, 25, 25, 25]}>
      <Thead>
        <Tr>
          <Th>{getLanguage("validator_page.proposed_blocks.block")}</Th>
          <Th textAlign="right">
            {getLanguage("validator_page.proposed_blocks.txn_count")}
          </Th>
          <Th textAlign="right">
            {getLanguage("validator_page.proposed_blocks.gas_used")}
          </Th>
          <Th textAlign="right">
            {getLanguage("validator_page.proposed_blocks.reward_sei")}
          </Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => (
          <ValidatorProposedBlocksTableItem
            item={item}
            isLoading={isLoading}
            key={generateKey(
              index,
              isLoading,
              item.height,
              item.tx_count,
              item.total_gas_used,
            )}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(ValidatorProposedBlocksTable, (prev, next) => {
  return prev.items === next.items && prev.isLoading === next.isLoading
})
