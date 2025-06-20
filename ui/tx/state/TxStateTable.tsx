import { Th, Tr } from "@chakra-ui/react"
import { memo } from "react"

import type { TxStateChange } from "types/api/txStateChanges"
import TbodyControl from "ui/shared/TbodyControl"

import { Thead } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import ScrollTable from "ui/shared/group/ScrollTable"
import TxStateTableItem from "ui/tx/state/TxStateTableItem"

interface Props {
  items: TxStateChange[] | undefined
  isLoading?: boolean
}

const TxStateTable = ({ items, isLoading }: Props) => {
  return (
    <ScrollTable variant="v2" sizes={[10, 15, 20, 20, 20, 15]}>
      <Thead>
        <Tr>
          <Th>
            {getLanguage(
              "transaction_details_page.evm_details.state_tab_content.type",
            )}
          </Th>
          <Th>
            {getLanguage(
              "transaction_details_page.evm_details.state_tab_content.address",
            )}
          </Th>
          <Th textAlign="right">
            {getLanguage(
              "transaction_details_page.evm_details.state_tab_content.before",
            )}
          </Th>
          <Th textAlign="right">
            {getLanguage(
              "transaction_details_page.evm_details.state_tab_content.after",
            )}
          </Th>
          <Th textAlign="right">
            {getLanguage(
              "transaction_details_page.evm_details.state_tab_content.change",
            )}
          </Th>
          <Th>
            {getLanguage(
              "transaction_details_page.evm_details.state_tab_content.item",
            )}
          </Th>
        </Tr>
      </Thead>
      <TbodyControl
        notFoundText={getLanguage(
          "transaction_details_page.evm_details.state_tab_content.there_are_no_state_changes_for_this_transaction",
        )}
      >
        {items?.map((item, index) => (
          <TxStateTableItem data={item} key={index} isLoading={isLoading} />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(TxStateTable, (prev, next) => {
  return prev.items === next.items && prev.isLoading === next.isLoading
})
