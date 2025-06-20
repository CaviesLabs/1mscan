import { getLanguage } from "languages/useLanguage"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { memo } from "react"
import { Controller, useForm } from "react-hook-form"
import { generateListStub } from "stubs/utils"
import { VALIDATORS_DELEGATORS } from "stubs/validator"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import SearchInput from "ui/snippets/searchBar/SearchInput"
import type { IForm } from "ui/validators/utils"
import ValidatorsDelegatorsTable from "./ValidatorsDelegatorsTable"

type Props = {
  isActive?: boolean
}

const placeholderData = generateListStub<"validators_delegators">(
  VALIDATORS_DELEGATORS,
  10,
  {
    next_page_params: null,
  },
)

const ValidatorsDelegators = ({ isActive }: Props) => {
  const [q, setQ] = useSetStateQuery("q", [], {
    debounce: 300,
    cleanUp: {
      keepQueries: ["tab"],
    },
    isActive,
  })

  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "validators_delegators",
    filters: {
      q: q,
      limit: 10,
    },
    options: {
      placeholderData,
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
      <ValidatorsDelegatorsTable
        items={data?.items}
        isLoading={isPlaceholderData}
      />
    </DataListDisplay>
  )
}

export default memo(ValidatorsDelegators, (prev, next) => {
  return prev.isActive === next.isActive
})
