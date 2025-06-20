import { getLanguage } from "languages/useLanguage"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { memo } from "react"
import { Controller, useForm } from "react-hook-form"
import { generateListStub } from "stubs/utils"
import { VALIDATOR_DELEGATIONS } from "stubs/validator"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import SearchInput from "ui/snippets/searchBar/SearchInput"
import type { IForm } from "ui/validators/utils"
import ValidatorsDelegationsRedelegateTable from "./ValidatorsDelegationsRedelegateTable"

type Props = {
  isActive?: boolean
}

const placeholderData = generateListStub<"validators_delegations">(
  VALIDATOR_DELEGATIONS,
  10,
  {
    next_page_params: null,
  },
)

const ValidatorsDelegationsRedelegate = ({ isActive }: Props) => {
  const [q, setQ] = useSetStateQuery("q", [], {
    debounce: 300,
    cleanUp: {
      keepQueries: ["tab", "delegations"],
    },
    isActive,
  })

  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "validators_delegations",
    filters: {
      q: q,
      type: "redelegate",
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
      <ValidatorsDelegationsRedelegateTable
        items={data?.items}
        isLoading={isPlaceholderData}
      />
    </DataListDisplay>
  )
}

export default memo(ValidatorsDelegationsRedelegate, (prev, next) => {
  return prev.isActive === next.isActive
})
