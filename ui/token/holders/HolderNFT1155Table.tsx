import { Th, Thead, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { TokenHolderERC1155, TokenInfo } from "types/api/token"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import HolderNFT1155TableItem from "./HolderNFT1155TableItem"

interface Props {
  items: TokenHolderERC1155[] | undefined
  token: TokenInfo | undefined
  isLoading?: boolean
}

const HolderNFT1155Table = ({ items, isLoading, token }: Props) => {
  return (
    <ScrollTable variant="v2" sizes={[50, 20, 40]}>
      <Thead>
        <Tr>
          <Th>{getLanguage("token.holders")}</Th>
          <Th textAlign="right">ID#</Th>
          <Th textAlign="right">{getLanguage("token.quantity")}</Th>
        </Tr>
      </Thead>

      <TbodyControl>
        {items?.map((item, index) => (
          <HolderNFT1155TableItem
            key={generateKey(index, isLoading, item.address.hash)}
            item={item}
            isLoading={isLoading}
            token={token}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(HolderNFT1155Table, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.items === next.items &&
    prev.token === next.token
  )
})
