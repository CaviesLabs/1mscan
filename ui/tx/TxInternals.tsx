import { memo } from "react"
import { INTERNAL_TX } from "stubs/internalTx"
import { generateListStub } from "stubs/utils"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import TxInternalsTable from "ui/tx/internals/TxInternalsTable"

type Props = {
  hash: string
  isActive?: boolean
}

const placeholderData = generateListStub<"tx_internal_txs">(INTERNAL_TX, 5, {
  next_page_params: null,
})

const TxInternals = ({ hash, isActive }: Props) => {
  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "tx_internal_txs",
    pathParams: { hash: hash },
    options: {
      enabled: Boolean(hash && isActive),
      placeholderData: placeholderData,
    },
  })

  const isLoading = isPlaceholderData

  return (
    <DataListDisplay
      actionBar={
        <ActionBar
          paginationChildren={<Pagination pagination={pagination} />}
        ></ActionBar>
      }
    >
      <TxInternalsTable items={data?.items} isLoading={isLoading} />
    </DataListDisplay>
  )
}

export default memo(TxInternals, (prev, next) => {
  return prev.hash === next.hash && prev.isActive === next.isActive
})
