import { Flex, Th, Thead, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { useLastSync } from "lib/hooks/useLastSync"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { Block } from "types/api/block"
import BlocksTableItem from "ui/blocks/BlocksTableItem"
import Hint from "ui/shared/Hint"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"

interface Props {
  items: Block[] | undefined
  isLoading?: boolean
  page: number
  dataUpdatedAt: number
}

const BlocksTable = ({ items, isLoading, page, dataUpdatedAt }: Props) => {
  const lastSync = useLastSync(dataUpdatedAt, [dataUpdatedAt])

  return (
    <ScrollTable variant="v2" sizes={[15, 25, 20, 20, 20]}>
      <Thead>
        <Tr>
          <Th>
            <Flex alignItems="center" gap={1}>
              {getLanguage("blocks_page.table_headers.block")}{" "}
              <Hint label={lastSync}></Hint>
            </Flex>
          </Th>
          <Th>{getLanguage("blocks_page.table_headers.validator")}</Th>
          <Th>{getLanguage("blocks_page.table_headers.txn_count")}</Th>
          <Th>{getLanguage("blocks_page.table_headers.gas_used")} (asei)</Th>
          <Th textAlign="right">
            {getLanguage("blocks_page.table_headers.reward_sei")}
          </Th>
        </Tr>
      </Thead>
      <TbodyControl
        notFoundText={getLanguage("blocks_page.table_headers.no_blocks")}
      >
        {items?.map((item, index) => (
          <BlocksTableItem
            key={generateKey(index, isLoading, item.height)}
            item={item}
            isLoading={isLoading}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(BlocksTable, (prev, next) => {
  return (
    prev.items === next.items &&
    prev.isLoading === next.isLoading &&
    prev.page === next.page &&
    prev.dataUpdatedAt === next.dataUpdatedAt
  )
})
