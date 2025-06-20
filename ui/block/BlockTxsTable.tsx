import { Flex, Th, Thead, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { useLastSync } from "lib/hooks/useLastSync"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { Transaction } from "types/api/transaction"
import type { OSType } from "types/base"
import Hint from "ui/shared/Hint"
import TableDisclaimer from "ui/shared/TableDisclaimer"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import BlockTxsTableItem from "./BlockTxsTableItem"

type Props = {
  dataUpdatedAt: number
  items: Transaction[] | undefined
  osType: OSType
  isLoading?: boolean
}

const BlockTxsTable = ({ dataUpdatedAt, items, osType, isLoading }: Props) => {
  const lastSync = useLastSync(dataUpdatedAt, [dataUpdatedAt])
  return (
    <ScrollTable
      variant="v2"
      maxs={["12rem"]}
      sizes={
        (osType === "Cosmos" && [20, 20, 20, 20, 20, 20]) || [
          20, 20, 20, 20, 20,
        ]
      }
    >
      <Thead>
        {osType === "Cosmos" && (
          <Tr>
            <Th colSpan={100} borderBottomWidth="0px !important">
              <TableDisclaimer />
            </Th>
          </Tr>
        )}
        <Tr>
          <Th>
            <Flex alignItems="center" gap={1}>
              <span>
                {getLanguage(
                  "block_details_page.transactions_tab_content.common_table_elements.trx_hash",
                )}
              </span>
              <Hint
                isLoading={isLoading}
                label={`${getLanguage("utils.last_sync")}: ${lastSync}`}
              ></Hint>
            </Flex>
          </Th>
          <Th>
            {getLanguage(
              "block_details_page.transactions_tab_content.common_table_elements.status",
            )}
          </Th>
          <Th>
            {getLanguage(
              "block_details_page.transactions_tab_content.common_table_elements.type_and_method",
            )}
          </Th>
          {osType !== "Cosmos" && (
            <Th paddingLeft="1.75rem !important">
              {getLanguage(
                "block_details_page.transactions_tab_content.common_table_elements.from_to",
              )}
            </Th>
          )}

          <Th textAlign="right">
            {getLanguage(
              "block_details_page.transactions_tab_content.common_table_elements.value_sei",
            )}
          </Th>
          <Th textAlign="right">
            {getLanguage(
              "block_details_page.transactions_tab_content.common_table_elements.fee_sei",
            )}
          </Th>
        </Tr>
      </Thead>
      <TbodyControl notFoundText="There are no transactions.">
        {items?.map((item, index) => (
          <BlockTxsTableItem
            key={generateKey(index, isLoading, item.hash)}
            item={item}
            isLoading={isLoading}
            osType={osType}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(BlockTxsTable, (prev, next) => {
  return (
    prev.dataUpdatedAt === next.dataUpdatedAt &&
    prev.items === next.items &&
    prev.osType === next.osType &&
    prev.isLoading === next.isLoading
  )
})
