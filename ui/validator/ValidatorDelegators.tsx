import { memo } from "react"
import { generateListStub } from "stubs/utils"
import { VALIDATOR_DELEGATORS } from "stubs/validator"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import ValidatorDelegatorsTable from "./ValidatorDelegatorsTable"

type Props = {
  isActive?: boolean
  hash: string
}

const placeholderData = generateListStub<"validator_delegators">(
  VALIDATOR_DELEGATORS,
  10,
  {
    next_page_params: null,
  },
)

const ValidatorDelegators = ({ isActive, hash }: Props) => {
  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "validator_delegators",
    pathParams: {
      address: hash,
    },
    filters: {
      limit: 10,
    },
    options: {
      placeholderData,
    },
    isActive,
  })

  return (
    <DataListDisplay
      actionBar={
        <ActionBar
          paginationChildren={<Pagination pagination={pagination}></Pagination>}
        />
      }
    >
      <ValidatorDelegatorsTable
        items={data?.items}
        isLoading={isPlaceholderData}
      />
    </DataListDisplay>
  )
}

export default memo(ValidatorDelegators, (prev, next) => {
  return prev.isActive === next.isActive && prev.hash === next.hash
})
