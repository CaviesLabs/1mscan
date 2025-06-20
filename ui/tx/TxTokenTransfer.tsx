import { getTransactionType } from "lib/getOSType"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { ALL_TOKEN_TYPE_IDS } from "lib/token/tokenTypes"
import { parseClause } from "lib/utils/json"
import { memo } from "react"
import { TOKEN_TRANSFER_ERC_20 } from "stubs/token"
import { generateListStub } from "stubs/utils"
import type { TokenTypeWithTransfer } from "types/api/token"
import type { OSType } from "types/base"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import TxTransferFilter from "ui/shared/TransactionTokenTransfer/TxTransferFilter"
import TxTransferTable from "ui/shared/TransactionTokenTransfer/TxTransferTable"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"

type Props = {
  hash: string
  isActive?: boolean
}

const placeholderData = generateListStub<"token_transfers">(
  TOKEN_TRANSFER_ERC_20,
  5,
  {
    next_page_params: null,
  },
)

const TxTokenTransfer = ({ hash, isActive }: Props) => {
  const [typeFilter, setTypeFilter] = useSetStateQuery<
    string,
    TokenTypeWithTransfer[],
    TokenTypeWithTransfer[]
  >("type", [], {
    throttle: 200,
    decode: (value) => {
      const tokenFilters = parseClause<TokenTypeWithTransfer[]>(value, [])!

      if (
        tokenFilters.some(
          (type) =>
            type !== "coin_transfer" && !ALL_TOKEN_TYPE_IDS.includes(type),
        )
      )
        return []
      return tokenFilters
    },
    encode: JSON.stringify,
  })

  const [transactionType] = useSetStateQuery<string, OSType>("hash", [], {
    decode: (value) => getTransactionType(value) || ("" as any),
  })

  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "tx_token_transfers",
    pathParams: { hash: hash },
    options: {
      enabled: Boolean(hash && isActive),
      placeholderData: placeholderData,
    },
    filters: { type: typeFilter },
  })

  const isLoading = isPlaceholderData

  return (
    <DataListDisplay
      actionBar={
        <ActionBar
          moreInfoProps={{ justifyContent: "flex-end" }}
          filterChildren={
            <TxTransferFilter
              defaultTypeFilters={typeFilter}
              onTypeFilterChange={(nextValue) => setTypeFilter(nextValue || [])}
              isLoading={isLoading}
              transactionType={transactionType}
            />
          }
          paginationChildren={<Pagination pagination={pagination} />}
        ></ActionBar>
      }
    >
      <TxTransferTable
        items={data?.items}
        isLoading={isLoading}
        page={pagination.snap.page}
      />
    </DataListDisplay>
  )
}

export default memo(
  TxTokenTransfer,
  (prev, next) => prev.hash === next.hash && prev.isActive === next.isActive,
)
