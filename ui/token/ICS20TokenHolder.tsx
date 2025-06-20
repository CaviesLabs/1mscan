import { memo } from "react"
import { TOKEN_HOLDER_ERC_20 } from "stubs/token"
import type {
  TokenHolder as ITokenHolder,
  TokenHolder20And721,
  TokenInfo,
} from "types/api/token"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import HolderTokenTable from "./holders/HolderTokenTable"

type Props = {
  isLoading?: boolean
  token: TokenInfo | undefined
  hash: string
  isActive?: boolean
}

const placeholderData = {
  total_count: 10,
  items: Array<ITokenHolder>(10).fill(TOKEN_HOLDER_ERC_20),
  next_page_params: null,
}

const ICS20TokenHolder = ({
  hash,
  token,
  isLoading: _isLoading,
  isActive,
}: Props) => {
  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "ics20_token_holders",
    pathParams: { hash },
    options: {
      placeholderData: placeholderData,
      enabled: Boolean(token?.address && !_isLoading && isActive),
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
      <HolderTokenTable
        items={data?.items as TokenHolder20And721[]}
        token={token}
        isLoading={isLoading}
      />
    </DataListDisplay>
  )
}

export default memo(ICS20TokenHolder, (prev, next) => {
  return (
    prev.hash === next.hash &&
    prev.token?.address === next.token?.address &&
    prev.isLoading === next.isLoading &&
    prev.isActive === next.isActive
  )
})
