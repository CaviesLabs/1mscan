import type {
  Checkpoints,
  Counter,
  HomeStats,
  IStatsCounters,
  StatsChartsSection,
} from "types/api/stats"

export const HOMEPAGE_STATS: HomeStats = {
  average_block_time: 14346,
  coin_price: "1807.68",
  gas_prices: {
    average: 0.1,
    fast: 0.11,
    slow: 0.1,
  },
  gas_used_today: "0",
  market_cap: "0",
  network_utilization_percentage: 22.56,
  static_gas_price: null,
  total_addresses: "28634064",
  total_blocks: "8940150",
  total_gas_used: "0",
  total_transactions: "193823272",
  transactions_today: "111111",
  tvl: "1767425.102766552",
}

export const STATS_CHARTS_SECTION: StatsChartsSection = {
  id: "placeholder",
  title: "Placeholder",
  charts: [
    {
      id: "chart_0",
      title: "Average transaction fee",
      description: "The average amount in ETH spent per transaction",
      units: "ETH",
    },
    {
      id: "chart_1",
      title: "Transactions fees",
      description: "Amount of tokens paid as fees",
      units: "ETH",
    },
    {
      id: "chart_2",
      title: "New transactions",
      description: "New transactions number",
      units: null,
    },
    {
      id: "chart_3",
      title: "Transactions growth",
      description: "Cumulative transactions number",
      units: null,
    },
  ],
}

export const STATS_CHARTS = {
  sections: [STATS_CHARTS_SECTION],
}

export const STATS_COUNTER: Counter = {
  id: "averageBlockTime",
  value: "9074405",
  title: "Placeholder Counter",
  description: "Placeholder description",
  units: "",
}

export const CHECKPOINTS: Checkpoints = {
  latest_block: 0,
  tx_checkpoint: 0,
}

export const STATS_COUNTERS: IStatsCounters = [
  {
    id: "averageBlockTime",
    value: "0",
    title: "Average block time",
    units: "s",
    description:
      "Average time taken in seconds for a block to be included in the blockchain",
  },
  {
    id: "completedTxns",
    value: "0",
    title: "Completed txns",
    units: null,
    description: "Number of transactions with success status",
  },
  {
    id: "lastNewContracts",
    value: "0",
    title: "Number of deployed contracts today",
    units: null,
    description: "Number of deployed contracts today",
  },
  {
    id: "lastNewVerifiedContracts",
    value: "0",
    title: "Number of verified contracts today",
    units: null,
    description: "Number of contracts verified today",
  },
  {
    id: "totalAccounts",
    value: "0",
    title: "Total accounts",
    units: null,
    description: "Number of EOAs that sent at least 1 transaction",
  },
  {
    id: "totalAddresses",
    value: "0",
    title: "Total addresses",
    units: null,
    description: "Number of addresses that participated in the blockchain",
  },
  {
    id: "totalBlocks",
    value: "0",
    title: "Total blocks",
    units: null,
    description: "Number of blocks over all time",
  },
  {
    id: "totalContracts",
    value: "0",
    title: "Total contracts",
    units: null,
    description: "Number of contracts",
  },
  {
    id: "totalNativeCoinTransfers",
    value: "0",
    title: "Total ETH transfers",
    units: null,
    description: "Number of transactions with the transfer of the ETH",
  },
  {
    id: "totalTokens",
    value: "0",
    title: "Total tokens",
    units: null,
    description: "Number of all token contracts",
  },
  {
    id: "totalTxns",
    value: "0",
    title: "Total txns",
    units: null,
    description:
      "All transactions including pending, dropped, replaced, failed transactions",
  },
  {
    id: "totalVerifiedContracts",
    value: "0",
    title: "Total verified contracts",
    units: null,
    description: "Number of verified contracts",
  },
]
