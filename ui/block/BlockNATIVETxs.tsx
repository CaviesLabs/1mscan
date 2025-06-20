import { isNil } from "lodash"
import { memo } from "react"
import { TX } from "stubs/tx"
import { generateListStub } from "stubs/utils"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import BlockTxsTable from "./BlockTxsTable"

type Props = {
  heightOrHash: string
  isLoading?: boolean
  isActive?: boolean
}

const placeholderData = generateListStub<"block_txs">(TX, 10, {
  next_page_params: null,
})

const BlockNATIVETxs = ({
  heightOrHash,
  isLoading: _isLoading,
  isActive,
}: Props) => {
  const { data, isPlaceholderData, dataUpdatedAt, pagination } =
    useQueryWithPages({
      resourceName: "block_txs",
      pathParams: { height_or_hash: heightOrHash },
      filters: { type: "Cosmos" },
      options: {
        enabled: Boolean(!isNil(heightOrHash) && !_isLoading && isActive),
        placeholderData: placeholderData,
      },
    })

  const isLoading = isPlaceholderData || _isLoading

  return (
    <DataListDisplay
      actionBar={
        <ActionBar
          paginationChildren={<Pagination pagination={pagination} />}
        />
      }
    >
      <BlockTxsTable
        osType="Cosmos"
        isLoading={isLoading}
        items={data?.items}
        dataUpdatedAt={dataUpdatedAt}
      />
    </DataListDisplay>
  )
}

export default memo(BlockNATIVETxs, (prev, next) => {
  return (
    prev.heightOrHash === next.heightOrHash &&
    prev.isLoading === next.isLoading &&
    prev.isActive === next.isActive
  )
})
