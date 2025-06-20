import { Th, Tr } from "@chakra-ui/react"

import type { TokenTransferPayload } from "types/api/tokenTransfer"

// import * as SocketNewItemsNotice from "ui/shared/SocketNewItemsNotice";
import { Thead } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { TokenInfo } from "types/api/token"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import HybridTransferTableItem from "./HybridTransferTableItem"

interface Props {
  isLoading?: boolean
  items: TokenTransferPayload[] | undefined
  token: TokenInfo | undefined
  showTokenID?: boolean
  showQuantity?: boolean
  page: number
}

const HybridTransferTable = ({
  items,
  isLoading,
  token,
  showTokenID,
  showQuantity,
  page,
}: Props) => {
  return (
    <ScrollTable
      variant="v2"
      sizes={
        (showTokenID && showQuantity && [19, 15, 20, 20, 13, 13]) ||
        (showTokenID && [30, 10, 30, 30]) ||
        (showQuantity && [20, 20, 20, 20, 20]) || [20, 20, 30, 30]
      }
      maxs={["15rem"]}
    >
      <Thead>
        <Tr>
          <Th>{getLanguage("token.trx_hash")}</Th>
          <Th>{getLanguage("token.type_and_method")}</Th>
          <Th>{getLanguage("token.from")}</Th>
          <Th paddingLeft="3rem !important">{getLanguage("token.to")}</Th>
          {showTokenID && <Th>{getLanguage("token.token_id")}</Th>}
          {showQuantity && (
            <Th textAlign="right">{getLanguage("token.quantity")}</Th>
          )}
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => (
          <HybridTransferTableItem
            key={generateKey(
              index,
              isLoading,
              index,
              item.tx_hash,
              page,
              item.type,
              item.method,
              item.from.hash,
              item.to.hash,
              item.total.denom,
              item.total.value,
              item.total.token_id,
              item.token?.address,
              item.log_index,
            )}
            isLoading={isLoading}
            item={item}
            token={token}
            showTokenID={showTokenID}
            showQuantity={showQuantity}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(HybridTransferTable, (prev, next) => {
  return (
    prev.page === next.page &&
    prev.items === next.items &&
    prev.token === next.token &&
    prev.showTokenID === next.showTokenID &&
    prev.showQuantity === next.showQuantity &&
    prev.isLoading === next.isLoading
  )
})
