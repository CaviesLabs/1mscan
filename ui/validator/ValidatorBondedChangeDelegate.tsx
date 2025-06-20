import { memo } from "react"
import { generateListStub } from "stubs/utils"
import { VALIDATOR_BONDED_CHANGE } from "stubs/validator"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import ValidatorBondedChangeTable from "./ValidatorBondedChangeTable"

type Props = {
  isActive?: boolean
  hash: string
}

const placeholderData = generateListStub<"validator_bonded_change">(
  VALIDATOR_BONDED_CHANGE,
  10,
  {
    next_page_params: null,
  },
)

const ValidatorBondedChangeDelegate = ({ isActive, hash }: Props) => {
  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "validator_bonded_change",
    pathParams: {
      address: hash,
    },
    filters: {
      type: "delegate",
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
      <ValidatorBondedChangeTable
        type="delegate"
        hash={hash}
        items={data?.items}
        isLoading={isPlaceholderData}
      />
    </DataListDisplay>
  )
}

export default memo(ValidatorBondedChangeDelegate, (prev, next) => {
  return prev.isActive === next.isActive && prev.hash === next.hash
})
