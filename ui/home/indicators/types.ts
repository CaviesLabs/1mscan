import type { HomeStats } from "types/api/stats"

import type BigNumber from "bignumber.js"
import type { IResponse } from "lib/api/resources"

export type UHomepageIndicatorId = "daily_txs" | "coin_price" | "market_cap"

export interface TChainIndicator<
  R extends UHomepageIndicatorId,
  K = R extends "daily_txs"
    ? IResponse<"homepage_chart_txs">
    : IResponse<"homepage_chart_market">,
> {
  title: string
  value: (stats: HomeStats) => string
  api: {
    dataFn: (response: K) => TimeChartDataItem
  }
}

export interface TimeChartItem {
  date: Date
  dateLabel?: string
  value: BigNumber
}

export interface TimeChartDataItem {
  items: Array<TimeChartItem>
  name: string
  units?: string
  color?: string
  valueFormatter?: (value: BigNumber) => string
}
