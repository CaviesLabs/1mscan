import { HStack, Stack, Td, Tr } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { getLanguage } from "languages/useLanguage"
import { memo, useMemo } from "react"
import type { Block } from "types/api/block"
import BlockTimestamp from "ui/blocks/BlockTimestamp"
import CurrencyValue from "ui/shared/CurrencyValue"
import AddressV2 from "ui/shared/entities/address/AddressEntityV2"
import BlockEntityV2, {
  BlockIconV2,
} from "ui/shared/entities/block/BlockEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"

type Props = {
  block: Block
  isLoading?: boolean
}

const LatestBlocksItem = ({ block, isLoading }: Props) => {
  const totalReward = useMemo(
    () =>
      BigNumber.sum(...(block.rewards?.map((x) => x.reward) || [])).div(
        10 ** 18,
      ),
    [block],
  )
  return (
    <Tr role="group">
      <Td paddingLeft="1rem !important">
        <HStack gap={2} overflow="hidden">
          <BlockIconV2 boxSize="1.25rem" isLoading={isLoading} flexShrink={0} />
          <Stack gap={1} overflow="hidden">
            <BlockEntityV2
              number={block.height}
              isLoading={isLoading}
              textStyle="875"
              noCopy
              noIcon
            />
            <BlockTimestamp ts={block.timestamp} isLoading={isLoading} />
          </Stack>
        </HStack>
      </Td>

      <Td>
        <Stack gap={1} overflow="hidden">
          <HStack spacing={1} overflow="hidden">
            <SkeletonText
              isLoading={isLoading}
              color="neutral.light.6"
              flexShrink={0}
            >
              {getLanguage("main_homepage.latest_blocks_section.validator")}
            </SkeletonText>

            <AddressV2
              address={{
                ...block.miner,
                name: block?.miner?.validator_data?.description?.moniker || "",
                hash: block?.miner?.validator_data?.operator_address || "",
              }}
              isLoading={isLoading}
              noIcon
              noCopy
              isValidator
              textStyle="875"
              truncation="tail"
            />
          </HStack>

          <HStack gap={1} overflow="hidden">
            <SkeletonText
              flexShrink={0}
              isLoading={isLoading}
              color="neutral.light.6"
              textStyle="8125"
            >
              {getLanguage("main_homepage.latest_blocks_section.power")}:
            </SkeletonText>
            <SkeletonText flexShrink={0} isLoading={isLoading} textStyle="8125">
              {block?.miner?.validator_data?.percent_voting_power.toFixed(2)}%
            </SkeletonText>
          </HStack>
        </Stack>
      </Td>

      <Td paddingRight="1rem !important">
        <Stack gap={1} overflow="hidden">
          <SkeletonText isLoading={isLoading} color="neutral.light.6">
            {getLanguage("main_homepage.latest_blocks_section.reward")}:
          </SkeletonText>
          <CurrencyValue
            value={totalReward}
            decimals={0}
            isLoading={isLoading}
            textStyle="875"
            color="neutral.light.7"
          />
        </Stack>
      </Td>
    </Tr>
  )
}

export default memo(LatestBlocksItem, (prev, next) => {
  return (
    prev.block.height === next.block.height && prev.isLoading === next.isLoading
  )
})
