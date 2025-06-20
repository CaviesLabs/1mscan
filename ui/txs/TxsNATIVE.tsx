import { memo } from "react"
import { TX_COSMOS } from "stubs/tx"
import { generateListStub } from "stubs/utils"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import TxsTable from "./TxsTable"

const placeholderData = generateListStub<"txs_validated">(TX_COSMOS, 10, {
  next_page_params: null,
})

type Props = {
  isActive?: boolean
}

const TxsNATIVE = ({ isActive }: Props) => {
  const { data, isPlaceholderData, dataUpdatedAt, pagination } =
    useQueryWithPages({
      resourceName: "txs_validated",
      filters: {
        filters: "validated",
        type: "Cosmos",
      },
      options: {
        enabled: Boolean(isActive),
        placeholderData: placeholderData,
      },
    })

  const isLoading = isPlaceholderData

  return (
    <DataListDisplay
      actionBar={
        <ActionBar
          paginationChildren={<Pagination pagination={pagination} />}
        />
      }
    >
      <TxsTable
        items={data?.items}
        isLoading={isLoading}
        osType="Cosmos"
        dataUpdatedAt={dataUpdatedAt}
      />
    </DataListDisplay>
  )
}

export default memo(TxsNATIVE, (prev, next) => {
  return prev.isActive === next.isActive
})
