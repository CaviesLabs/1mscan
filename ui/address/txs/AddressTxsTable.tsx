import { HStack, Th, Thead, Tr } from "@chakra-ui/react"
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
import AddressTxsTableItem from "./AddressTxsTableItem"

type Props = {
  items: Transaction[] | undefined
  hash: string
  isLoading?: boolean
  dataUpdatedAt?: number
  osType: OSType
}

const AddressTxsTable = ({
  items,
  isLoading,
  dataUpdatedAt,
  hash,
  osType,
}: Props) => {
  const lastSync = useLastSync(dataUpdatedAt, [dataUpdatedAt])
  return (
    <ScrollTable
      variant="v2"
      sizes={
        // [15, 10, 13, 12, 20, 15, 15]
        (osType === "EVM" && [15, 10, 13, 12, 20, 15, 15]) ||
        (osType === "Cosmos" && [25, 15, 15, 15, 15, 15]) ||
        []
      }
      maxs={["10rem"]}
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
            <HStack spacing={1}>
              <span>{getLanguage("address.trx_hash")}</span>
              <Hint label={`Last sync: ${lastSync}`}></Hint>
            </HStack>
          </Th>
          <Th>{getLanguage("address.status")}</Th>
          <Th>{getLanguage("address.type_&_method")}</Th>
          <Th textAlign="right">{getLanguage("address.block")}</Th>

          {osType === "EVM" && (
            <Th paddingLeft="4rem !important">
              From{(osType === "EVM" && "/To") || ""}
            </Th>
          )}

          <Th textAlign="right">{getLanguage("address.value_sei")}</Th>
          <Th textAlign="right">{getLanguage("address.fee_sei")}</Th>
        </Tr>
      </Thead>
      <TbodyControl
        notFoundText={getLanguage("address.there_are_no_transactions")}
      >
        {items?.map((item, index) => (
          <AddressTxsTableItem
            key={generateKey(index, isLoading, item.hash)}
            item={item}
            hash={hash}
            isLoading={isLoading}
            osType={osType}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(AddressTxsTable, (prev, next) => {
  return (
    prev.items === next.items &&
    prev.isLoading === next.isLoading &&
    prev.dataUpdatedAt === next.dataUpdatedAt &&
    prev.hash === next.hash
  )
})
