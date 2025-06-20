import { Stack } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { memo } from "react"
import { INTERNAL_TX } from "stubs/internalTx"
import { generateListStub } from "stubs/utils"
import AddressIntTxsTable from "ui/address/internals/AddressIntTxsTable"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import SkeletonText from "ui/shared/text/SkeletonText"
import AddressCsvExportLink from "./AddressCsvExportLink"
import AddressTxsFilter from "./AddressTxsFilter"

type Props = {
  isLoading?: boolean
  hash: string | undefined
  isActive?: boolean
}

const placeholderData = generateListStub<"address_internal_txs">(
  INTERNAL_TX,
  10,
  {
    next_page_params: null,
  },
)

const AddressInternalTxs = ({
  isLoading: _isLoading,
  hash,
  isActive,
}: Props) => {
  const [filter, setFilter] = useSetStateQuery<"from" | "to" | undefined>(
    "filter",
    [],
    {
      throttle: 200,
    },
  )

  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "address_internal_txs",
    pathParams: { hash },
    filters: { filter: filter || undefined },
    options: {
      enabled: Boolean(hash && !_isLoading && isActive),
      placeholderData: placeholderData,
    },
  })

  const isLoading = _isLoading || isPlaceholderData

  return (
    <Stack spacing={5} alignItems="stretch">
      <SkeletonText textStyle="1" isLoading={isLoading}>
        {getLanguage(
          "address.internal_transactions_are_specific_to_evm_compatible",
        )}
      </SkeletonText>
      <DataListDisplay
        actionBar={
          <ActionBar
            filterChildren={
              <AddressTxsFilter
                value={filter}
                onFilterChange={(value) => setFilter(value)}
                isLoading={isLoading}
              />
            }
            paginationChildren={<Pagination pagination={pagination} />}
            exportChildren={
              <AddressCsvExportLink
                address={hash}
                isLoading={isLoading}
                params={{
                  type: "internal-transactions",
                  filterType: "address",
                  filterValue: filter,
                }}
              />
            }
          ></ActionBar>
        }
      >
        <AddressIntTxsTable
          items={data?.items}
          hash={hash}
          isLoading={isLoading}
          page={pagination.snap.page}
        />
      </DataListDisplay>
    </Stack>
  )
}

export default memo(AddressInternalTxs, (prev, next) => {
  return (
    prev.hash === next.hash &&
    prev.isLoading === next.isLoading &&
    prev.isActive === next.isActive
  )
})
