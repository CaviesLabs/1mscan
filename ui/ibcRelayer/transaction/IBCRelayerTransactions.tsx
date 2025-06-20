import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { useRouter } from "next/router"
import { memo } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { IBC_CHANNEL_TRANSACTION } from "stubs/ibcRelayer"
import type {
  IIBCChannelTransaction,
  IIBCRelayerTransferType,
} from "types/api/ibcRelayer"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import IBCTransactionFilter from "./IBCTransactionFilter"
import IBCTransactionTable from "./IBCTransactionTable"
import type { ICombinedSortType, IForm } from "./types"

type Props = {
  channel_id: string
}

const placeholderData = {
  total_count: 20,
  items: Array<IIBCChannelTransaction>(20).fill(IBC_CHANNEL_TRANSACTION),
  next_page_params: null,
}

const IBCRelayerTransactions = ({ channel_id }: Props) => {
  const router = useRouter()

  const [transferType, setTransferType] = useSetStateQuery<
    IIBCRelayerTransferType | ""
  >("transfer-type", [], {
    throttle: 300,
  })

  const { data, isPlaceholderData, isLoading, dataUpdatedAt, pagination } =
    useQueryWithPages({
      resourceName: "ibc_channel_transactions",
      pathParams: { channel_id: channel_id },
      filters: { type: transferType },
      options: {
        placeholderData: placeholderData,
      },
    })

  const formApi = useForm<IForm>({
    defaultValues: {
      sort: (router.query.sort as ICombinedSortType) || "",
    },
  })

  return (
    <DataListDisplay
      actionBar={
        <ActionBar
          filterProps={{
            gridTemplateColumns: {
              base: "max-content 1fr",
              lg: "max-content max-content ",
            },
          }}
          filterChildren={
            <IBCTransactionFilter
              isLoading={isPlaceholderData}
              value={
                (transferType === "send_packet" && "from") ||
                (transferType === "recv_packet" && "to") ||
                undefined
              }
              onFilterChange={(value) => {
                const nextValue =
                  (value === "from" && "send_packet") ||
                  (value === "to" && "recv_packet") ||
                  ""
                setTransferType(nextValue)
              }}
            ></IBCTransactionFilter>
          }
          paginationChildren={<Pagination pagination={pagination}></Pagination>}
        ></ActionBar>
      }
    >
      <FormProvider {...formApi}>
        <IBCTransactionTable
          isLoading={isPlaceholderData || isLoading}
          items={data?.items}
          dataUpdatedAt={dataUpdatedAt}
        ></IBCTransactionTable>
      </FormProvider>
    </DataListDisplay>
  )
}

export default memo(IBCRelayerTransactions, (prev, next) => {
  return prev.channel_id === next.channel_id
})
