import { memo } from "react"
import { TOKEN_TRANSFER_NATIVE } from "stubs/token"
import type { TokenInfo } from "types/api/token"
import type { TokenTransfer as ITokenTransfer } from "types/api/tokenTransfer"
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

const placeholderData = {
  total_count: 10,
  items: Array<ITokenTransfer<"NATIVE">>(10).fill(TOKEN_TRANSFER_NATIVE),
  next_page_params: null,
}

const FactoryTokenTransfer = ({
  hash,
  token,
  isLoading: _isLoading,
  isActive,
}: Props) => {
  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "native_token_transfers",
    filters: { denom: hash },
    options: {
      enabled: Boolean(hash && token && !_isLoading && isActive),
      placeholderData: placeholderData,
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
        token={token!}
        page={pagination.snap.page}
        showQuantity
      />
    </DataListDisplay>
  )
}

export default memo(FactoryTokenTransfer, (prev, next) => {
  return (
    prev.hash === next.hash &&
    prev.token?.address === next.token?.address &&
    prev.isLoading === next.isLoading &&
    prev.isActive === next.isActive
  )
})
