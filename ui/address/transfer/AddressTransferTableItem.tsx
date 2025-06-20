import { Flex, Td, Tr, VStack } from "@chakra-ui/react"
import { getIsNFT } from "lib/getOSType"
import useTimeAgoIncrement from "lib/hooks/useTimeAgoIncrement"
import _ from "lodash"
import { memo, useMemo } from "react"
import type { TokenTransfer } from "types/api/tokenTransfer"
import CurrencyValue from "ui/shared/CurrencyValue"
import NFTV2 from "ui/shared/entities/nft/NFTEntityV2"
import TokenV2 from "ui/shared/entities/token/TokenEntityV2"
import TxV2 from "ui/shared/entities/tx/TxEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"
import TransferDirection from "ui/shared/transfer/TransferDirection"
import TransferTag from "ui/transfer/TransferTag"
import TxTypeMethod from "ui/txs/TxTypeMethod"

type Props = {
  isLoading?: boolean
  item: TokenTransfer
  hash: string
}

const AddressTransferTableItem = ({ item, hash, isLoading }: Props) => {
  const token = item.token
  const timeAgo = useTimeAgoIncrement(item.timestamp)
  const isHybrid = useMemo(
    () => getIsNFT(item?.token?.type) === "hybrid",
    [item?.token?.type],
  )

  return (
    <Tr role="group">
      <Td>
        <Flex flexDirection="column" rowGap={1}>
          <TokenV2
            token={{
              ...(token || {}),
              type:
                (item.total?.denom?.startsWith("factory/") && "NATIVE") ||
                (item.total?.denom?.startsWith("ibc/") && "ICS-20") ||
                token?.type ||
                undefined,
              address: token?.address || item.total?.denom || undefined,
            }}
            total={item.total}
            isLoading={isLoading}
            textStyle="875"
            confirmIconPosition="symbol"
            confirmIconProps={{
              backgroundColor: "transparent",
              boxSize: 5,
            }}
            noCopy
            noSymbol
          />
          <TransferTag token={token} total={item.total} isLoading={isLoading} />
        </Flex>
      </Td>
      <Td>
        <TxTypeMethod
          isLoading={isLoading}
          tx_types={[item.type]}
          method={item.method}
        ></TxTypeMethod>
      </Td>

      <Td>
        {_.chain(null)
          .thru(() => {
            if (
              isLoading ||
              !_.chain(item.total).get("token_id").isNil().value()
            ) {
              return (
                <NFTV2
                  isLoading={isLoading}
                  hash={token?.address || ""}
                  src={item?.total?.instance?.metadata?.image}
                  id={item.total.token_id}
                  width="full"
                  float="left"
                />
              )
            }
            return "-"
          })
          .value()}
      </Td>

      <Td>
        <VStack spacing={1} alignItems="stretch" overflow="hidden">
          <TxV2 hash={item.tx_hash} isLoading={isLoading} noCopy />
          {item.timestamp && (
            <SkeletonText
              isLoading={isLoading}
              color="neutral.light.5"
              textStyle="8125"
            >
              {timeAgo}
            </SkeletonText>
          )}
        </VStack>
      </Td>

      <Td>
        <TransferDirection
          isLoading={isLoading}
          from={item.from}
          to={item.to}
          current={hash}
          tx_types={item.type}
          method={item.method}
        ></TransferDirection>
      </Td>

      <Td textAlign="right">
        <CurrencyValue
          value={item.total?.value}
          decimals={item.total?.decimals || 0}
          isLoading={isLoading}
          fallback="-"
          usdProps={{
            color: "neutral.light.7",
          }}
          isHybrid={isHybrid && item.total.value}
        ></CurrencyValue>
      </Td>
    </Tr>
  )
}

export default memo(AddressTransferTableItem, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.item === next.item &&
    prev.hash === next.hash
  )
})
