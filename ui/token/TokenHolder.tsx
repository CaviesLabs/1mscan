import { memo } from "react"
import { TOKEN_HOLDER_ERC_20 } from "stubs/token"
import { generateListStub } from "stubs/utils"
import type {
  TokenHolder20And721,
  TokenHolderERC1155,
  TokenInfo,
} from "types/api/token"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import HolderNFT721Table from "./holders/HolderNFT721Table"
import HolderNFT1155Table from "./holders/HolderNFT1155Table"
import HolderTokenTable from "./holders/HolderTokenTable"

type Props = {
  isLoading?: boolean
  token: TokenInfo | undefined
  hash: string
  isActive?: boolean
}

const placeholderData = generateListStub<"token_holders">(
  TOKEN_HOLDER_ERC_20,
  20,
  { next_page_params: null },
)

const TokenHolder = ({
  isLoading: _isLoading,
  token,
  hash,
  isActive,
}: Props) => {
  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "token_holders",
    pathParams: { hash: hash },
    options: {
      enabled: Boolean(token && !_isLoading && isActive),
      placeholderData: placeholderData,
    },
  })

  const isLoading = isPlaceholderData || _isLoading

  const type = token?.type

  return (
    <DataListDisplay
      actionBar={
        <ActionBar
          paginationChildren={<Pagination pagination={pagination} />}
        ></ActionBar>
      }
    >
      {(type === "ERC-20" || type === "CW-20" || type === "ERC-404") && (
        <HolderTokenTable
          items={data?.items as TokenHolder20And721[]}
          token={token}
          isLoading={isLoading}
          isHybrid={type === "ERC-404"}
        />
      )}
      {(type === "ERC-721" || type === "CW-721") && (
        <HolderNFT721Table
          items={data?.items as TokenHolder20And721[]}
          token={token}
          isLoading={isLoading}
        />
      )}

      {type === "ERC-1155" && (
        <HolderNFT1155Table
          items={data?.items as TokenHolderERC1155[]}
          isLoading={isLoading}
          token={token}
        />
      )}
    </DataListDisplay>
  )
}

export default memo(TokenHolder, (prev, next) => {
  return (
    prev.hash === next.hash &&
    prev.token?.address === next.token?.address &&
    prev.isLoading === next.isLoading &&
    prev.isActive === next.isActive
  )
})
