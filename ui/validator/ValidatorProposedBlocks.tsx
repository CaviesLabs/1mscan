import { memo } from "react"
import { generateListStub } from "stubs/utils"
import { VALIDATOR_PROPOSED_BLOCK } from "stubs/validator"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import ValidatorProposedBlocksTable from "./ValidatorProposedBlocksTable"

type Props = {
  isActive?: boolean
  hash: string
}

const placeholderData = generateListStub<"validator_proposed_blocks">(
  VALIDATOR_PROPOSED_BLOCK,
  10,
  {
    next_page_params: null,
    total_count: 10,
    vote_option_counter: {
      VOTE_OPTION_YES: 0,
      VOTE_OPTION_NO: 0,
      VOTE_OPTION_NO_WITH_VETO: 0,
      VOTE_OPTION_ABSTAIN: 0,
      DID_NOT_VOTE: 0,
    },
  },
)

const ValidatorProposedBlocks = ({ isActive, hash }: Props) => {
  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "validator_proposed_blocks",
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
      <ValidatorProposedBlocksTable
        items={data?.items}
        isLoading={isPlaceholderData}
      />
    </DataListDisplay>
  )
}

export default memo(ValidatorProposedBlocks, (prev, next) => {
  return prev.isActive === next.isActive && prev.hash === next.hash
})
