import { Th, Thead, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { TokenHolder20And721, TokenInfo } from "types/api/token"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import HolderTokenTableItem from "./HolderTokenTableItem"

interface Props {
  items: TokenHolder20And721[] | undefined
  token: TokenInfo | undefined
  isLoading?: boolean
  isHybrid?: boolean
}

const HolderTokenTable = ({ items, token, isLoading, isHybrid }: Props) => {
  return (
    <ScrollTable variant="v2" sizes={[40, 20, 20, 20]}>
      <Thead>
        <Tr>
          <Th>{getLanguage("token.holders")}</Th>
          <Th textAlign="right">{getLanguage("token.quantity")}</Th>
          <Th textAlign="right">{getLanguage("token.percentage")}</Th>
          <Th textAlign="right">{getLanguage("token.value")}</Th>
        </Tr>
      </Thead>

      <TbodyControl>
        {items?.map((item, index) => (
          <HolderTokenTableItem
            key={generateKey(index, isLoading, item.address.hash)}
            item={item}
            token={token}
            isLoading={isLoading}
            isHybrid={isHybrid}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(HolderTokenTable, (prev, next) => {
  return (
    prev.token?.address === next.token?.address &&
    prev.isLoading === next.isLoading &&
    prev.isHybrid === next.isHybrid &&
    prev.items === next.items
  )
})
