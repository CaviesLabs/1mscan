import { Skeleton, Stack, Td, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import getBlockTotalReward from "lib/block/getBlockTotalReward"
import { route } from "nextjs-routes"
import { memo, useMemo } from "react"
import type { Block } from "types/api/block"
import BlockTimestamp from "ui/blocks/BlockTimestamp"
import CurrencyValue from "ui/shared/CurrencyValue"
import LinkInternal from "ui/shared/LinkInternal"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import BlockEntityV2 from "ui/shared/entities/block/BlockEntityV2"

interface Props {
  item: Block
  isLoading?: boolean
}

const BlocksTableItem = ({ item, isLoading }: Props) => {
  const totalReward = useMemo(() => getBlockTotalReward(item), [item.rewards])

  return (
    <Tr>
      <Td>
        <Stack spacing={1}>
          <BlockEntityV2
            isLoading={isLoading}
            number={item.height}
            noIcon
            noCopy
          />

          <BlockTimestamp ts={item.timestamp} isLoading={isLoading} />
        </Stack>
      </Td>

      <Td>
        <AddressEntityV2
          address={{
            ...item?.miner,
            name: item?.miner?.validator_data?.description?.moniker || "",
            hash: item?.miner?.validator_data?.operator_address || "",
            image_url: item?.miner.validator_data?.image_url,
          }}
          iconProps={{
            boxSize: "2.5rem",
          }}
          isValidator
          showAddress
          isLoading={isLoading}
          tooltipProps={{ placement: "right" }}
          copyProps={{
            wrapperProps: {
              alignSelf: "flex-end",
            },
          }}
        />
      </Td>

      <Td>
        <Skeleton isLoaded={!isLoading}>
          {item.is_finalized ? (
            <LinkInternal
              href={route({
                pathname: "/block/[height_or_hash]",
                query: {
                  height_or_hash: String(item.height),
                  tab: "transactions",
                },
              })}
            >
              {item.tx_count}
            </LinkInternal>
          ) : (
            <span>
              {getLanguage("blocks_page.awaiting_transactions_indexing")}
            </span>
          )}
        </Skeleton>
      </Td>
      <Td>
        <CurrencyValue
          value={item.gas_used}
          decimals={0}
          isLoading={isLoading}
        ></CurrencyValue>
      </Td>

      <Td textAlign="right">
        <CurrencyValue
          value={totalReward}
          decimals={0}
          isLoading={isLoading}
        ></CurrencyValue>
      </Td>
    </Tr>
  )
}

export default memo(BlocksTableItem, (prev, next) => {
  return prev.item.hash === next.item.hash && prev.isLoading === next.isLoading
})
