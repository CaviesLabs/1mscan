import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { memo } from "react"
import { TX } from "stubs/tx"
import { generateListStub } from "stubs/utils"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import AddressCsvExportLink from "../AddressCsvExportLink"
import AddressTxsFilter from "../AddressTxsFilter"
import AddressTxsTable from "./AddressTxsTable"

type Props = {
  hash: string
  isLoading?: boolean
  isActive?: boolean
}

const placeholderData = generateListStub<"address_txs">(TX, 10, {
  next_page_params: null,
})

const AddressEVMTxs = ({ hash, isLoading: _isLoading, isActive }: Props) => {
  const [filter, setFilter] = useSetStateQuery<"from" | "to" | undefined>(
    "filter",
    [],
    {
      throttle: 200,
    },
  )

  const { data, isPlaceholderData, pagination, dataUpdatedAt } =
    useQueryWithPages({
      resourceName: "address_txs",
      pathParams: { hash: hash },
      filters: { filter: filter || undefined, type: "EVM" },
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
          filterChildren={
            <AddressTxsFilter
              value={filter}
              onFilterChange={(nextValue) => {
                setFilter(nextValue)
              }}
              isLoading={isLoading}
            />
          }
          exportChildren={
            <AddressCsvExportLink
              address={hash}
              params={{
                type: "transactions",
                filterType: "address",
                filterValue: filter,
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
        osType="EVM"
      />
    </DataListDisplay>
  )
}

export default memo(AddressEVMTxs, (prev, next) => {
  return (
    prev.hash === next.hash &&
    prev.isLoading === next.isLoading &&
    prev.isActive === next.isActive
  )
})
