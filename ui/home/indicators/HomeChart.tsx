import { Box, Flex, type GridItemProps, Stack, Text } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { getLanguage } from "languages/useLanguage"
import type { IResponse } from "lib/api/types"
import useApiQuery from "lib/api/useApiQuery"
import { formatNumberWithSuffix } from "lib/bignumber/format"
import useIsMobile from "lib/hooks/useIsMobile"
import { useWatchState } from "lib/hooks/useWatchState"
import { memo, useMemo } from "react"
import { HOMEPAGE_STATS } from "stubs/stats"
import TabFloat from "ui/shared/Tabs/TabFloat"
import HomeChartContent from "./HomeChartContent"
import type { UHomepageIndicatorId } from "./types"

const txsSelector = (data: IResponse<"homepage_chart_txs">) => {
  const items = (data?.chart_data || [])
    .map((item) => {
      return {
        date: new Date(item.date),
        value: item.tx_count?.toFixed(),
      }
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  return {
    labels: items.map((item) => item.date),
    data: items.map((item) => item.value),
    valueFormatter: (value: string) =>
      formatNumberWithSuffix(BigNumber(value), {
        decimalPlaces: 2,
      }).fullyFormattedNumber,
  }
}

const marketSelector = (data: IResponse<"homepage_chart_market">) => {
  const items = (data?.chart_data || [])
    .map((item) => {
      return {
        date: new Date(item.date),
        priceValue: item.closing_price,
        marketCapValue:
          item.market_cap ||
          BigNumber(item.closing_price)
            .multipliedBy(data?.available_supply || 0)
            .toFixed(),
      }
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  return {
    labels: items.map((item) => item.date),
    priceData: items.map((item) => item.priceValue),
    marketCapData: items.map((item) => item.marketCapValue),
    valueFormatter: (value: string) =>
      formatNumberWithSuffix(BigNumber(value), {
        decimalPlaces: 6,
      }).fullyFormattedNumber,
  }
}

const statsSelector = (data: IResponse<"homepage_stats">) => {
  return {
    daily_txs: formatNumberWithSuffix(
      BigNumber(data?.transactions_today || 0),
      {
        decimalPlaces: 2,
      },
    ).fullyFormattedNumber,
    coin_price:
      "$" +
      formatNumberWithSuffix(BigNumber(data?.coin_price || 0), {
        decimalPlaces: 6,
      }).fullyFormattedNumber,
    market_cap:
      "$" +
      formatNumberWithSuffix(BigNumber(data?.market_cap || 0), {
        decimalPlaces: 1,
      }).fullyFormattedNumber,
  }
}

const ChartTitle = ({
  title,
  value,
}: {
  title: string
  value: string | undefined
}) => {
  return (
    <Flex
      alignItems="flex-start"
      flexDirection="column"
      justifyContent="center"
    >
      <Text color="neutral.light.6" textStyle="8125">
        {title}
      </Text>

      <Text textStyle="1" fontWeight={500}>
        {value}
      </Text>
    </Flex>
  )
}

const HomeChart = (props: GridItemProps) => {
  const [indicatorId, selectIndicator] = useWatchState<UHomepageIndicatorId>(
    "daily_txs",
    [],
    {
      throttle: 200,
    },
  )

  const {
    data: txs,
    dataUpdatedAt: txsDataUpdatedAt,
    isPending: isTxsPending,
    isError: isTxsError,
  } = useApiQuery("homepage_chart_txs", {
    queryOptions: {
      enabled: indicatorId !== "coin_price" && indicatorId !== "market_cap",
      select: txsSelector,
    },
  })
  const {
    data: market,
    dataUpdatedAt: marketDataUpdatedAt,
    isPending: isMarketPending,
    isError: isMarketError,
  } = useApiQuery("homepage_chart_market", {
    queryOptions: {
      select: marketSelector,
      enabled: indicatorId === "coin_price" || indicatorId === "market_cap",
    },
  })

  const { data: stats, isPlaceholderData: isStatsLoading } = useApiQuery(
    "homepage_stats",
    {
      queryOptions: { placeholderData: HOMEPAGE_STATS, select: statsSelector },
    },
  )

  const isMobile = useIsMobile()

  const data = useMemo(() => {
    if (indicatorId === "coin_price") {
      if (!market) return undefined
      return {
        labels: market.labels,
        data: market.priceData,
        name: getLanguage("utils.price"),
        valueFormatter: market.valueFormatter,
      }
    }
    if (indicatorId === "market_cap") {
      if (!market) return undefined
      return {
        labels: market.labels,
        data: market.marketCapData,
        valueFormatter: market.valueFormatter,
        name: getLanguage("utils.market_cap"),
      }
    }

    if (!txs) return undefined

    return {
      labels: txs.labels,
      data: txs.data,
      name: getLanguage("utils.tx_day"),
      valueFormatter: txs.valueFormatter,
    }
  }, [indicatorId, market, txs])

  return (
    <Stack
      minHeight="23.5rem"
      backgroundColor="neutral.light.1"
      borderWidth="1px"
      flexDirection="column"
      borderTopLeftRadius={2}
      borderTopRightRadius={2}
      borderBottomLeftRadius={2}
      borderBottomRightRadius={2}
      borderColor="neutral.light.3"
      boxShadow="primary"
      {...props}
    >
      <TabFloat
        globalTabProps={{
          minWidth: "unset",
          height: "4rem",
          paddingX: { base: 2, lg: 4 },
          marginX: { base: 2, lg: 0 },
          paddingTop: 4,
          paddingBottom: 1,
          flex: 1,
          borderRadius: "none",
          borderBottomWidth: "1px",
          borderBottomColor: "neutral.light.3",
          justifyContent: { base: "flex-start", "2lg": "center" },
        }}
        isSetOnRouter={false}
        id="stats_tab"
        value={indicatorId}
        onChange={(newId) => selectIndicator(newId)}
        indicatorProps={{
          background: "transparent",
          height: {
            base: "full",
            lg: "0.125rem",
          },
          width: {
            base: "0.125rem",
            lg: "full",
          },
          paddingX: { base: 0, lg: 4 },
          display: "flex",
          alignItems: "flex-end",
          children: (
            <Box
              background="primaryLightButton"
              width={{ base: "0.125rem", lg: "full" }}
              height={{
                base: "full",
                lg: "0.125rem",
              }}
              borderTopLeftRadius={{ base: 0, lg: "0.25rem" }}
              borderTopRightRadius={{ base: "0.25rem" }}
              borderBottomRightRadius={{ base: "0.25rem", lg: 0 }}
            ></Box>
          ),
        }}
        orientation={isMobile ? "vertical" : "horizontal"}
        tabListProps={{
          height: "unset",
        }}
        isLoading={isStatsLoading}
        tabs={[
          {
            id: "daily_txs",
            title: (
              <ChartTitle
                title={getLanguage(
                  "main_homepage.overview_chart.daily_transactions",
                )}
                value={stats?.daily_txs}
              />
            ),
            component: null,
          },
          {
            id: "coin_price",
            title: (
              <ChartTitle
                title={getLanguage("utils.sei_price")}
                value={stats?.coin_price}
              />
            ),
            component: null,
          },
          {
            id: "market_cap",
            title: (
              <ChartTitle
                title={getLanguage("main_homepage.overview_chart.market_cap")}
                value={stats?.market_cap}
              />
            ),
            component: null,
          },
        ]}
      ></TabFloat>
      <HomeChartContent
        data={data}
        isError={
          indicatorId === "coin_price" || indicatorId === "market_cap"
            ? isMarketError
            : isTxsError
        }
        isPending={
          indicatorId === "coin_price" || indicatorId === "market_cap"
            ? isMarketPending
            : isTxsPending
        }
        dataUpdatedAt={
          indicatorId === "coin_price" || indicatorId === "market_cap"
            ? marketDataUpdatedAt
            : txsDataUpdatedAt
        }
      />
    </Stack>
  )
}

export default memo(HomeChart, () => true)
