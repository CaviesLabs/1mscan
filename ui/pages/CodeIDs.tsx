import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { memo } from "react"
import { Controller, useForm } from "react-hook-form"
import { CONTRACT_CODE } from "stubs/codeID"
import type { IContractCode } from "types/api/codeID"
import type { TokenTypeCosmos } from "types/api/token"
import CodeIDFilter from "ui/codeID/CodeIDFilter"
import CodeIDsTable from "ui/codeID/CodeIDsTable"
import NumberWidgetList from "ui/codeID/NumberWidgetList"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import PageTitle from "ui/shared/Page/PageTitle"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import SearchInput from "ui/snippets/searchBar/SearchInput"

type Props = {
  //
}

const CodeIDs = ({}: Props) => {
  const [type, setType] = useSetStateQuery<TokenTypeCosmos | undefined>(
    "type",
    [],
    {
      throttle: 200,
    },
  )
  const [q, setQ] = useSetStateQuery("q", [], {
    debounce: 300,
    cleanUp: { keepQueries: ["type"] },
  })

  const { control, register } = useForm({
    defaultValues: {
      search: q,
    },
  })

  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "contract_codes",
    filters: {
      type: type as never,
      search: q,
    },
    options: {
      placeholderData: {
        items: Array.from<IContractCode>({ length: 20 }).fill(CONTRACT_CODE),
        next_page_params: null,
        total_count: 20,
      },
    },
  })

  return (
    <>
      <PageTitle title="Native Cosmos Code IDs" />
      <NumberWidgetList></NumberWidgetList>
      <DataListDisplay
        mt="2.5rem"
        actionBar={
          <ActionBar
            filterProps={{
              display: "grid",
              gridTemplateColumns: {
                base: "max-content 1fr",
                lg: "max-content max-content",
              },
            }}
            filterChildren={
              <>
                <CodeIDFilter
                  value={type}
                  onFilterChange={(nextValue) => {
                    setType(nextValue)
                  }}
                />
              </>
            }
            paginationChildren={
              <Pagination pagination={pagination}></Pagination>
            }
          >
            <Controller
              control={control}
              name="search"
              render={({ field: { value, onChange } }) => {
                return (
                  <SearchInput
                    {...register("search")}
                    value={value}
                    onChange={(e) => {
                      const nextValue = e.target?.value || ""
                      onChange(nextValue)
                      setQ(nextValue)
                    }}
                    groupProps={{
                      maxWidth: "28.75rem",
                    }}
                    placeholder="Search by Code ID, Contract address, Creator address"
                  />
                )
              }}
            ></Controller>
          </ActionBar>
        }
      >
        <CodeIDsTable
          items={data?.items || []}
          isLoading={isPlaceholderData}
        ></CodeIDsTable>
      </DataListDisplay>
    </>
  )
}

export default memo(CodeIDs, () => true)
