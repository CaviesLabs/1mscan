import { Flex } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import useApiQuery from "lib/api/useApiQuery"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { isNil } from "lodash"
import { memo } from "react"
import { useErrorBoundary } from "react-error-boundary"
import { BLOCK } from "stubs/block"
import BlockDetails from "ui/block/BlockDetails"
import BlockEstimate from "ui/block/BlockEstimate"
import BlockTxs from "ui/block/BlockTxs"
import PageTitle from "ui/shared/Page/PageTitle"
import ScrollTab from "ui/shared/Tabs/ScrollTab"
import AddressV2 from "ui/shared/entities/address/AddressEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"

type Props = {}

const BlockPageContent = ({}: Props) => {
  const [heightOrHash] = useSetStateQuery<string>("height_or_hash", [], {
    throttle: 1000,
    cleanUp: {
      keepQueries: [],
    },
  })

  const { showBoundary } = useErrorBoundary()

  const {
    data: block,
    error,
    isPlaceholderData,
  } = useApiQuery("block", {
    pathParams: { height_or_hash: heightOrHash },
    queryOptions: {
      enabled: !isNil(heightOrHash),
      placeholderData: BLOCK,
      retry: 0,
    },
  })

  const {
    data: latestBlock,
    error: latestBlockError,
    isPending: latestBlockIsPending,
  } = useApiQuery("blocks", {
    queryOptions: {
      select: (data) => data?.items?.[0]?.height,
      retry: 0,
      enabled: Boolean(error),
      staleTime: Number.POSITIVE_INFINITY,
    },
  })

  if (error && !latestBlockIsPending) {
    if (latestBlockError) {
      showBoundary(latestBlockError)
      return
    }

    if (latestBlock < Number(heightOrHash))
      return <BlockEstimate target={heightOrHash} latestBlock={latestBlock} />
    else {
      showBoundary(error)
      return
    }
  }

  const isLoading = isPlaceholderData

  return (
    <>
      <PageTitle
        hasDefaultBackLink
        title={`${getLanguage("block_details_page.header_section.block")} #${block?.height ?? heightOrHash}`}
        secondRow={
          block?.miner && (
            <Flex
              fontFamily="heading"
              display="flex"
              minW={0}
              columnGap={2}
              textStyle="1"
              alignItems="center"
            >
              <SkeletonText isLoading={isLoading} flexShrink={0}>
                {getLanguage("block_details_page.header_section.validated_by")}
              </SkeletonText>
              <AddressV2
                address={{
                  ...block?.miner,
                  name:
                    block?.miner?.validator_data?.description?.moniker || "",
                  hash: block?.miner?.validator_data?.operator_address || "",
                  image_url: block?.miner?.validator_data?.image_url,
                }}
                isValidator
                isLoading={isLoading}
                textStyle="1"
              />
            </Flex>
          )
        }
        isLoading={isLoading}
      />

      <ScrollTab
        isLoading={isLoading}
        cleanupOnTabChange={{
          keepQueries: ["height_or_hash"],
        }}
        tabs={[
          {
            id: "index",
            title: getLanguage(
              "block_details_page.main_navigation_tabs.details",
            ),
            component: BlockDetails,
            props: {
              heightOrHash,
              isLoading,
              block,
            },
          },
          {
            id: "transactions",
            title: getLanguage(
              "block_details_page.main_navigation_tabs.transactions",
            ),
            count: block?.tx_count,
            component: BlockTxs,
            props: {
              heightOrHash,
              isLoading,
              block,
            },
          },
        ]}
      />
    </>
  )
}

export default memo(BlockPageContent, () => true)
