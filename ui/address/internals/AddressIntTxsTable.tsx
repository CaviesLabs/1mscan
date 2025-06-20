import { Th, Thead, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { InternalTransaction } from "types/api/internalTransaction"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import AddressIntTxsTableItem from "./AddressIntTxsTableItem"

type Props = {
  items: InternalTransaction[] | undefined
  hash: string | undefined
  isLoading?: boolean
  page: number
}

const AddressIntTxsTable = ({ items, hash, isLoading, page }: Props) => {
  return (
    <ScrollTable
      variant="v2"
      sizes={[15, 20, 12, 33, 20]}
      maxs={[
        "8rem",
        "max-content",
        "max-content",
        "max-content",
        "max-content",
      ]}
    >
      <Thead>
        <Tr>
          <Th>{getLanguage("address.parent_trx_hash")}</Th>
          <Th>{getLanguage("address.type")}</Th>
          <Th textAlign="right">{getLanguage("address.block")}</Th>
          <Th paddingLeft="4rem !important">
            {getLanguage("address.from_to")}
          </Th>
          <Th textAlign="right">{getLanguage("address.value_sei")}</Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => (
          <AddressIntTxsTableItem
            key={generateKey(
              index,
              isLoading,
              item.transaction_hash,
              page,
              item.index,
            )}
            item={item}
            hash={hash!}
            isLoading={isLoading}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(AddressIntTxsTable, (prev, next) => {
  return (
    prev.items === next.items &&
    prev.hash === next.hash &&
    prev.isLoading === next.isLoading &&
    prev.page === next.page
  )
})
