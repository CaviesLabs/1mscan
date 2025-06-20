import { Th, Thead, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { TokenHolder20And721, TokenInfo } from "types/api/token"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import HolderNFT721TableItem from "./HolderNFT721TableItem"

interface Props {
  items: TokenHolder20And721[] | undefined
  token: TokenInfo | undefined
  isLoading?: boolean
}

const HolderNFT721Table = ({ items, token, isLoading }: Props) => {
  return (
    <ScrollTable variant="v2" sizes={[6, 20, 20]}>
      <Thead>
        <Tr>
          <Th>{getLanguage("token.holders")}</Th>
          <Th textAlign="right">{getLanguage("token.quantity")}</Th>
          <Th textAlign="right">{getLanguage("token.percentage")}</Th>
        </Tr>
      </Thead>

      <TbodyControl>
        {items?.map((item, index) => (
          <HolderNFT721TableItem
            key={generateKey(index, isLoading, item.address.hash)}
            item={item}
            token={token}
            isLoading={isLoading}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(HolderNFT721Table, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.token === next.token &&
    prev.items === next.items
  )
})
