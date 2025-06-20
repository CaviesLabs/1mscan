import { Th, Thead, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { TokenInfo } from "types/api/token"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import TokenWithoutPointerTableItem from "./TokenWithoutPointerTableItem"

type Props = {
  items: TokenInfo[] | undefined
  isLoading?: boolean
  page: number
}

const TokenWithoutPointerTable = ({ items, isLoading, page }: Props) => {
  return (
    <ScrollTable
      variant="v2"
      sizes={[6, 34, 30, 30]}
      maxs={["5rem", "15rem", "15rem", "6rem"]}
    >
      <Thead>
        <Tr>
          <Th></Th>
          <Th>{getLanguage("token.token")}</Th>
          <Th>{getLanguage("utils.price")}</Th>
          <Th textAlign="right">{getLanguage("token.holders")}</Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => (
          <TokenWithoutPointerTableItem
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

export default memo(TokenWithoutPointerTable, (prev, next) => {
  return (
    prev.items === next.items &&
    prev.isLoading === next.isLoading &&
    prev.page === next.page
  )
})
