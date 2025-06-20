import type { StackProps } from "@chakra-ui/react"
import { Grid } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { getLanguage } from "languages/useLanguage"
import useApiQuery from "lib/api/useApiQuery"
import { formatLargeNumber } from "lib/utils/formatLargeNumber"
import ClockSVG from "public/icons/clock.svg"
import GasSVG from "public/icons/gas.svg"
import WalletSVG from "public/icons/wallet.svg"
import { memo } from "react"
import { STATS_COUNTERS } from "stubs/stats"
import HomeStat from "./HomeStat"

type Props = {
  //
} & StackProps

const HomeStats = ({ ...props }: Props) => {
  const { data, isPlaceholderData } = useApiQuery("gateway_stats_counters", {
    queryOptions: {
      placeholderData: STATS_COUNTERS,
    },
  })
  const isLoading = isPlaceholderData
  return (
    <Grid
      position="relative"
      gap={2}
      width={{
        base: "full",
        "2lg": "auto",
      }}
      alignSelf="flex-end"
      justifyContent="space-between"
      {...props}
      gridTemplateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(4, 1fr)",
        "2lg": "repeat(2, 1fr)",
      }}
    >
      <HomeStat
        title={getLanguage("main_homepage.top_bar.average_block_time")}
        isLoading={isLoading}
        iconColor="secondary.03"
        icon={ClockSVG}
      >
        {BigNumber(data?.find((c) => c.id === "averageBlockTime")?.value || 0)
          .dp(3)
          .toFormat()}{" "}
        {getLanguage("utils.sec")}
      </HomeStat>
      <HomeStat
        title={getLanguage("main_homepage.top_bar.total_transactions")}
        isLoading={isLoading}
        iconColor="secondary.03"
        icon={WalletSVG}
      >
        {formatLargeNumber(
          data?.find((c) => c.id === "totalTxns")?.value || 0,
          { sticky: true },
        )}
      </HomeStat>
      <HomeStat
        title={getLanguage("main_homepage.top_bar.wallet_addresses")}
        isLoading={isLoading}
        iconColor="secondary.03"
        icon={WalletSVG}
      >
        {formatLargeNumber(
          data?.find((c) => c.id === "totalAddresses")?.value || 0,
          { sticky: true },
        )}
      </HomeStat>
      <HomeStat
        title={getLanguage("main_homepage.top_bar.gas_tracker")}
        isLoading={isLoading}
        iconColor="secondary.03"
        icon={GasSVG}
      >
        {BigNumber(data?.find((c) => c.id === "average_gas_price")?.value || 0)
          .dp(3)
          .toFormat()}
        {" nsei"}
      </HomeStat>
    </Grid>
  )
}

export default memo(HomeStats, () => true)
