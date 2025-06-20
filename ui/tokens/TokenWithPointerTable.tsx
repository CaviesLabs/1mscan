import { Th, Thead, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { TokenInfo } from "types/api/token"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import TokenWithPointerTableItem from "./TokenWithPointerTableItem"

type Props = {
  isLoading?: boolean
  items: TokenInfo[] | undefined
  page: number
}

const TokenWithPointerTable = ({ items, isLoading, page }: Props) => {
  return (
    <ScrollTable
      variant="v2"
      mins={["2rem", "15rem"]}
      sizes={[6, 25, 25, 20, 24]}
      maxs={["5rem", "20rem", "15rem", "15rem", "6rem"]}
    >
      <Thead>
        <Tr>
          <Th></Th>
          <Th>{getLanguage("token.token")}</Th>
          <Th>{getLanguage("token.pointer_original_contract")}</Th>
          <Th>{getLanguage("token.on_chain_marketcap")}</Th>
          <Th textAlign="right">{getLanguage("token.holders")}</Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => (
          <TokenWithPointerTableItem
            key={generateKey(index, isLoading, page, item.address)}
            item={item}
            index={index}
            page={page}
            isLoading={isLoading}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(TokenWithPointerTable, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.items === next.items &&
    prev.page === next.page
  )
})
