import { memo } from "react"
import { TOKEN_HOLDER_ERC_1155 } from "stubs/token"
import { generateListStub } from "stubs/utils"
import type { TokenHolderERC1155, TokenInfo } from "types/api/token"
import DataListDisplay from "ui/shared/DataListDisplay"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import { default as HolderNFT1155Table } from "./holders/HolderNFT1155Table"

type Props = {
  hash: string
  id: string
  isLoading?: boolean
  token: TokenInfo | undefined
  isActive?: boolean
}

const placeholderData = generateListStub<"token_instance_holders">(
  TOKEN_HOLDER_ERC_1155,
  10,
  { next_page_params: null },
)

const NFTInstanceHolder = ({
  hash,
  id,
  isLoading: _isLoading,
  token,
  isActive,
}: Props) => {
  const { data, isPlaceholderData } = useQueryWithPages({
    resourceName: "token_instance_holders",
    pathParams: { hash, id: encodeURIComponent(id) },
    options: {
      enabled: Boolean(token && !_isLoading && isActive),
      placeholderData,
    },
  })

  const isLoading = isPlaceholderData || _isLoading

  return (
    <DataListDisplay>
      <HolderNFT1155Table
        items={data?.items as TokenHolderERC1155[]}
        isLoading={isLoading}
        token={token}
      />
    </DataListDisplay>
  )
}

export default memo(NFTInstanceHolder, (prev, next) => {
  return (
    prev.hash === next.hash &&
    prev.id === next.id &&
    prev.isLoading === next.isLoading &&
    prev.token === next.token &&
    prev.isActive === next.isActive
  )
})
