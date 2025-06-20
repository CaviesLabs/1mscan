import useApiQuery from "lib/api/useApiQuery"
import { memo } from "react"
import type { IIBCRelayerTransferType } from "types/api/ibcRelayer"
import ScrollTabFloat from "ui/shared/Tabs/ScrollTabFloat"
import IBCTransferAssetsContent from "./IBCTransferAssetsContent"

type Props = {
  channel_id: string
  counterparty_channel_id: string
}

const IBCRelayerTransferAssets = ({
  channel_id,
  counterparty_channel_id,
}: Props) => {
  const { data: dataSends } = useApiQuery("ibc_transfer_assets", {
    pathParams: {
      channel_id: channel_id,
      counterparty_channel_id: counterparty_channel_id,
    },
    queryParams: { limit: 1, type: "send_packet" },
    queryOptions: {
      enabled: Boolean(channel_id && counterparty_channel_id),
    },
  })

  const { data: dataRecvs } = useApiQuery("ibc_transfer_assets", {
    pathParams: {
      channel_id: channel_id,
      counterparty_channel_id: counterparty_channel_id,
    },
    queryParams: { limit: 1, type: "recv_packet" },
    queryOptions: {
      enabled: Boolean(channel_id && counterparty_channel_id),
    },
  })

  return (
    <ScrollTabFloat
      id="transfer-assets"
      cleanupOnTabChange={{
        keepQueries: ["channel_id", "counterparty_channel_id"],
      }}
      tabs={[
        {
          id: "send_packet" as IIBCRelayerTransferType,
          title: "IBC sending assets",
          count: dataSends?.total_count,
          component: IBCTransferAssetsContent,
          props: {
            type: "send_packet" as IIBCRelayerTransferType,
            channel_id,
            counterparty_channel_id,
          },
        },
        {
          id: "recv_packet" as IIBCRelayerTransferType,
          title: "IBC receiving assets",
          count: dataRecvs?.total_count,
          component: IBCTransferAssetsContent,
          props: {
            type: "recv_packet" as IIBCRelayerTransferType,
            channel_id,
            counterparty_channel_id,
          },
        },
      ]}
    />
  )
}

export default memo(IBCRelayerTransferAssets, (prev, next) => {
  return (
    prev.channel_id === next.channel_id &&
    prev.counterparty_channel_id === next.counterparty_channel_id
  )
})
