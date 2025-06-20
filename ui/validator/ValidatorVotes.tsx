import { getLanguage } from "languages/useLanguage"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { memo } from "react"
import { Controller, useForm } from "react-hook-form"
import { generateListStub } from "stubs/utils"
import { VALIDATOR_VOTE } from "stubs/validator"
import type { ProposalVoteOption } from "types/api/proposal"
import { PROPOSAL_VOTE_OPTIONS_FILTERS } from "types/api/proposal"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Filter from "ui/shared/filters/Filter"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import SearchInput from "ui/snippets/searchBar/SearchInput"
import ValidatorVotesTable from "./ValidatorVotesTable"

type Props = {
  isActive?: boolean
  hash: string
}

const placeholderData = generateListStub<"validator_votes">(
  VALIDATOR_VOTE,
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

const ValidatorVotes = ({ isActive, hash }: Props) => {
  const [status, setStatus] = useSetStateQuery<ProposalVoteOption>(
    "status",
    [],
    {
      throttle: 300,
      cleanUp: {
        keepQueries: ["hash", "tab"],
      },
    },
  )

  const [q, setQ] = useSetStateQuery("q", [], {
    debounce: 300,
    cleanUp: {
      keepQueries: ["hash", "tab", "status"],
    },
  })

  const { control } = useForm({
    defaultValues: {
      search: q,
    },
  })

  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "validator_votes",
    pathParams: {
      address: hash,
    },
    filters: {
      limit: 10,
      search: q,
      vote_options: status ? [status] : undefined,
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
          filterProps={{
            gridTemplateColumns: {
              base: "max-content 1fr",
              lg: "max-content max-content",
            },
          }}
          filterChildren={
            <Filter
              title={getLanguage("validator_page.votes.vote_answer")}
              hasArrow
              type="radio"
              allowToggle={false}
              value={status}
              items={PROPOSAL_VOTE_OPTIONS_FILTERS.map((item) => ({
                ...item,
                title: `${item.title} (${data?.vote_option_counter?.[item.id] || 0})`,
              }))}
              onChange={(nextValue) => {
                setStatus(nextValue as never)
              }}
            />
          }
          paginationChildren={<Pagination pagination={pagination} />}
        >
          <Controller
            control={control}
            name="search"
            render={({ field: { value: search, onChange } }) => {
              return (
                <SearchInput
                  value={search}
                  width="full"
                  groupProps={{
                    width: { base: "full", lg: "28rem" },
                  }}
                  onChange={(e) => {
                    const value = e.target.value
                    onChange(value)
                    setQ(value)
                  }}
                  placeholder={getLanguage(
                    "validator_page.votes.search_by_proposal_id_or_proposal_title",
                  )}
                />
              )
            }}
          />
        </ActionBar>
      }
    >
      <ValidatorVotesTable items={data?.items} isLoading={isPlaceholderData} />
    </DataListDisplay>
  )
}

export default memo(ValidatorVotes, (prev, next) => {
  return prev.isActive === next.isActive && prev.hash === next.hash
})
