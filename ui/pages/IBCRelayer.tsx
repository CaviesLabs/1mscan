import { HStack, Text, VStack } from "@chakra-ui/react"
import useApiQuery from "lib/api/useApiQuery"
import { useCurrentChain } from "lib/hooks/useCurrentChain"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { memo, useEffect } from "react"
import { useErrorBoundary } from "react-error-boundary"
import { IBC_RELAYER_CHANNEL } from "stubs/ibcRelayer"
import NumberWidgetList from "ui/ibcRelayer/NumberWidgetList"
import IBCRelayerTransactions from "ui/ibcRelayer/transaction/IBCRelayerTransactions"
import IBCRelayerTransferAssets from "ui/ibcRelayer/transfers/IBCRelayerTransferAssets"
import { IBCRelayerChannelConnector } from "ui/ibcRelayers/IBCRelayerConnectorEntity"
import Divider from "ui/shared/Divider"
import PageTitle from "ui/shared/Page/PageTitle"
import ScrollTab from "ui/shared/Tabs/ScrollTab"

const IBCRelayer = () => {
  const { showBoundary } = useErrorBoundary()
  const [counterparty_channel_id] = useSetStateQuery<string>(
    "counterparty_channel_id",
    [],
    {},
  )

  const [channel_id] = useSetStateQuery<string>("channel_id", [], {})

  const currentChain = useCurrentChain()

  const { data, isPlaceholderData, error } = useApiQuery(
    "ibc_channel_details",
    {
      pathParams: {
        channel_id: channel_id,
        counterparty_channel_id: counterparty_channel_id,
      },
      queryOptions: {
        enabled: Boolean(channel_id && counterparty_channel_id),
        placeholderData: IBC_RELAYER_CHANNEL,
      },
    },
  )

  const { data: transfersData } = useApiQuery("ibc_transfer_assets", {
    pathParams: { channel_id, counterparty_channel_id },
    queryParams: { limit: 1 },
    queryOptions: { enabled: Boolean(channel_id && counterparty_channel_id) },
  })
  const { data: transactionsData } = useApiQuery("ibc_channel_transactions", {
    pathParams: { channel_id },
    queryParams: { limit: 1 },
    queryOptions: { enabled: Boolean(channel_id && counterparty_channel_id) },
  })

  useEffect(() => {
    if (error) {
      showBoundary(error)
    }
  }, [error])

  return (
    <>
      <PageTitle
        title={`Sei ${currentChain?.chainName} - ${channel_id || ""}`}
        hasDefaultBackLink
        isLoading={isPlaceholderData}
      ></PageTitle>
      <Divider></Divider>
      <HStack justifyContent="center" paddingY={8}>
        <IBCRelayerChannelConnector
          isLoading={isPlaceholderData}
          channel={data!}
          maxWidth={{ base: "full", lg: "58.5rem" }}
        ></IBCRelayerChannelConnector>
      </HStack>
      <Divider></Divider>

      <VStack alignItems="stretch" width="full" paddingY={4} spacing={3}>
        <Text as="h2" textStyle="title">
          Overview
        </Text>
        <NumberWidgetList
          data={data!}
          isLoading={isPlaceholderData}
        ></NumberWidgetList>
      </VStack>

      <ScrollTab
        mt={8}
        cleanupOnTabChange={{
          keepQueries: ["channel_id", "counterparty_channel_id"],
        }}
        tabs={[
          {
            id: "transfer_assets",
            title: "Transfer assets",
            count: transfersData?.total_count,
            component: IBCRelayerTransferAssets,
            props: {
              channel_id: channel_id,
              counterparty_channel_id: counterparty_channel_id,
            },
          },
          {
            id: "transactions",
            title: "Transactions",
            count: transactionsData?.total_count,
            component: IBCRelayerTransactions,
            props: {
              channel_id: channel_id,
            },
          },
        ]}
      ></ScrollTab>
    </>
  )
}

export default memo(IBCRelayer, () => true)
