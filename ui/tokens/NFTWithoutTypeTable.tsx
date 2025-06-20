import { Th, Thead, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { TokenInfo } from "types/api/token"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import NFTWithoutTypeTableItem from "./NFTWithoutTypeTableItem"

type Props = {
  isLoading?: boolean
  items: TokenInfo[] | undefined
  page: number
}

/**
 * @description Use for list CW-721
 */
const NFTWithoutTypeTable = ({ items, isLoading, page }: Props) => {
  return (
    <ScrollTable
      variant="v2"
      sizes={[6, 20, 20, 20, 24]}
      mins={["2rem", "10rem", "10rem", "10rem", "10rem"]}
    >
      <Thead>
        <Tr>
          <Th></Th>
          <Th>{getLanguage("token.collection")}</Th>
          <Th>{getLanguage("token.pointer_original_contract")}</Th>
          <Th textAlign="right">{getLanguage("token.items")}</Th>
          <Th textAlign="right">{getLanguage("token.holders")}</Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => (
          <NFTWithoutTypeTableItem
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

export default memo(NFTWithoutTypeTable, (prev, next) => {
  return (
    prev.items === next.items &&
    prev.isLoading === next.isLoading &&
    prev.page === next.page
  )
})
