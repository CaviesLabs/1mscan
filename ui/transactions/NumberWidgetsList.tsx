import type { GridProps } from "@chakra-ui/react"
import { Grid } from "@chakra-ui/react"

import useApiQuery from "lib/api/useApiQuery"
import { formatLargeNumber } from "lib/utils/formatLargeNumber"
import _ from "lodash"
import { memo, useMemo } from "react"
import { STATS_COUNTERS } from "stubs/stats"
import DataFetchAlert from "ui/shared/DataFetchAlert"
import NumberWidget from "ui/shared/NumberWidget"

type Props = GridProps

const NumberWidgetsList = (props: Props) => {
  const { data, isPlaceholderData, isError } = useApiQuery(
    "gateway_stats_counters",
    {
      queryOptions: {
        placeholderData: STATS_COUNTERS,
      },
    },
  )

  const isLoading = isPlaceholderData

  const {
    completeTxnsFormated,
    totalTxnsFormated,
    completeTxnsFull,
    totalTxnsFull,
  } = useMemo(() => {
    if (isLoading) {
      return {
        completeTxns: 0,
        totalTxns: 0,
        completeTxnsFormated: "-",
        totalTxnsFormated: "-",
        completeTxnsFull: "",
        totalTxnsFull: "",
      }
    }

    const completed = _.chain(null)
      .thru(() => {
        const value = Number(data?.find((x) => x.id === "completedTxns")?.value)

        if (Number.isNaN(value)) {
          return {
            value: "-",
            formated: "-",
            full: "",
          }
        }
        return {
          value: value,
          formated: formatLargeNumber(value),
          full: value.toLocaleString(),
        }
      })
      .value()

    const total = _.chain(null)
      .thru(() => {
        const value = Number(data?.find((x) => x.id === "totalTxns")?.value)

        if (Number.isNaN(value)) {
          return {
            value: "-",
            formated: "-",
            full: "",
          }
        }

        return {
          value: value,
          formated: formatLargeNumber(value),
          full: value.toLocaleString(),
        }
      })
      .value()

    return {
      completeTxns: completed.value,
      totalTxns: total.value,
      completeTxnsFormated: completed.formated,
      totalTxnsFormated: total.formated,
      completeTxnsFull: completed.full,
      totalTxnsFull: total.full,
    }
  }, [data, isLoading])

  if (isError) {
    return <DataFetchAlert />
  }

  return (
    <Grid
      gridTemplateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
      gridGap="0.75rem"
      width="full"
      {...props}
    >
      <NumberWidget
        index={0}
        label="Completed txns"
        description="Number of transactions with success status"
        isLoading={isLoading}
        value={completeTxnsFormated}
        valueLabel={completeTxnsFull}
        noTooltip={!completeTxnsFull}
      />

      <NumberWidget
        index={1}
        label="Total txns"
        description="All transactions including pending, dropped, replaced, failed transactions"
        isLoading={isLoading}
        value={totalTxnsFormated}
        valueLabel={totalTxnsFull}
        noTooltip={!totalTxnsFull}
      />
    </Grid>
  )
}

export default memo(NumberWidgetsList, () => true)
