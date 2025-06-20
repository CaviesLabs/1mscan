import { Text } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { memo } from "react"
import { Controller, useForm } from "react-hook-form"
import { VERIFIED_CONTRACT_INFO } from "stubs/contract"
import { generateListStub } from "stubs/utils"
import type { VerifiedContractsFilters } from "types/api/contracts"
import type { VerifiedContractsSortingField } from "types/api/verifiedContracts"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import PageTitle from "ui/shared/Page/PageTitle"
import Filter from "ui/shared/filters/Filter"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import SearchInput from "ui/snippets/searchBar/SearchInput"
import NumberWidgetList from "ui/verifiedContracts/NumberWidgetList"
import VerifiedContractsTableEVM from "ui/verifiedContracts/VerifiedContractsTableEVM"
import type { ICombinedSortType } from "ui/verifiedContracts/utils"

const placeholderData = generateListStub<"verified_contracts">(
  VERIFIED_CONTRACT_INFO,
  20,
  { next_page_params: null },
)

const VerifiedContracts = () => {
  const [q, setQ] = useSetStateQuery<string>("q", [], {
    debounce: 200,
  })

  const { control } = useForm({
    defaultValues: {
      search: q,
    },
  })

  const [type, setType] = useSetStateQuery<
    NonNullable<VerifiedContractsFilters["filter"]>
  >("filter", [], {
    throttle: 200,
  })

  const [sort, setSort] = useSetStateQuery<ICombinedSortType | undefined>(
    "sort",
    [],
    {
      throttle: 200,
    },
  )

  const { isPlaceholderData, data, pagination } = useQueryWithPages({
    resourceName: "verified_contracts",
    filters: {
      q: q,
      filter: type as any,
      // TODO: Fix this
      sort: sort?.split("-")?.[0] as VerifiedContractsSortingField,
      order: sort?.split("-")?.[1] as any,
    },
    options: {
      placeholderData: placeholderData,
    },
  })

  return (
    <>
      <PageTitle
        title={getLanguage("evm_verified_contracts_page.verified_contracts")}
        afterTitle={
          <Text
            ml={1}
            as="span"
            color="neutral.light.6"
            fontSize="1.25rem"
            lineHeight="1.75rem"
            fontWeight={600}
          >
            ({getLanguage("evm_verified_contracts_page.evm_only")})
          </Text>
        }
      />
      <NumberWidgetList />

      <DataListDisplay
        mt={6}
        actionBar={
          <ActionBar
            alignItems={{ base: "stretch", lg: "center" }}
            columnGap={6}
            rowGap={3}
            justifyContent="space-between"
            flexDirection={{ base: "column", lg: "row" }}
            paginationChildren={
              <Pagination pagination={pagination}></Pagination>
            }
            filterProps={{
              gridTemplateColumns: {
                base: "max-content 1fr",
                lg: "max-content 8.75rem",
              },
            }}
            filterChildren={
              <Filter
                type="radio"
                title={getLanguage("evm_verified_contracts_page.compiler")}
                hasArrow
                onChange={(val) => setType(val as any)}
                value={type}
                items={[
                  { id: "solidity", title: "Solidity" },
                  { id: "vyper", title: "Vyper" },
                  { id: "yul", title: "Yul" },
                ]}
              />
            }
          >
            <Controller
              control={control}
              name="search"
              render={({ field: { value: search, onChange, ...field } }) => (
                <SearchInput
                  {...field}
                  value={search}
                  groupProps={{
                    width: { base: "full", lg: "28rem" },
                  }}
                  placeholder={getLanguage(
                    "evm_verified_contracts_page.search_by_contract_name_or_address",
                  )}
                  onChange={(e) => {
                    const value = e.target.value
                    onChange(value)
                    setQ(value)
                  }}
                />
              )}
            />
          </ActionBar>
        }
      >
        <VerifiedContractsTableEVM
          data={data!.items}
          sort={sort}
          setSort={setSort}
          isLoading={isPlaceholderData}
        />
      </DataListDisplay>
    </>
  )
}

export default memo(VerifiedContracts, () => true)
