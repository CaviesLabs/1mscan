import { HStack, type StackProps, Text } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { getLanguage } from "languages/useLanguage"
import useApiQuery from "lib/api/useApiQuery"
import { useLastSync } from "lib/hooks/useLastSync"
import { memo } from "react"
import { BLOCK } from "stubs/block"
import { generateKey } from "stubs/utils"
import type { Block, BlocksResponse } from "types/api/block"
import LinkInternal from "ui/shared/LinkInternal"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import HomeLayout from "./HomeLayout"
import LatestBlocksItem from "./LatestBlocksItem"

const BLOCK_MAX_COUNT = 6

const placeholderData = {
  items: Array(BLOCK_MAX_COUNT).fill(BLOCK),
  next_page_params: null,
}

const LatestBlocks = (props: StackProps) => {
  const { data: totalValidators } = useApiQuery("validators_stats", {
    queryOptions: {
      select: (data) => {
        const total = data.find(
          (item) => item.label === "Total validators",
        )?.value
        if (!total) return 0

        const totalBn = BigNumber(total)
        if (!totalBn.gte(0)) return 0
        return totalBn.toFormat(0)
      },
    },
  })

  const { data, isPlaceholderData, dataUpdatedAt } = useApiQuery<
    "blocks",
    BlocksResponse,
    Block[]
  >("blocks", {
    queryParams: {
      limit: BLOCK_MAX_COUNT,
    },
    queryOptions: {
      placeholderData: placeholderData,
      select: (data) => {
        return data?.items.slice(0, BLOCK_MAX_COUNT) || []
      },
    },
  })

  const lastSync = useLastSync(dataUpdatedAt, [data])

  return (
    <HomeLayout
      title={getLanguage("main_homepage.latest_blocks_section.latest_blocks")}
      hint={`${getLanguage("utils.last_sync")}: ${lastSync}`}
      href="/blocks"
      gap={3}
      overflow="hidden"
      padding={0}
      titleBoxProps={{
        paddingTop: 4,
        paddingX: 4,
      }}
      subTitle={
        totalValidators && (
          <HStack gap={1}>
            <Text as="span" textStyle="875" color="neutral.light.6">
              {getLanguage(
                "main_homepage.latest_blocks_section.allocated_validators",
              )}
            </Text>
            <LinkInternal
              href="/validators"
              position="relative"
              textStyle="87500"
              color="secondary.03.text"
              fontWeight={500}
            >
              {totalValidators}
            </LinkInternal>
          </HStack>
        )
      }
      {...props}
    >
      <ScrollTable variant="home" sizes={[35, 45, 20]} maxs={[, "13rem"]}>
        <TbodyControl tdProps={{ height: "auto" }}>
          {data?.map((block, index) => (
            <LatestBlocksItem
              key={generateKey(index, isPlaceholderData, block.height)}
              block={block}
              isLoading={isPlaceholderData}
            />
          ))}
        </TbodyControl>
      </ScrollTable>
    </HomeLayout>
  )
}

export default memo(LatestBlocks, () => true)
