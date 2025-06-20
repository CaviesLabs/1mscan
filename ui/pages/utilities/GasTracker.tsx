import { HStack } from "@chakra-ui/react"
import useApiQuery from "lib/api/useApiQuery"
import _ from "lodash"
import { memo, useMemo } from "react"
import type { IStatsCounters } from "types/api/stats"
import GasInfoTooltipContent from "ui/shared/GasInfoTooltipContent/GasInfoTooltipContent"
import Hint from "ui/shared/Hint"
import NumberWidget from "ui/shared/NumberWidget"

type Props = {
  //
}

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

const GasTracker = ({}: Props) => {
  const { data, isPlaceholderData, isError } = useApiQuery(
    "gateway_stats_counters",
    {
      queryOptions: {
        select: mapCounters,
      },
    },
  )

  const tooltip = useMemo(
    () =>
      data ? (
        <GasInfoTooltipContent
          average_gas_price={data.average_gas_price}
          fast_gas_price={data.fast_gas_price}
          slow_gas_price={data.slow_gas_price}
        />
      ) : (
        <></>
      ),
    [data],
  )

  if (isError) return <></>

  return (
    <NumberWidget
      index={4}
      label="Average fee"
      noTooltip
      value={
        <HStack spacing={2}>
          <span>
            {Number(data?.average_gas_price) >= 0
              ? `${Number(data!.average_gas_price).toLocaleString()}`
              : "N/A"}
          </span>
          <Hint
            borderRadius="md"
            isLoading={isPlaceholderData}
            label={tooltip}
          ></Hint>
        </HStack>
      }
      isLoading={isPlaceholderData}
    />
  )
}

export default memo(GasTracker)
