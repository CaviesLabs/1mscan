import useApiQuery from "lib/api/useApiQuery"
import { memo } from "react"
import { TX } from "stubs/tx"
import { generateKey, generateListStub } from "stubs/utils"
import type { TransactionsResponseValidated } from "types/api/transaction"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import LatestTxsItem from "./LatestTxsItem"

type Props = {
  type: "evm" | "native"
  isActive?: boolean
}

const placeholderData = generateListStub<"latest_txs_validated">(TX, 6, {
  next_page_params: null,
}) as TransactionsResponseValidated

const LatestTxsContent = ({ type, isActive }: Props) => {
  const { data, isPlaceholderData } = useApiQuery("latest_txs_validated", {
    queryParams: {
      type: type === "native" ? "Cosmos" : "EVM",
      limit: 6,
    },
    queryOptions: {
      enabled: Boolean(isActive),
      placeholderData: placeholderData,
    },
  })

  const isLoading = isPlaceholderData

  return (
    <ScrollTable variant="home" sizes={[30, 50, 20]} maxs={[, "13rem"]}>
      <TbodyControl tdProps={{ height: "auto" }}>
        {data?.items.map((transaction, index) => (
          <LatestTxsItem
            key={generateKey(index, isLoading, transaction.hash)}
            tx={transaction}
            tab={type}
            isLoading={isLoading}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(LatestTxsContent, (prev, next) => {
  return prev.isActive === next.isActive
})
