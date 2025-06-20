import { Flex } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { Transaction } from "types/api/transaction"
import DataListDisplay from "ui/shared/DataListDisplay"
import LogCosmosItem from "ui/shared/logs/LogCosmosItem"

type Props = {
  tx: Transaction<"Cosmos"> | undefined
  isLoading: boolean
}

const TxLogsCosmos = ({ tx, isLoading }: Props) => {
  return (
    <DataListDisplay
      emptyText={getLanguage(
        "transaction_details_page.evm_details.logs_tab_content.there_are_no_logs_for_this_transaction",
      )}
      isEmpty={!tx?.native_events?.length}
      emptyProps={{
        borderWidth: "1px",
        borderColor: "neutral.light.4",
        borderRadius: 2,
        backgroundColor: "neutral.light.1",
      }}
    >
      <Flex flexDirection="column" gap={6} width="full">
        {tx?.native_events?.map((event, index) => {
          return (
            <LogCosmosItem
              key={generateKey(index, isLoading, event.id, event.id, index)}
              isLoading={isLoading}
              event={event}
              index={index}
            ></LogCosmosItem>
          )
        })}
      </Flex>
    </DataListDisplay>
  )
}

export default memo(TxLogsCosmos, (prev, next) => {
  return prev.tx === next.tx && prev.isLoading === next.isLoading
})
