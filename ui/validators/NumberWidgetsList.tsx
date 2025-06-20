import { Grid } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { getLanguage } from "languages/useLanguage"
import useApiQuery from "lib/api/useApiQuery"
import _ from "lodash"
import BlockSVG from "public/icons/block.svg"
import CupSVG from "public/icons/cup.svg"
import EarnSVG from "public/icons/earn.svg"
import InvestSVG from "public/icons/invest.svg"
import LockSVG from "public/icons/lock.svg"
import NetPerSVG from "public/icons/net-per.svg"
import NetSVG from "public/icons/net.svg"
import StarSVG from "public/icons/star.svg"
import { memo } from "react"
import type { ValidatorsStatsResponse } from "types/api/validator"
import NumberWidgetV2 from "ui/shared/NumberWidgetV2"

export const mapCounters = (data: ValidatorsStatsResponse) => {
  return _.chain({
    bondedToken: null as BigNumber | null,
    totalRewards: null as BigNumber | null,
    avgApr: null as BigNumber | null,
    activeValidators: null as BigNumber | null,
    totalValidators: null as BigNumber | null,
    bondedTokenRatio: null as BigNumber | null,
    lastBlockRewards: null as BigNumber | null,
    highestApr: null as BigNumber | null,
    totalDelegators: null as BigNumber | null,
  })
    .tap((store) => {
      data.forEach((item) => {
        if (item.label === "Bonded tokens") {
          const temp = BigNumber(item.value!)
          store.bondedToken = temp.gte(0) ? temp : null
          return
        }
        if (item.label === "Total rewards") {
          const temp = BigNumber(item.value!)
          store.totalRewards = temp.gte(0) ? temp : null
          return
        }

        // if (chainKey === "pacific-1") {
        //   if (item.label === "Avg APR") {
        //     const temp = BigNumber(item.value!);
        //     store.avgApr = temp.gte(0) ? temp : null;
        //     return;
        //   }
        //   if (item.label === "Highest APR") {
        //     const temp = BigNumber(item.value!);
        //     store.highestApr = temp.gte(0) ? temp : null;
        //     return;
        //   }
        // }
        if (item.label === "Total validators") {
          const temp = BigNumber(item.value!)
          store.totalValidators = temp.gte(0) ? temp : null
          return
        }
        if (item.label === "Active validators") {
          const temp = BigNumber(item.value!)
          store.activeValidators = temp.gte(0) ? temp : null
          return
        }
        if (item.label === "Bonded token ratio") {
          const temp = BigNumber(item.value!)
          store.bondedTokenRatio = temp.gte(0) ? temp : null
          return
        }
        if (item.label === "Last block reward") {
          const temp = BigNumber(item.value!)
          store.lastBlockRewards = temp.gte(0) ? temp : null
          return
        }

        if (item.label === "Total delegators") {
          const temp = BigNumber(item.value!)
          store.totalDelegators = temp.gte(0) ? temp : null
          return
        }
      })
    })
    .thru((store) => {
      return {
        bondedToken: store.bondedToken
          ? `${store.bondedToken?.div(1e6).toFormat(3)} SEI`
          : "N/A",
        totalRewards: store.totalRewards
          ? `${store.totalRewards?.div(1e6).toFormat(3)} SEI`
          : "0",
        avgApr: `${store.avgApr?.toFormat(2, BigNumber.ROUND_UP) || "0.00"}%`,
        totalValidators: store.totalValidators?.toFormat(0) || "N/A",
        activeValidators: store.activeValidators?.toFormat(0) || "N/A",
        bondedTokenRatio: store.bondedTokenRatio
          ? `${store.bondedTokenRatio?.toFormat(2)}%`
          : "N/A",
        lastBlockRewards: store.lastBlockRewards
          ? `${store.lastBlockRewards?.div(1e6).toFormat(3)} SEI`
          : "N/A",
        highestApr: `${store.highestApr?.toFormat(2, BigNumber.ROUND_UP) || "0.00"}%`,
        totalDelegators: store.totalDelegators?.toFormat(0) || "N/A",
      }
    })
    .value()
}

const NumberWidgetsList = () => {
  const { data, isPlaceholderData } = useApiQuery("validators_stats", {
    queryOptions: {
      placeholderData: [],
      select: mapCounters,
    },
  })

  const isLoading = isPlaceholderData

  return (
    <Grid
      gridTemplateColumns={{
        base: "repeat(1, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={3}
      width="full"
    >
      <NumberWidgetV2
        title={getLanguage("validators_page.stats.bonded_token")}
        isLoading={isLoading}
        iconColor="secondary.01"
        icon={LockSVG}
      >
        {data?.bondedToken}
      </NumberWidgetV2>
      <NumberWidgetV2
        title={getLanguage("validators_page.stats.total_rewards")}
        isLoading={isLoading}
        iconColor="secondary.02"
        icon={CupSVG}
      >
        {data?.totalRewards}
      </NumberWidgetV2>
      <NumberWidgetV2
        title={getLanguage("validators_page.stats.avg_apr")}
        isLoading={isLoading}
        iconColor="secondary.03"
        icon={EarnSVG}
      >
        {data?.avgApr}
      </NumberWidgetV2>
      <NumberWidgetV2
        title={getLanguage("validators_page.stats.total_validators")}
        isLoading={isLoading}
        iconColor="secondary.05"
        icon={NetSVG}
      >
        {data?.totalValidators}
      </NumberWidgetV2>
      <NumberWidgetV2
        title={getLanguage("validators_page.stats.bonded_token_ratio")}
        isLoading={isLoading}
        iconColor="secondary.01"
        icon={StarSVG}
      >
        {data?.bondedTokenRatio}
      </NumberWidgetV2>
      <NumberWidgetV2
        title={getLanguage("validators_page.stats.last_block_rewards")}
        isLoading={isLoading}
        iconColor="secondary.02"
        icon={BlockSVG}
      >
        {data?.lastBlockRewards}
      </NumberWidgetV2>
      <NumberWidgetV2
        title={getLanguage("validators_page.stats.highest_apr")}
        isLoading={isLoading}
        iconColor="secondary.03"
        icon={InvestSVG}
      >
        {data?.highestApr}
      </NumberWidgetV2>
      <NumberWidgetV2
        title={getLanguage("validators_page.stats.total_delegators")}
        isLoading={isLoading}
        iconColor="secondary.05"
        icon={NetPerSVG}
      >
        {data?.totalDelegators}
      </NumberWidgetV2>
    </Grid>
  )
}

export default memo(NumberWidgetsList, () => true)
