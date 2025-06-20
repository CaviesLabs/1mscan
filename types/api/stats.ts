export type HomeStats = {
  total_blocks: string
  total_addresses: string
  total_transactions: string
  average_block_time: number
  coin_price: string | null
  total_gas_used: string
  transactions_today: string
  gas_used_today: string
  gas_prices: GasPrices | null
  static_gas_price: string | null
  market_cap: string
  network_utilization_percentage: number
  tvl: string | null
  rootstock_locked_btc?: string | null
}

export type Checkpoints = {
  latest_block: number
  tx_checkpoint: number
}

export type GasPrices = {
  average: number | null
  fast: number | null
  slow: number | null
}

export type Counters = {
  counters: Counter[]
}

export type IStatsCounters = Counter[]

export type IStatsCountersID =
  | "averageBlockTime"
  | "completedTxns"
  | "lastNewContracts"
  | "lastNewVerifiedContracts"
  | "totalAccounts"
  | "totalAddresses"
  | "totalBlocks"
  | "totalContracts"
  | "totalNativeCoinTransfers"
  | "totalTokens"
  | "totalTxns"
  | "totalVerifiedContracts"
  | "newTxns24h"
  | "pendingTxns30m"
  | "txnsFee24h"
  | "averageTxnFee24h"
  | "base_fee"
  | "txsPerSec"
  | "total_stake"
  | "totalNFTs"
  | "average_gas_price"
  | "fast_gas_price"
  | "slow_gas_price"

export type Counter<ID extends IStatsCountersID = IStatsCountersID> = {
  id: ID
  value: string
  title: string
  description?: string
  units: string | null
}

export type StatsCharts = {
  sections: Array<StatsChartsSection>
}

export type StatsChartsSection = {
  id: string
  title: string
  charts: Array<StatsChartInfo>
}

export type StatsChartInfo = {
  id: string
  title: string
  description: string
  units: string | null
}

export type StatsChart = { chart: Array<StatsChartItem> }

export type StatsChartItem = {
  date: string
  value: string
}
