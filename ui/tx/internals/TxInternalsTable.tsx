import { Th, Tr } from "@chakra-ui/react"

import type { InternalTransaction } from "types/api/internalTransaction"

import { Thead } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import TxInternalsTableItem from "ui/tx/internals/TxInternalsTableItem"

interface Props {
  items: InternalTransaction[] | undefined
  isLoading?: boolean
}

const TxInternalsTable = ({ items, isLoading }: Props) => {
  return (
    <ScrollTable
      variant="v2"
      sizes={[20, 20, 20, 20, 20]}
      mins={[, "19rem", "19rem"]}
      maxs={["15rem", "21rem", "21rem"]}
    >
      <Thead>
        <Tr>
          <Th>
            {getLanguage(
              "transaction_details_page.evm_details.internal_txns_tab_content.type",
            )}
          </Th>
          <Th>
            {getLanguage(
              "transaction_details_page.evm_details.internal_txns_tab_content.from",
            )}
          </Th>
          <Th>
            {getLanguage(
              "transaction_details_page.evm_details.internal_txns_tab_content.to",
            )}
          </Th>
          <Th textAlign="right">
            {getLanguage(
              "transaction_details_page.evm_details.internal_txns_tab_content.value_sei",
            )}
          </Th>
          <Th textAlign="right">
            {getLanguage(
              "transaction_details_page.evm_details.internal_txns_tab_content.gas_limit",
            )}
          </Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => (
          <TxInternalsTableItem
            key={generateKey(
              index,
              isLoading,
              item.transaction_hash,
              item.block_index,
              item.index,
            )}
            item={item}
            isLoading={isLoading}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(TxInternalsTable, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.items === next.items
})
