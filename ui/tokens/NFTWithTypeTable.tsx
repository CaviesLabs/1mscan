import { Th, Thead, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { TokenInfo } from "types/api/token"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import NFTWithTypeTableItem from "./NFTWithTypeTableItem"

type Props = {
  isLoading?: boolean
  items: TokenInfo[] | undefined
  page: number
}

/**
 * @description Use for list ERC-721 | ERC-1155
 */
const NFTWithTypeTable = ({ items, isLoading, page }: Props) => {
  return (
    <ScrollTable variant="v2" sizes={[6, 25, 25, 14, 15, 15]}>
      <Thead>
        <Tr>
          <Th></Th>
          <Th>{getLanguage("token.collection")}</Th>
          <Th>{getLanguage("token.pointer_original_contract")}</Th>
          <Th>{getLanguage("token.type")}</Th>
          <Th textAlign="right">{getLanguage("token.items")}</Th>
          <Th textAlign="right">{getLanguage("token.holders")}</Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => (
          <NFTWithTypeTableItem
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

export default memo(NFTWithTypeTable, (prev, next) => {
  return (
    prev.items === next.items &&
    prev.isLoading === next.isLoading &&
    prev.page === next.page
  )
})
