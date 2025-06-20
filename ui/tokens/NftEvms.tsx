import { getLanguage } from "languages/useLanguage"
import { useShallowEffect } from "lib/hooks/useShallow"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { NFT_TOKEN_TYPES_EVM } from "lib/token/tokenTypes"
import { memo } from "react"
import { Controller, useForm } from "react-hook-form"
import { TOKEN_INFO_ERC_20 } from "stubs/token"
import { generateListStub } from "stubs/utils"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Filter from "ui/shared/filters/Filter"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import SearchInput from "ui/snippets/searchBar/SearchInput"
import NFTWithTypeTable from "./NFTWithTypeTable"

type Props = {
  isActive?: boolean
}

const placeholderData = generateListStub<"tokens">(TOKEN_INFO_ERC_20, 20, {
  next_page_params: null,
})

const NftEvms = ({ isActive }: Props) => {
  const [q, setQ] = useSetStateQuery<string>("q", [], {
    debounce: 200,
    cleanUp: { keepQueries: ["tab", "type"] },
    isActive,
  })

  const [type, setType] = useSetStateQuery<
    (typeof NFT_TOKEN_TYPES_EVM)[number]["id"]
  >("type", [], {
    throttle: 200,
    cleanUp: {
      keepQueries: ["tab"],
    },
    isActive,
  })

  const { control, getValues, setValue } = useForm({
    defaultValues: { search: q || "" },
  })

  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "tokens",
    filters: {
      q: q,
      type: type || ("ERC-721,ERC-1155" as any),
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
          filterProps={{
            gridTemplateColumns: {
              base: "max-content 1fr",
              lg: "max-content max-content",
            },
          }}
          filterChildren={
            <Filter
              title={getLanguage("token.nfts_type")}
              type="radio"
              value={type}
              allowToggle={false}
              hasArrow
              items={NFT_TOKEN_TYPES_EVM}
              onChange={(nextValue: any) => {
                setType(nextValue || "")
              }}
            ></Filter>
          }
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
                    "token.search_by_collection_name_or_address",
                  )}
                />
              )
            }}
          ></Controller>
        </ActionBar>
      }
    >
      <NFTWithTypeTable
        page={pagination.snap.page}
        items={data?.items}
        isLoading={isPlaceholderData}
      />
    </DataListDisplay>
  )
}

export default memo(NftEvms, () => true)
