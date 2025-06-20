import { Grid } from "@chakra-ui/react"
import moment from "lib/date/moment"
import { memo } from "react"
import type { IIBCRelayerChannel } from "types/api/ibcRelayer"
import NumberWidget from "ui/shared/NumberWidget"

type Props = {
  data: IIBCRelayerChannel
  isLoading?: boolean
}

const NumberWidgetList = ({ data, isLoading, ...props }: Props) => {
  return (
    <Grid
      gridTemplateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }}
      gridGap="0.75rem"
      width="full"
      {...props}
    >
      <NumberWidget
        index={0}
        label="Counter party"
        value={data.counterparty_channel_id}
        isLoading={isLoading}
      />
      <NumberWidget
        index={1}
        label="Operating since"
        value={moment(
          data.ibc_connection.ibc_client.operating_since_1 ||
            data.ibc_connection.ibc_client.operating_since_2,
        ).fromNow()}
        isLoading={isLoading}
      />
      <NumberWidget
        index={2}
        label="Total transactions"
        value={data.total_tx.aggregate.count}
        isLoading={isLoading}
      />
      <NumberWidget
        index={3}
        label="Client ID"
        value={data.ibc_connection.ibc_client.client_id}
        isLoading={isLoading}
      />
    </Grid>
  )
}

export default memo(NumberWidgetList, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.data === next.data
})
