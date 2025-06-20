import { Th, Thead, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { AddressesItem } from "types/api/addresses"
import type { OSType } from "types/base"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import TopAccounTableItem from "./TopAccounTableItem"

type Props = {
  items?: AddressesItem[]
  isLoading: boolean | undefined
  page: number
  osType: OSType
}

const TopAccountTable = ({ items, isLoading, page, osType }: Props) => {
  return (
    <ScrollTable variant="v2" sizes={[10, 25, 15, 25, 25]}>
      <Thead>
        <Tr>
          <Th>{getLanguage("top_accounts_page.table_headers.rank")}</Th>
          <Th>{getLanguage("top_accounts_page.table_headers.address")}</Th>
          <Th textAlign="right">
            {getLanguage("top_accounts_page.table_headers.associated")}
          </Th>
          {/* <Th>Public tag</Th> */}
          <Th textAlign="right">
            {getLanguage("top_accounts_page.table_headers.balance_sei")}
          </Th>
          <Th textAlign="right">
            {getLanguage("top_accounts_page.table_headers.txn_count")}
          </Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => (
          <TopAccounTableItem
            key={generateKey(index, isLoading, page, item.hash)}
            item={item}
            page={page}
            index={index}
            isLoading={isLoading}
            osType={osType}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(TopAccountTable, (prev, next) => {
  return (
    prev.items === next.items &&
    prev.isLoading === next.isLoading &&
    prev.page === next.page
  )
})
