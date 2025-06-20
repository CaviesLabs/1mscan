import { Flex } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { useMemoEffect } from "lib/hooks/useShallow"
import { memo } from "react"
import { useErrorBoundary } from "react-error-boundary"
import { LOG } from "stubs/log"
import { generateKey } from "stubs/utils"

import type { Log } from "types/api/log"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import LogItem from "ui/shared/logs/LogItem"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"

type Props = {
  hash: string
  isActive?: boolean
}

const placeholderData = { items: [LOG], next_page_params: null }

const TxLogs = ({ hash, isActive }: Props) => {
  const { data, isPlaceholderData, pagination, error } = useQueryWithPages({
    resourceName: "tx_logs",
    pathParams: { hash },
    options: {
      enabled: Boolean(hash && isActive),
      placeholderData: placeholderData,
    },
  })

  const { showBoundary } = useErrorBoundary()

  const isLoading = isPlaceholderData

  useMemoEffect(() => {
    if (error) {
      showBoundary(error)
    }
  }, [error])

  return (
    <DataListDisplay
      actionBar={
        <ActionBar
          paginationChildren={<Pagination pagination={pagination} />}
        ></ActionBar>
      }
      isEmpty={!data?.items.length}
      emptyProps={{
        borderWidth: "1px",
        borderColor: "neutral.light.4",
        borderRadius: 2,
        backgroundColor: "neutral.light.1",
      }}
      emptyText={getLanguage(
        "transaction_details_page.evm_details.logs_tab_content.there_are_no_logs_for_this_transaction",
      )}
    >
      <Flex flexDirection="column" gap={6} alignItems="stretch">
        {data?.items.map((item: Log, index: number) => (
          <LogItem
            key={generateKey(
              index,
              isLoading,
              item.index,
              item.tx_hash,
              item.address?.hash,
            )}
            item={item}
            type="transaction"
            isLoading={isLoading}
          />
        ))}
      </Flex>
    </DataListDisplay>
  )
}

export default memo(TxLogs, (prev, next) => {
  return prev.hash === next.hash && prev.isActive === next.isActive
})
