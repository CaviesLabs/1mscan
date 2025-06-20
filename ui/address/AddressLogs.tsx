import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { LOG } from "stubs/log"
import { generateListStub } from "stubs/utils"
import type { LogsResponseAddress } from "types/api/log"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import LogItem from "ui/shared/logs/LogItem"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"

type Props = {
  isActive?: boolean
  hash: string | undefined
}

const placeholderData = generateListStub<"address_logs">(LOG, 2, {
  next_page_params: null,
})

const AddressLogs = ({ isActive, hash }: Props) => {
  const { data, isLoading, pagination, isPlaceholderData } = useQueryWithPages({
    resourceName: "address_logs",
    pathParams: { hash },
    options: {
      placeholderData: placeholderData,
      enabled: Boolean(hash && isActive),
    },
  })

  return (
    <DataListDisplay
      isEmpty={!data?.items?.length}
      emptyText={getLanguage("address.there_are_no_logs_for_this_address")}
      emptyProps={{
        borderWidth: "1px",
        borderRadius: "0.5rem",
        borderColor: "neutral.light.3",
      }}
      actionBar={
        <ActionBar
          // exportChildren={
          //   <AddressCsvExportLink
          //     address={hash}
          //     isLoading={pagination.loading}
          //     params={{ type: "logs" }}
          //   />
          // }
          paginationChildren={<Pagination pagination={pagination} />}
        ></ActionBar>
      }
      width="full"
    >
      {(data as LogsResponseAddress)?.items.map((item, index) => (
        <LogItem
          key={index}
          item={{
            // @ts-ignore
            index,
            ...item,
          }}
          type="address"
          isLoading={isPlaceholderData || isLoading}
        />
      ))}
    </DataListDisplay>
  )
}

export default memo(AddressLogs, (prev, next) => {
  return prev.isActive === next.isActive && prev.hash === next.hash
})
