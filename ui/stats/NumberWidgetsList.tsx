import { Grid } from "@chakra-ui/react"

import useApiQuery from "lib/api/useApiQuery"
import { STATS_COUNTERS } from "stubs/stats"

import BigNumber from "bignumber.js"
import { formatLargeNumber } from "lib/utils/formatLargeNumber"
import { memo } from "react"
import NumberWidget from "ui/shared/NumberWidget"

const MAPPING_COUNTERS = [
  {
    id: "averageBlockTime",
    title: "Average block time",
    units: "s",
    description:
      "Average time taken in seconds for a block to be included in the blockchain",
  },
  {
    id: "completedTxns",
    title: "Completed txns",
    units: "",
    description: "Number of transactions with success status",
  },
  {
    id: "lastNewContracts",
    title: "Number of deployed contracts today",
    units: "",
    description: "Number of deployed contracts today",
  },
  {
    id: "lastNewVerifiedContracts",
    title: "Number of verified contracts today",
    units: "",
    description: "Number of contracts verified today",
  },
  {
    id: "totalAccounts",
    title: "Total accounts",
    units: "",
    description: "Number of EOAs that sent at least 1 transaction",
  },
  {
    id: "totalAddresses",
    title: "Total addresses",
    units: "",
    description: "Number of addresses that participated in the blockchain",
  },
  {
    id: "totalBlocks",
    title: "Total blocks",
    units: "",
    description: "Number of blocks over all time",
  },
  {
    id: "totalContracts",
    title: "Total contracts",
    units: "",
    description: "Number of contracts",
  },
  {
    id: "totalNativeCoinTransfers",
    title: "Total SEI transfers",
    units: "",
    description: "Number of transactions with the transfer of the SEI",
  },
  {
    id: "totalTokens",
    title: "Total tokens",
    units: "",
    description: "Number of all token contracts",
  },
  {
    id: "totalTxns",
    title: "Total txns",
    units: "",
    description:
      "All transactions including pending, dropped, replaced, failed transactions",
  },
  {
    id: "totalVerifiedContracts",
    title: "Total verified contracts",
    units: "",
    description: "Number of verified contracts",
  },
]

const NumberWidgetsList = () => {
  const { data, isPlaceholderData } = useApiQuery("gateway_stats_counters", {
    queryOptions: {
      placeholderData: STATS_COUNTERS,
    },
  })
  return (
    <Grid
      gridTemplateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
      gridGap={4}
    >
      {MAPPING_COUNTERS.map(({ id, title, description, units }, index) => {
        const counter = data?.find((c) => c.id === id)
        if (!counter) return null
        const bn = BigNumber(counter.value)
        return (
          <NumberWidget
            key={[id, isPlaceholderData ? "loading_" + index : "loaded_"].join(
              "-",
            )}
            index={index}
            label={title}
            description={description}
            isLoading={isPlaceholderData}
            value={`${formatLargeNumber(bn, { accuracy: 3 })}${units}`}
            valueLabel={bn.toFormat()}
          />
        )
      })}
    </Grid>
  )
}

export default memo(NumberWidgetsList, () => true)
