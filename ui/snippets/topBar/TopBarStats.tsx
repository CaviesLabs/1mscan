import { HStack, type StackProps, chakra } from "@chakra-ui/react"
import { keyframes } from "@chakra-ui/system"
import BigNumber from "bignumber.js"
import { getLanguage } from "languages/useLanguage"
import useApiQuery from "lib/api/useApiQuery"
import _ from "lodash"
import { useRouter } from "next/router"
import { memo } from "react"
import type { IStatsCounters } from "types/api/stats"
import GasInfoTooltipContent from "ui/shared/GasInfoTooltipContent/GasInfoTooltipContent"
import IconSvg from "ui/shared/IconSvg"
import SkeletonText from "ui/shared/text/SkeletonText"
import TooltipV2 from "ui/shared/tootltip/TooltipV2"

type Props = StackProps

const heartBeatKf = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`

const mapCounters = (data: IStatsCounters) => {
  return _.chain({
    average_gas_price: null as string | null,
    fast_gas_price: null as string | null,
    slow_gas_price: null as string | null,
  })
    .tap((store) => {
      data.forEach((item) => {
        if (item.id === "average_gas_price") {
          store.average_gas_price = item.value
          return
        }
        if (item.id === "fast_gas_price") {
          store.fast_gas_price = item.value
          return
        }
        if (item.id === "slow_gas_price") {
          store.slow_gas_price = item.value
          return
        }
      })
    })
    .thru((store) => {
      return {
        average_gas_price: store.average_gas_price || "N/A",
        fast_gas_price: store.fast_gas_price || "N/A",
        slow_gas_price: store.slow_gas_price || "N/A",
      }
    })
    .value()
}

const TopBarStats = (props: Props) => {
  const {
    data: stats,
    isFetching: statsIsFetching,
    isError: statsIsError,
  } = useApiQuery("gateway_stats_counters", {
    queryOptions: {
      select: mapCounters,
    },
  })

  const {
    data: checkpoint,
    isFetching: checkpointIsFetching,
    isError: checkpointIsError,
  } = useApiQuery("checkpoints", {
    queryOptions: {
      refetchOnMount: false,
    },
  })

  const { data: seiPrice, isFetching: seiPriceIsFetching } = useApiQuery(
    "sei_coingecko_price",
    {
      queryOptions: {
        select: (data) => {
          const value = BigNumber(data["sei-network"].usd)
          if (!value.gte(0)) return "N/A"
          return `$${value.toFormat(6)}`
        },
      },
    },
  )

  const router = useRouter()
  const homePage = router.pathname === "/"

  return (
    <HStack
      data-home={homePage}
      sx={{
        "&[data-home=true]": {
          display: {
            base: "flex",
          },
        },
        display: {
          base: "none",
          lg: "flex",
        },
      }}
      color="neutral.light.6"
      textStyle="8125"
      spacing={4}
      {...props}
    >
      <HStack spacing={1}>
        <SkeletonText isLoading={checkpointIsFetching}>
          {getLanguage("header.checkpoint")}:{" "}
        </SkeletonText>
        <SkeletonText
          isLoading={checkpointIsFetching}
          color="secondary.03"
          textStyle="75"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <span>{checkpoint?.tx_checkpoint.toLocaleString()}</span>
          <chakra.span animation={`${heartBeatKf} 3s ease-in-out infinite`}>
            {_.chain(checkpoint)
              .thru((checkpoint) => {
                if (checkpointIsError) return "🔴"
                if (!checkpoint) return "-"
                if (checkpoint.latest_block - checkpoint.tx_checkpoint >= 200)
                  return "🟠"
                if (checkpoint.latest_block - checkpoint.tx_checkpoint < 200)
                  return "🟢"
                return "-"
              })
              .value()}
          </chakra.span>
        </SkeletonText>
      </HStack>

      <HStack
        display={{
          base: "none",
          lg: "flex",
        }}
        spacing={1}
      >
        <SkeletonText isLoading={statsIsFetching || seiPriceIsFetching}>
          {getLanguage("header.sei_price")}:
        </SkeletonText>
        <SkeletonText
          color="secondary.03"
          textStyle="75"
          isLoading={statsIsFetching || seiPriceIsFetching}
        >
          {seiPrice}
        </SkeletonText>
      </HStack>

      <HStack
        display={{
          base: "none",
          md: "flex",
        }}
        spacing={1}
      >
        <IconSvg
          isLoading={statsIsFetching}
          color="inherit"
          name="gas"
          boxSize={3}
          flexShrink={0}
        />
        <SkeletonText isLoading={statsIsFetching}>Gas: </SkeletonText>
        <SkeletonText
          isLoading={statsIsFetching}
          color="secondary.03"
          textStyle="75"
        >
          <TooltipV2
            isDisabled={
              statsIsFetching || statsIsError || !stats?.average_gas_price
            }
            label={
              <GasInfoTooltipContent
                average_gas_price={stats?.average_gas_price}
                fast_gas_price={stats?.fast_gas_price}
                slow_gas_price={stats?.slow_gas_price}
              />
            }
          >
            <span>{stats?.average_gas_price} nsei</span>
          </TooltipV2>
        </SkeletonText>
      </HStack>
    </HStack>
  )
}

export default memo(TopBarStats, () => true)
