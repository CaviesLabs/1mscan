import { Th, Thead, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { TokenTransfer } from "types/api/tokenTransfer"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import AddressTransferTableItem from "./AddressTransferTableItem"

interface Props {
  isLoading?: boolean
  items: TokenTransfer[] | undefined
  hash: string
  page: number
}

const AddressTransferTable = ({ items, isLoading, hash, page }: Props) => {
  return (
    <ScrollTable
      variant="v2"
      sizes={[20, 15, 10, 10, 25, 15]}
      mins={["5rem", , "10rem", "", ,]}
      maxs={["10rem", , "10rem", "15rem", "20rem"]}
    >
      <Thead>
        <Tr>
          <Th>{getLanguage("address.token")}</Th>
          <Th>{getLanguage("address.type_&_method")}</Th>
          <Th>{getLanguage("address.item")}</Th>
          <Th>{getLanguage("address.trx_hash")}</Th>
          <Th paddingLeft="4rem !important">
            {getLanguage("address.from_to")}
          </Th>
          <Th textAlign="right">{getLanguage("address.quantity")}</Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => (
          <AddressTransferTableItem
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
              item.token?.address,
              item.total?.value,
              item.token?.token_denom,
            )}
            isLoading={isLoading}
            item={item}
            hash={hash}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(AddressTransferTable, (prev, next) => {
  return (
    prev.items === next.items &&
    prev.isLoading === next.isLoading &&
    prev.hash === next.hash &&
    prev.page === next.page
  )
})
