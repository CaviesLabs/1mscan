import { memo } from "react"
import { TOP_ADDRESS } from "stubs/address"
import { generateListStub } from "stubs/utils"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import TopAccountTable from "./TopAccountTable"

const placeholderData = generateListStub<"addresses">(TOP_ADDRESS, 20, {
  next_page_params: null,
  total_supply: "0",
})

type Props = {}

const TopAccountsEVM = ({}: Props) => {
  const { isPlaceholderData, data, pagination } = useQueryWithPages({
    resourceName: "addresses",
    filters: { type: "EVM" },
    options: {
      placeholderData: placeholderData,
    },
  })

  const isLoading = isPlaceholderData
  return (
    <DataListDisplay
      actionBar={
        <ActionBar
          moreInfoProps={{ justifyContent: "flex-end" }}
          paginationChildren={<Pagination pagination={pagination} />}
        ></ActionBar>
      }
    >
      <TopAccountTable
        items={data?.items}
        page={pagination.snap.page}
        isLoading={isLoading}
        osType="EVM"
      />
    </DataListDisplay>
  )
}

export default memo(TopAccountsEVM, () => true)
