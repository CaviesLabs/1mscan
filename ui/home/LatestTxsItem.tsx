import { HStack, Stack, Td, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import type { Transaction } from "types/api/transaction"
import BlockTimestamp from "ui/blocks/BlockTimestamp"
import CurrencyValue from "ui/shared/CurrencyValue"
import FromTo from "ui/shared/FromTo"
import IconSvg from "ui/shared/IconSvg"
import Tag from "ui/shared/chakra/Tag"
import AddressV2 from "ui/shared/entities/address/AddressEntityV2"
import TxEntityV2 from "ui/shared/entities/tx/TxEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"
import TruncatedTextTooltip from "ui/shared/truncate/TruncatedTextTooltip"

type Props = {
  tx: Transaction
  isLoading?: boolean
  tab: "evm" | "native"
}

const LatestTxsItem = ({ tx, isLoading, tab }: Props) => {
  const dataTo = tx.to ? tx.to : tx.created_contract

  return (
    <Tr role="group">
      <Td paddingLeft="1rem !important">
        <HStack gap={2}>
          <IconSvg
            name="tx"
            boxSize={5}
            color="secondary.03"
            isLoading={isLoading}
          />
          <Stack gap={1} overflow="hidden">
            <TxEntityV2
              noCopy
              isLoading={isLoading}
              headLength={4}
              tailLength={4}
              hash={tx.hash}
              truncation="constant"
            />

            <BlockTimestamp ts={tx.timestamp} isLoading={isLoading} />
          </Stack>
        </HStack>
      </Td>
      {tab === "native" && (
        <Td>
          <TruncatedTextTooltip label={tx.method}>
            <Tag isTruncated isLoading={isLoading} maxWidth="full">
              {tx.method}
            </Tag>
          </TruncatedTextTooltip>
        </Td>
      )}
      {tab === "evm" && (
        <Td>
          <HStack gap={2}>
            <FromTo isLoading={isLoading} />
            <Stack gap={1} overflow="hidden">
              <AddressV2
                isLoading={isLoading}
                address={tx.from}
                truncation="constant"
                headLength={4}
                tailLength={4}
              />
              {dataTo && (
                <AddressV2
                  isLoading={isLoading}
                  address={dataTo}
                  truncation="constant"
                  headLength={4}
                  tailLength={4}
                />
              )}
            </Stack>
          </HStack>
        </Td>
      )}
      <Td paddingRight="1rem !important">
        <Stack overflow="hidden" width="full" gap={1}>
          <HStack gap={1}>
            <SkeletonText isLoading={isLoading} color="neutral.light.6">
              {getLanguage("utils.sei")}:
            </SkeletonText>
            <CurrencyValue
              value={tx.value}
              color="neutral.light.7"
              osType={tab === "native" ? "Cosmos" : "EVM"}
              isLoading={isLoading}
            ></CurrencyValue>
          </HStack>

          <HStack gap={1}>
            <SkeletonText isLoading={isLoading} color="neutral.light.6">
              {getLanguage("utils.fee")}:
            </SkeletonText>

            <CurrencyValue
              isLoading={isLoading}
              color="neutral.light.7"
              value={tx.fee?.value}
              osType={tab === "native" ? "Cosmos" : "EVM"}
            ></CurrencyValue>
          </HStack>
        </Stack>
      </Td>
    </Tr>
  )
}

export default memo(LatestTxsItem, (prev, next) => {
  return prev.tx.hash === next.tx.hash && prev.isLoading === next.isLoading
})
