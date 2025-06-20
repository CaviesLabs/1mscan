import { Flex, Th, Thead, Tr } from "@chakra-ui/react"

import type { Transaction } from "types/api/transaction"

import { getLanguage } from "languages/useLanguage"
import { useLastSync } from "lib/hooks/useLastSync"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { OSType } from "types/base"
import Hint from "ui/shared/Hint"
import TableDisclaimer from "ui/shared/TableDisclaimer"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import TxsTableItem from "./TxsTableItem"

type Props = {
  items: Transaction[] | undefined
  isLoading?: boolean
  osType: OSType
  dataUpdatedAt?: number
}

const TxsTable = ({ items, isLoading, osType, dataUpdatedAt }: Props) => {
  const lastSync = useLastSync(dataUpdatedAt, [items])
  return (
    <ScrollTable
      variant="v2"
      sizes={
        (osType === "EVM" && [15, 10, 13, 12, 20, 15, 15]) ||
        (osType === "Cosmos" && [25, 15, 15, 15, 15, 15]) ||
        []
      }
      maxs={["13rem"]}
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
              <span>{getLanguage("transactions_page.trx_hash")}</span>
              <Hint
                isLoading={isLoading}
                label={`${getLanguage("utils.last_sync")}: ${lastSync}`}
              ></Hint>
            </Flex>
          </Th>
          <Th>{getLanguage("transactions_page.status_header")}</Th>
          <Th>{getLanguage("transactions_page.type_and_method_header")}</Th>
          <Th>{getLanguage("transactions_page.block")}</Th>
          {osType === "EVM" && (
            <Th paddingLeft="3rem !important">
              {getLanguage("transactions_page.from_to")}
            </Th>
          )}

          <Th textAlign="right">
            {getLanguage("transactions_page.value_sei")}
          </Th>
          <Th textAlign="right">{getLanguage("transactions_page.fee_sei")}</Th>
        </Tr>
      </Thead>
      <TbodyControl notFoundText="There are no transactions">
        {items?.map((item, index) => (
          <TxsTableItem
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

export default memo(TxsTable, (prev, next) => {
  return (
    prev.items === next.items &&
    prev.isLoading === next.isLoading &&
    prev.osType === next.osType &&
    prev.dataUpdatedAt === next.dataUpdatedAt
  )
})
