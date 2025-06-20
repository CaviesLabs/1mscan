import type { GridProps } from "@chakra-ui/react"
import { Grid } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import useApiQuery from "lib/api/useApiQuery"
import { memo } from "react"
import { BLOCK } from "stubs/block"
import { STATS_COUNTER } from "stubs/stats"

import NumberWidget from "ui/shared/NumberWidget"

type Props = Partial<GridProps> & {}

const placeholderDataBlocks = {
  items: [BLOCK],
  next_page_params: null,
}
const placeholderDataStats = {
  counters: [STATS_COUNTER],
}

const NumberWidgetsList = ({ ...props }: Props) => {
  const { data: latestBlock, isPlaceholderData: isLoadingBlocks } = useApiQuery(
    "blocks",
    {
      queryParams: { type: "block", limit: 1 },
      queryOptions: {
        placeholderData: placeholderDataBlocks,
        select: (data) => {
          return data?.items?.[0]?.height
        },
      },
    },
  )
  const { data: averageBlockTime, isPlaceholderData: isLoadingStats } =
    useApiQuery("stats_counters", {
      queryOptions: {
        placeholderData: placeholderDataStats,
        select: (data) =>
          data?.counters?.find((x) => x.id === "averageBlockTime"),
      },
    })

  return (
    <Grid
      gridTemplateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
      gridGap="0.75rem"
      width="full"
      {...props}
    >
      <NumberWidget
        index={0}
        label={getLanguage("blocks_page.block_height")}
        value={`${Number(latestBlock)?.toLocaleString()}`}
        isLoading={isLoadingBlocks}
      />
      <NumberWidget
        index={1}
        label={getLanguage("blocks_page.block_time")}
        value={`${Number(averageBlockTime?.value)?.toLocaleString(undefined, { maximumSignificantDigits: 2 })}${averageBlockTime?.units}`}
        isLoading={isLoadingStats}
      />
    </Grid>
  )
}

export default memo(NumberWidgetsList, () => true)
