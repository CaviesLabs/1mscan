import { memo } from "react"
import { ADDRESS_TOKEN_BALANCE_ERC_20 } from "stubs/address"
import { generateListStub } from "stubs/utils"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import AddressTokensTable from "./tokens/AddressTokensTable"

type Props = {
  hash: string
  isLoading?: boolean
  isActive?: boolean
}

const placeholderData = generateListStub<"address_tokens">(
  ADDRESS_TOKEN_BALANCE_ERC_20,
  10,
  { next_page_params: null },
)

const AddressERC20Token = ({
  hash,
  isLoading: _isLoading,
  isActive,
}: Props) => {
  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "address_tokens",
    pathParams: { hash },
    filters: {
      type: "ERC-20",
    },
    options: {
      enabled: Boolean(hash && !_isLoading && isActive),
      refetchOnMount: false,
      placeholderData,
    },
  })

  const isLoading = isPlaceholderData || _isLoading

  return (
    <DataListDisplay
      actionBar={
        <ActionBar
          paginationChildren={<Pagination pagination={pagination}></Pagination>}
        ></ActionBar>
      }
    >
      <AddressTokensTable
        items={data?.items}
        tokenType="ERC-20"
        isLoading={isLoading}
      />
    </DataListDisplay>
  )
}

export default memo(AddressERC20Token, (prev, next) => {
  return (
    prev.hash === next.hash &&
    prev.isLoading === next.isLoading &&
    prev.isActive === next.isActive
  )
})
