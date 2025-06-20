import { getLanguage } from "languages/useLanguage"
import useApiQuery from "lib/api/useApiQuery"
import { getTransactionType } from "lib/getOSType"
import { useMemoEffect } from "lib/hooks/useShallow"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { memo, useMemo } from "react"
import { useErrorBoundary } from "react-error-boundary"
import { TX, TX_COSMOS } from "stubs/tx"
import type { Transaction } from "types/api/transaction"
import PageTitle from "ui/shared/Page/PageTitle"
import ScrollTab from "ui/shared/Tabs/ScrollTab"
import TxDetails from "ui/tx/TxDetails"
import TxInternals from "ui/tx/TxInternals"
import TxLogs from "ui/tx/TxLogs"
import TxLogsCosmos from "ui/tx/TxLogsCosmos"
import TxState from "ui/tx/TxState"
import TxSubHeading from "ui/tx/TxSubHeading"
import TxTokenTransfer from "ui/tx/TxTokenTransfer"
import TxTags from "ui/tx/tag/TxTags"

const TransactionPage = () => {
  const { showBoundary } = useErrorBoundary()

  const [hash] = useSetStateQuery<string>("hash")

  const transactionType = useMemo(() => getTransactionType(hash), [hash])

  const {
    data: tx,
    isPlaceholderData: txIsLoading,
    error,
  } = useApiQuery("tx", {
    pathParams: { hash },
    queryOptions: {
      enabled: Boolean(hash),
      placeholderData:
        (transactionType === "EVM" && TX) ||
        (transactionType === "Cosmos" && TX_COSMOS) ||
        undefined,
    },
  })

  const { data: internalTxnsData, isFetching: isInternalTxnsLoading } =
    useApiQuery("tx_internal_txs", {
      pathParams: { hash },
      queryOptions: {
        staleTime: Number.POSITIVE_INFINITY,

        enabled: Boolean(hash),
      },
    })

  const { data: tokenTransfersData, isFetching: isTokenTransfersLoading } =
    useApiQuery("tx_token_transfers", {
      pathParams: { hash },
      queryOptions: {
        staleTime: Number.POSITIVE_INFINITY,

        enabled: Boolean(hash),
      },
    })

  const { data: evmLogsFirstData, isFetching: isEvmLogsLoading } = useApiQuery(
    "tx_logs",
    {
      pathParams: { hash },
      queryOptions: {
        staleTime: Number.POSITIVE_INFINITY,
        enabled: Boolean(hash) && transactionType === "EVM",
      },
    },
  )

  useMemoEffect(() => {
    if (error) {
      if (error?.status === 422) {
        return showBoundary(error)
      }

      if (error?.status === 404) {
        return showBoundary(error)
      }

      return showBoundary(error)
    }
  }, [error])

  return (
    <>
      <PageTitle
        hasDefaultBackLink
        contentAfter={<TxTags transactionType={transactionType} />}
        title={getLanguage(
          "transaction_details_page.header_elements.transaction_details",
        )}
        secondRow={<TxSubHeading hash={hash} />}
      />

      <ScrollTab
        cleanupOnTabChange={{ keepQueries: ["hash"] }}
        tabs={[
          {
            id: "index",
            title: getLanguage("transaction_details_page.main_tabs.details"),
            component: TxDetails,
            props: {
              transactionType,
              hash,
              data: tx,
              isLoading: txIsLoading,
            },
          },
          {
            id: "token_transfers",
            title: getLanguage(
              "transaction_details_page.main_tabs.token_transfers",
            ),
            isCounterLoading: isTokenTransfersLoading,
            component: TxTokenTransfer,
            props: {
              hash,
            },
            isOverflow: Boolean(tokenTransfersData?.next_page_params),
            count: tokenTransfersData?.items?.length,
          },
          transactionType === "EVM" && {
            id: "internal",
            isCounterLoading: isInternalTxnsLoading,
            title: getLanguage(
              "transaction_details_page.main_tabs.internal_txns",
            ),
            component: TxInternals,
            props: {
              hash,
            },
            count: internalTxnsData?.items.length,
            isOverflow: Boolean(internalTxnsData?.next_page_params),
          },
          transactionType === "Cosmos" && {
            id: "native_logs",
            title: getLanguage("transaction_details_page.main_tabs.logs"),
            isCounterLoading: txIsLoading,
            component: TxLogsCosmos,
            props: {
              tx: tx as Transaction<"Cosmos">,
              isLoading: txIsLoading,
            },
            count: (tx as Transaction<"Cosmos">)?.native_events?.length,
            isOverflow: Boolean((tx as any)?.native_events?.length > 50),
          },
          transactionType === "EVM" && {
            id: "evm_logs",
            title: getLanguage("transaction_details_page.main_tabs.logs"),
            isCounterLoading: isEvmLogsLoading,
            component: TxLogs,
            props: {
              hash,
              transactionType,
            },
            count: evmLogsFirstData?.items?.length,
            isOverflow: Boolean(evmLogsFirstData?.next_page_params),
          },
          transactionType === "EVM" && {
            id: "state",
            title: getLanguage("transaction_details_page.main_tabs.state"),
            component: TxState,
            props: {
              hash: hash,
            },
          },
        ]}
      />
    </>
  )
}

export default memo(TransactionPage, () => true)
