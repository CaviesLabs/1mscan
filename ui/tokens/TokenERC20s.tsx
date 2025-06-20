import { getLanguage } from "languages/useLanguage"
import { useShallowEffect } from "lib/hooks/useShallow"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { memo } from "react"
import { Controller, useForm } from "react-hook-form"
import { TOKEN_INFO_ERC_20 } from "stubs/token"
import { generateListStub } from "stubs/utils"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import SearchInput from "ui/snippets/searchBar/SearchInput"
import TokenWithPointerTable from "./TokenWithPointerTable"

type Props = {
  isActive?: boolean
}

const placeholderData = generateListStub<"tokens">(TOKEN_INFO_ERC_20, 20, {
  next_page_params: null,
})

const TokenERC20s = ({ isActive }: Props) => {
  const [q, setQ] = useSetStateQuery<string>("q", [], {
    debounce: 200,
    cleanUp: { keepQueries: ["tab"] },
    isActive,
  })

  const { control, getValues, setValue } = useForm({
    defaultValues: { search: q || "" },
  })

  const { data, pagination, isPlaceholderData } = useQueryWithPages({
    resourceName: "tokens",
    filters: {
      q: q,
      type: "ERC-20",
    },
    options: {
      placeholderData: placeholderData,
    },
    isActive,
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
    <DataListDisplay
      actionBar={
        <ActionBar
          paginationChildren={<Pagination pagination={pagination}></Pagination>}
        >
          <Controller
            control={control}
            name="search"
            render={({ field: { value: search, onChange } }) => {
              return (
                <SearchInput
                  value={search}
                  groupProps={{
                    width: { base: "full", lg: "28rem" },
                  }}
                  onChange={(e) => {
                    const value = e.target.value
                    setQ(value)
                    onChange(value)
                  }}
                  placeholder={getLanguage(
                    "token.search_by_token_name_or_symbol_or_address",
                  )}
                />
              )
            }}
          ></Controller>
        </ActionBar>
      }
    >
      <TokenWithPointerTable
        page={pagination.snap.page}
        items={data?.items}
        isLoading={isPlaceholderData}
      />
    </DataListDisplay>
  )
}

export default memo(TokenERC20s, (prev, next) => {
  return prev.isActive === next.isActive
})
