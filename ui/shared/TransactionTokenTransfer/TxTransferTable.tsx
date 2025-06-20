import { Th, Thead, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { TokenTransfer } from "types/api/tokenTransfer"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import TxTransferTableItem from "./TxTransferTableItem"

interface Props {
  isLoading?: boolean
  items: TokenTransfer[] | undefined
  page: number
}

const TxTransferTable = ({ items, isLoading, page }: Props) => {
  return (
    <ScrollTable
      variant="v2"
      sizes={[20, 15, 20, 25, 20]}
      mins={["5rem", , , ,]}
      maxs={["10rem", , , "20rem"]}
    >
      <Thead>
        <Tr>
          <Th>
            {getLanguage(
              "transaction_details_page.evm_details.token_transfers_tab_content.token",
            )}
          </Th>
          <Th>
            {getLanguage(
              "transaction_details_page.evm_details.token_transfers_tab_content.type_&_method",
            )}
          </Th>
          <Th>
            {getLanguage(
              "transaction_details_page.evm_details.token_transfers_tab_content.item",
            )}
          </Th>
          <Th paddingLeft="2.75rem !important">
            {getLanguage(
              "transaction_details_page.evm_details.token_transfers_tab_content.from_to",
            )}
          </Th>
          <Th textAlign="right">
            {getLanguage(
              "transaction_details_page.evm_details.token_transfers_tab_content.quantity",
            )}
          </Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => (
          <TxTransferTableItem
            key={generateKey(
              index,
              isLoading,
              index,
              item.tx_hash,
              page,
              item.log_index,
              item.type,
              item.method,
              item.from.hash,
              item.to.hash,
              item.total.denom,
              item.total.token_id,
              item.total.value,
              item.token?.address,
              item.token?.token_denom,
            )}
            isLoading={isLoading}
            item={item}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(TxTransferTable, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.page === next.page &&
    prev.items === next.items
  )
})
