import { getLanguage } from "languages/useLanguage"
import { useShallowEffect } from "lib/hooks/useShallow"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { memo } from "react"
import { Controller, useForm } from "react-hook-form"
import { TOKEN_INFO_NATIVE } from "stubs/token"
import type { TokenInfo } from "types/api/token"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import SearchInput from "ui/snippets/searchBar/SearchInput"
import TokenWithPointerTable from "./TokenWithPointerTable"

type Props = {
  isActive?: boolean
}

const placeholderData = {
  items: Array<TokenInfo<"NATIVE">>(10).fill(TOKEN_INFO_NATIVE),
  total_count: 10,
  next_page_params: null,
}

const TokenNatives = ({ isActive }: Props) => {
  const [q, setQ] = useSetStateQuery<string>("q", [], {
    debounce: 200,
    cleanUp: { keepQueries: ["tab"] },
    isActive,
  })

  const { control, getValues, setValue } = useForm({
    defaultValues: { search: q || "" },
  })

  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "native_tokens",
    filters: {
      search: q,
    },
    options: {
      placeholderData,
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
            render={({ field: { value: search, onChange, ...field } }) => {
              return (
                <SearchInput
                  {...field}
                  value={search}
                  groupProps={{
                    width: { base: "full", lg: "28rem" },
                  }}
                  onChange={(e) => {
                    const value = e.target.value
                    onChange(value)
                    setQ(value)
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

export default memo(TokenNatives, (prev, next) => {
  return prev.isActive === next.isActive
})
