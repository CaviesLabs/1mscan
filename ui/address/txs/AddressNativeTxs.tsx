import { memo } from "react"
import { TX } from "stubs/tx"
import { generateListStub } from "stubs/utils"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import AddressCsvExportLink from "../AddressCsvExportLink"
import AddressTxsTable from "./AddressTxsTable"

type Props = {
  hash: string
  isLoading?: boolean
  isActive?: boolean
}

const placeholderData = generateListStub<"address_txs">(TX, 10, {
  next_page_params: null,
})

const AddressNativeTxs = ({ hash, isLoading: _isLoading, isActive }: Props) => {
  const { data, isPlaceholderData, pagination, dataUpdatedAt } =
    useQueryWithPages({
      resourceName: "address_txs",
      pathParams: { hash: hash },
      filters: { type: "Cosmos" },
      options: {
        enabled: Boolean(hash && !_isLoading && isActive),
        placeholderData: placeholderData,
      },
    })

  const isLoading = _isLoading || isPlaceholderData

  return (
    <DataListDisplay
      actionBar={
        <ActionBar
          exportChildren={
            <AddressCsvExportLink
              address={hash}
              params={{
                type: "transactions",
                filterType: "address",
                filterValue: hash,
              }}
              isLoading={isLoading}
            />
          }
          paginationChildren={<Pagination pagination={pagination} />}
        ></ActionBar>
      }
    >
      <AddressTxsTable
        items={data?.items}
        hash={hash}
        isLoading={isLoading}
        dataUpdatedAt={dataUpdatedAt}
        osType="Cosmos"
      />
    </DataListDisplay>
  )
}

export default memo(AddressNativeTxs, (prev, next) => {
  return (
    prev.hash === next.hash &&
    prev.isLoading === next.isLoading &&
    prev.isActive === next.isActive
  )
})
