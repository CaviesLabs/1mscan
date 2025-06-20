import { Stack, Td, Tr } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import useTimeAgoIncrement from "lib/hooks/useTimeAgoIncrement"
import { route } from "nextjs-routes"
import { memo } from "react"
import type { IValidatorProposedBlock } from "types/api/validator"
import CurrencyValue from "ui/shared/CurrencyValue"
import LinkInternal from "ui/shared/LinkInternal"
import BlockEntityV2 from "ui/shared/entities/block/BlockEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"

interface Props {
  item: IValidatorProposedBlock
  isLoading?: boolean
}

const ValidatorProposedBlocksTableItem = ({ item, isLoading }: Props) => {
  const blockTimeAgo = useTimeAgoIncrement(item.time)

  return (
    <Tr role="group">
      <Td>
        <Stack gap={1}>
          <BlockEntityV2
            number={item.height}
            isLoading={isLoading}
            noIcon
            noCopy
          />

          <SkeletonText
            color="neutral.light.5"
            textStyle="8125"
            isLoading={isLoading}
          >
            {blockTimeAgo}
          </SkeletonText>
        </Stack>
      </Td>

      <Td textAlign="right">
        <LinkInternal
          href={route({
            pathname: "/block/[height_or_hash]",
            query: {
              height_or_hash: item.height as any,
              tab: "transactions",
            },
          })}
          isLoading={isLoading}
        >
          {item.tx_count}
        </LinkInternal>
      </Td>

      <Td textAlign="right">
        <CurrencyValue
          value={item.total_gas_used}
          decimals={6}
          isLoading={isLoading}
          keepIntegerPart
        />
      </Td>

      <Td textAlign="right">
        <CurrencyValue
          value={BigNumber(item.total_gas_used).multipliedBy(
            BigNumber(item.percent_voting_power),
          )}
          decimals={0}
          isLoading={isLoading}
          keepIntegerPart
        />
      </Td>
    </Tr>
  )
}

export default memo(ValidatorProposedBlocksTableItem, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.item === next.item
})
