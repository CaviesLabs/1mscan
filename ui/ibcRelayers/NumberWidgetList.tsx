import { Grid } from "@chakra-ui/react"
import { memo } from "react"
import type { IIBCRelayersStat } from "types/api/ibcRelayer"
import NumberWidget from "ui/shared/NumberWidget"

type Props = {
  isLoading?: boolean
  stat: IIBCRelayersStat
}

const NumberWidgetList = ({ isLoading, stat, ...props }: Props) => {
  return (
    <Grid
      gridTemplateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }}
      gridGap="0.75rem"
      width="full"
      {...props}
    >
      <NumberWidget
        index={0}
        label="Connected Chains"
        value={stat.total_connected_chain}
        isLoading={isLoading}
      />
      <NumberWidget
        index={1}
        label="Total Channels"
        value={`${stat.total_opening_channels} / ${stat.total_channels}`}
        isLoading={isLoading}
      />
      <NumberWidget
        index={2}
        label="Total Send"
        value={stat.total_send}
        description="The total number of executed transactions to send tokens via IBC relayers."
        isLoading={isLoading}
      />
      <NumberWidget
        index={3}
        label="Total Receive"
        value={stat.total_receive}
        description="The total number of executed transactions to receive tokens from IBC relayers."
        isLoading={isLoading}
      />
    </Grid>
  )
}

export default memo(NumberWidgetList, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.stat === next.stat
})
