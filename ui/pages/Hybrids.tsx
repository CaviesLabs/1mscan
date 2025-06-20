import { useShallowEffect } from "lib/hooks/useShallow"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { memo } from "react"
import { Controller, useForm } from "react-hook-form"
import { TOKEN_INFO_ERC_404 } from "stubs/token"
import { generateListStub } from "stubs/utils"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import PageTitle from "ui/shared/Page/PageTitle"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import SearchInput from "ui/snippets/searchBar/SearchInput"
import TokenWithoutPointerTable from "ui/tokens/TokenWithoutPointerTable"

type Props = {}

const placeholderData = generateListStub<"tokens">(TOKEN_INFO_ERC_404, 20, {
  next_page_params: null,
})

const Hybrids = ({}: Props) => {
  const [q, setQ] = useSetStateQuery<string>("q", [], {
    debounce: 200,
    cleanUp: { keepQueries: ["tab"] },
  })

  const { control, getValues, setValue } = useForm({
    defaultValues: { search: "" },
  })

  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "tokens",
    filters: {
      q: q,
      type: "ERC-404",
    },

    options: {
      placeholderData: placeholderData,
    },
  })

  useShallowEffect(
    () => {
      if (getValues("search") !== q) {
        setValue("search", q || "")
      }
    },
    [q],
    {
      defer: true,
    },
  )
  return (
    <>
      <PageTitle hasDefaultBackLink title="Hybrid Tokens (ERC-404)" />
      <DataListDisplay
        actionBar={
          <ActionBar
            paginationChildren={
              <Pagination pagination={pagination}></Pagination>
            }
          >
            <Controller
              control={control}
              name="search"
              render={({ field: { value: search, onChange, ...props } }) => {
                return (
                  <SearchInput
                    {...props}
                    value={search}
                    groupProps={{
                      width: { base: "full", lg: "28rem" },
                    }}
                    onChange={(e) => {
                      const value = e.target.value
                      setQ(value)
                      onChange(value)
                    }}
                    placeholder="Search by token name or symbol or address"
                  />
                )
              }}
            ></Controller>
          </ActionBar>
        }
      >
        <TokenWithoutPointerTable
          page={pagination.snap.page}
          items={data?.items}
          isLoading={isPlaceholderData}
        />
      </DataListDisplay>
    </>
  )
}

export default memo(Hybrids, () => true)
