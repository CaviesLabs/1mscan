import { memo } from "react"
import { getTokenTransfersStub } from "stubs/token"
import type { TokenInfo, TokenType } from "types/api/token"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import HybridTransferTable from "./transfer/HybridTransferTable"

type Props = {
  hash: string
  token: TokenInfo | undefined
  isLoading?: boolean
  isActive?: boolean
}

const TYPE_TOKEN_IDS = [
  "ERC-721",
  "ERC-1155",
  "ERC-404",
  "CW-721",
] satisfies TokenType[]

const TYPE_QUANTITIES = [
  "ERC-20",
  "CW-20",
  "ICS-20",
  "NATIVE",
  "ERC-1155",
  "ERC-404",
] satisfies TokenType[]

const TokenTransfer = ({
  hash,
  token,
  isLoading: _isLoading,
  isActive,
}: Props) => {
  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "token_transfers",
    pathParams: { hash: hash },
    options: {
      enabled: Boolean(token?.address && !_isLoading && isActive),
      placeholderData: getTokenTransfersStub(token?.type),
    },
  })

  const isLoading = isPlaceholderData || _isLoading

  return (
    <DataListDisplay
      actionBar={
        <ActionBar
          paginationChildren={<Pagination pagination={pagination} />}
        ></ActionBar>
      }
    >
      <HybridTransferTable
        items={data?.items}
        isLoading={isLoading}
        token={token}
        showTokenID={TYPE_TOKEN_IDS.includes(token?.type as never)}
        showQuantity={TYPE_QUANTITIES.includes(token?.type as never)}
        page={pagination.snap.page}
      />
    </DataListDisplay>
  )
}

export default memo(TokenTransfer, (prev, next) => {
  return (
    prev.hash === next.hash &&
    prev.token?.address === next.token?.address &&
    prev.isLoading === next.isLoading &&
    prev.isActive === next.isActive
  )
})
