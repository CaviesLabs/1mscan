import { Text } from "@chakra-ui/react"
import useApiQuery from "lib/api/useApiQuery"
import getQueryParamString from "lib/router/getQueryParamString"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { upperCase } from "lodash"
import { useRouter } from "next/router"
import { memo, useRef } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { IBC_CHAIN, IBC_REPLAYERS_STAT } from "stubs/ibcRelayer"
import type { IIBCChain } from "types/api/ibcRelayer"
import type { IIBCRelayerDetailsModalState } from "ui/ibcRelayers/IBCRelayerDetailsModal"
import IBCRelayerDetailsModal from "ui/ibcRelayers/IBCRelayerDetailsModal"
import IBCRelayersFilter from "ui/ibcRelayers/IBCRelayersFilter"
import IBCRelayersTable from "ui/ibcRelayers/IBCRelayersTable"
import NumberWidgetList from "ui/ibcRelayers/NumberWidgetList"
import type {
  ICombinedSortType,
  IForm,
  IIBCRelayersStatus,
} from "ui/ibcRelayers/types"
import { sortApi } from "ui/ibcRelayers/utils"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import PageTitle from "ui/shared/Page/PageTitle"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import SearchInput from "ui/snippets/searchBar/SearchInput"

type Props = {
  //
}

const placeholderData = {
  result: Array<IIBCChain>(10).fill(IBC_CHAIN),
  next_page_params: null,
  total_count: 10,
}

const IBCRelayers = ({}: Props) => {
  const router = useRouter()

  const [q, setQ] = useSetStateQuery("q", [], {
    debounce: 1000,
  })
  const [sort, setSort] = useSetStateQuery<ICombinedSortType | undefined>(
    "sort",
    [],
    {
      throttle: 300,
    },
  )

  // const setQQuery = useSetQuery("q", { debounce: 1000 });
  const [status, setStatus] = useSetStateQuery<IIBCRelayersStatus | undefined>(
    "status",
    [],
    { throttle: 400 },
  )

  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "ibc_chain_connecteds",
    filters: {
      search: q,
      status: (upperCase(status) || undefined) as Uppercase<IIBCRelayersStatus>,
      sort: sortApi(sort),
    },
    options: {
      placeholderData: placeholderData,
    },
  })

  // const { utcMoment } = useMemo(() => {
  //   const currentTimeZone = getTimeZone();
  //   const utcMoment = moment(dataUpdatedAt).tz(currentTimeZone).utc();
  //   return {
  //     currentTimeZone,
  //     utcMoment,
  //   };
  // }, []);

  const { data: stat, isPlaceholderData: isLoadingStat } = useApiQuery(
    "ibc_relayers_stat",
    { queryOptions: { placeholderData: IBC_REPLAYERS_STAT } },
  )

  const formApi = useForm<IForm>({
    defaultValues: {
      search: getQueryParamString(router.query.q) || "",
    },
  })
  const modalRef = useRef<IIBCRelayerDetailsModalState>(null)
  const { control, register } = formApi

  return (
    <>
      <PageTitle
        title="IBC Relayers"
        hasDefaultBackLink

        // afterTitle={
        //   <HStack spacing={2}>
        //     <Text textStyle="875" color="neutral.light.6">
        //       Updated at
        //     </Text>
        //     <Skeleton isLoaded={!isPlaceholderData}>
        //       <Text textStyle="1" color="neutral.light.8">
        //         {utcMoment.format(`DD/MM/YYYY`)}
        //       </Text>
        //     </Skeleton>
        //     <Divider orientation="vertical" height={4}></Divider>
        //     <Skeleton isLoaded={!isPlaceholderData}>
        //       <Text textStyle="1" color="neutral.light.8">
        //         {utcMoment.format(`HH:mm:ss [UTC]`)}
        //       </Text>
        //     </Skeleton>
        //   </HStack>
        // }
      ></PageTitle>
      <NumberWidgetList
        isLoading={isLoadingStat}
        stat={stat!}
      ></NumberWidgetList>

      {/* <Flex flexDirection="column" marginTop={4} gap={3}> */}
      <Text as="h2" marginTop={4} color="neutral.light.8" textStyle="title">
        Chain connected
      </Text>

      {/* </Flex> */}
      <DataListDisplay
        marginTop={3}
        actionBar={
          <ActionBar
            filterProps={{
              gridTemplateColumns: {
                base: "max-content max-content 1fr",
                lg: "max-content max-content 28.75rem",
              },
            }}
            filterChildren={
              <>
                <IBCRelayersFilter
                  value={status}
                  onFilterChange={(nextValue) => {
                    setStatus(nextValue || undefined)
                  }}
                ></IBCRelayersFilter>

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
                          // setQQuery(nextValue);
                          setQ(nextValue)
                        }}
                        placeholder="Search by Chain name, chain ID"
                      ></SearchInput>
                    )
                  }}
                ></Controller>
              </>
            }
            paginationChildren={
              <Pagination pagination={pagination}></Pagination>
            }
          ></ActionBar>
        }
      >
        <IBCRelayerDetailsModal ref={modalRef}></IBCRelayerDetailsModal>
        <FormProvider {...formApi}>
          <IBCRelayersTable
            isLoading={isPlaceholderData}
            items={data?.result}
            onOpen={(item) => {
              modalRef.current?.onOpen(item)
            }}
            setSort={setSort}
            sort={sort}
          ></IBCRelayersTable>
        </FormProvider>
      </DataListDisplay>
    </>
  )
}

export default memo(IBCRelayers, () => true)
