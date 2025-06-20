import { getLanguage } from "languages/useLanguage"
import useApiQuery from "lib/api/useApiQuery"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { memo } from "react"
import { Controller, useForm } from "react-hook-form"
import { generateListStub } from "stubs/utils"
import { VALIDATOR_INFO } from "stubs/validator"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import SearchInput from "ui/snippets/searchBar/SearchInput"
import ValidatorsFilter from "ui/validators/ValidatorsFilter"
import ValidatorsTable from "ui/validators/ValidatorsTable"
import { mapValidatorsAPR } from "ui/validators/apr"
import type { ICombinedSortApi, IForm } from "ui/validators/utils"

type Props = {
  isActive?: boolean
}

const placeholderData = generateListStub<"validators">(VALIDATOR_INFO, 10, {
  next_page_params: null,
})

const ValidatorsContent = ({ isActive }: Props) => {
  const [status] = useSetStateQuery("status", [], {
    throttle: 300,
    decode(value) {
      return (
        (value === "active" && "active") ||
        (value === "inactive" && "inactive") ||
        (value === "jailed" && "jailed") ||
        "active"
      )
    },
    cleanUp: {
      keepQueries: ["tab"],
    },
    isActive,
  })

  const [q, setQ] = useSetStateQuery("q", [], {
    debounce: 300,
    cleanUp: {
      keepQueries: ["tab"],
    },
    isActive,
  })

  const [sort, setSort] = useSetStateQuery<ICombinedSortApi | undefined>(
    "sort",
    [],
    {
      throttle: 300,
      isActive,
    },
  )

  const { data: stakingPool } = useApiQuery("params_staking_pool", {
    queryOptions: {},
  })

  const { data: mint } = useApiQuery("params_mint", {
    queryOptions: {},
  })

  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "validators",
    filters: {
      status: status,
      q: q,
      limit: 10,
    },
    options: {
      placeholderData,
      select: (data) => {
        return {
          items: mapValidatorsAPR(
            stakingPool?.pool.bonded_tokens,
            mint?.params.token_release_schedule,
            data?.items,
          ),
          next_page_params: data?.next_page_params,
        }
      },
    },
    isActive,
  })

  const formData = useForm<IForm>({
    defaultValues: {
      search: q,
    },
  })

  const { control } = formData

  return (
    <DataListDisplay
      actionBar={
        <ActionBar
          filterProps={{
            order: 1,
            gridTemplateColumns: {
              base: "max-content max-content",
              lg: "max-content max-content",
            },
            // alignItems: "stretch",
          }}
          mainProps={{ order: 2 }}
          moreInfoProps={{ justifyContent: "flex-end" }}
          filterChildren={<ValidatorsFilter status={status}></ValidatorsFilter>}
          paginationChildren={<Pagination pagination={pagination}></Pagination>}
        >
          <Controller
            control={control}
            name="search"
            render={({ field: { onChange, value } }) => {
              return (
                <SearchInput
                  onChange={(e) => {
                    const nextValue = e.target.value

                    onChange(e)
                    setQ(nextValue)
                  }}
                  width="full"
                  placeholder={getLanguage(
                    "validators_page.search_by_validator_name_or_delegator_address",
                  )}
                  value={value}
                  groupProps={{ width: { base: "full", lg: "25rem" } }}
                />
              )
            }}
          ></Controller>
        </ActionBar>
      }
    >
      <ValidatorsTable
        items={data?.items}
        isLoading={isPlaceholderData}
        sort={sort}
        setSort={setSort}
      ></ValidatorsTable>
    </DataListDisplay>
  )
}

export default memo(ValidatorsContent, (prev, next) => {
  return prev.isActive === next.isActive
})
