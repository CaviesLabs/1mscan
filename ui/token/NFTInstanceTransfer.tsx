import { memo } from "react"
import { TOKEN_TRANSFER_ERC_721 } from "stubs/token"
import { generateListStub } from "stubs/utils"
import type { TokenInfo } from "types/api/token"
import DataListDisplay from "ui/shared/DataListDisplay"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import HybridTransferTable from "./transfer/HybridTransferTable"

type Props = {
  isLoading?: boolean
  token: TokenInfo | undefined
  hash: string
  id: string
  isActive?: boolean
}

const placeholderData = generateListStub<"token_instance_transfers">(
  TOKEN_TRANSFER_ERC_721,
  20,
  {
    next_page_params: null,
  },
)

const NFTInstanceTransfer = ({
  isLoading: _isLoading,
  token,
  hash,
  id,
  isActive,
}: Props) => {
  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "token_instance_transfers",
    pathParams: { hash, id: encodeURIComponent(id) },

    options: {
      enabled: Boolean(token && !_isLoading && isActive),
      placeholderData: placeholderData,
    },
  })

  const isLoading = isPlaceholderData || _isLoading

  return (
    <DataListDisplay>
      <HybridTransferTable
        items={data?.items}
        isLoading={isLoading}
        token={token}
        page={pagination.snap.page}
        showQuantity={token?.type === "ERC-1155"}
      />
    </DataListDisplay>
  )
}

export default memo(NFTInstanceTransfer, (prev, next) => {
  return (
    prev.hash === next.hash &&
    prev.id === next.id &&
    prev.isLoading === next.isLoading &&
    prev.token === next.token &&
    prev.isActive === next.isActive
  )
})
