import { Skeleton } from "@chakra-ui/react"
import { useCurrentChain } from "lib/hooks/useCurrentChain"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { useRouter } from "next/router"
import { memo, useEffect } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import type { IIBCRelayerTransferType } from "types/api/ibcRelayer"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import SearchInput from "ui/snippets/searchBar/SearchInput"
import type { ICombinedSortType, IForm } from "../types"
import IBCTransferAssetsTable from "./IBCTransferAssetsTable"

type Props = {
  type: IIBCRelayerTransferType
  channel_id: string
  counterparty_channel_id: string
}

const IBCTransferAssetsContent = ({
  type,
  channel_id,
  counterparty_channel_id,
}: Props) => {
  const router = useRouter()

  const [q, setQ] = useSetStateQuery("", [], {
    debounce: 1000,
  })

  const currentChain = useCurrentChain()

  const formApi = useForm<IForm>({
    defaultValues: {
      search: q,
      sort: (router.query.sort as ICombinedSortType) || "",
    },
  })
  const { control, register, setValue } = formApi

  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "ibc_transfer_assets",
    pathParams: {
      channel_id: channel_id,
      counterparty_channel_id: counterparty_channel_id,
    },
    filters: {
      type: type,
      search: q,
    },
    options: {
      enabled: Boolean(currentChain && channel_id && counterparty_channel_id),
    },
  })

  const isLoading = isPlaceholderData

  useEffect(() => {
    setValue("sort", (router.query.sort as ICombinedSortType) || "")
  }, [router.query.sort])

  return (
    <DataListDisplay
      actionBar={
        <ActionBar
          paginationChildren={<Pagination pagination={pagination}></Pagination>}
        >
          <Controller
            control={control}
            name="search"
            render={({ field: { value, onChange } }) => {
              return (
                <Skeleton
                  isLoaded={!isLoading}
                  width={{ base: "full", lg: "28.75rem" }}
                >
                  <SearchInput
                    {...register("search")}
                    value={value}
                    placeholder="Search by IBC asset name, IBC address"
                    onChange={(e) => {
                      const nextValue = e.target.value
                      onChange(e)
                      setQ(nextValue)
                    }}
                  ></SearchInput>
                </Skeleton>
              )
            }}
          ></Controller>
        </ActionBar>
      }
    >
      <FormProvider {...formApi}>
        <IBCTransferAssetsTable
          isLoading={isLoading}
          items={data?.items || []}
        ></IBCTransferAssetsTable>
      </FormProvider>
    </DataListDisplay>
  )
}

export default memo(IBCTransferAssetsContent, (prev, next) => {
  return (
    prev.type === next.type &&
    prev.channel_id === next.channel_id &&
    prev.counterparty_channel_id === next.counterparty_channel_id
  )
})
