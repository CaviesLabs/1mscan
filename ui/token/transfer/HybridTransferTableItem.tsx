import { Flex, Td, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { getIsNFT } from "lib/getOSType"
import { default as useTimeAgoIncrement } from "lib/hooks/useTimeAgoIncrement"
import { memo, useMemo } from "react"
import type { TokenInfo } from "types/api/token"
import type { TokenTransferPayload } from "types/api/tokenTransfer"
import CurrencyValue from "ui/shared/CurrencyValue"
import FromTo from "ui/shared/FromTo"
import AddressV2 from "ui/shared/entities/address/AddressEntityV2"
import NFTV2 from "ui/shared/entities/nft/NFTEntityV2"
import TxV2 from "ui/shared/entities/tx/TxEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"
import TxTypeMethod from "ui/txs/TxTypeMethod"

type Props = {
  isLoading?: boolean
  token: TokenInfo | undefined
  item: TokenTransferPayload
  showTokenID?: boolean
  showQuantity?: boolean
}

const HybridTransferTableItem = ({
  item,
  isLoading,
  token,
  showTokenID,
  showQuantity,
}: Props) => {
  const timeAgo = useTimeAgoIncrement(item.timestamp)

  const isMint = useMemo(
    () =>
      item.type === "mint" ||
      item.type === "token_minting" ||
      item.method === "mint",
    [item.type, item.method],
  )

  const isHybrid = useMemo(
    () => getIsNFT(token?.type) === "hybrid",
    [token?.type],
  )

  return (
    <Tr role="group">
      <Td>
        <Flex flexDirection="column" rowGap={1}>
          <TxV2 hash={item.tx_hash} isLoading={isLoading} />
          {item.timestamp && (
            <SkeletonText
              textStyle="8125"
              color="neutral.light.5"
              isLoading={isLoading}
            >
              {timeAgo}
            </SkeletonText>
          )}
        </Flex>
      </Td>
      <Td>
        <TxTypeMethod
          isLoading={isLoading}
          tx_types={item.type}
          method={item.method}
        ></TxTypeMethod>
      </Td>
      <Td>
        {item.from && (
          <AddressV2
            address={
              isMint
                ? {
                    hash: "",
                    name: getLanguage("token.minted"),
                  }
                : item.from
            }
            isLoading={isLoading}
            textStyle="875"
            noIcon={isMint}
            noLink={isMint}
          />
        )}
      </Td>
      <Td>
        {item.to && (
          <Flex alignItems="center" gap={3}>
            <FromTo direction="right" isLoading={isLoading}></FromTo>
            <AddressV2
              address={item.to}
              isLoading={isLoading}
              textStyle="875"
              showWarning="burn"
            />
          </Flex>
        )}
      </Td>

      {/* items */}
      {showTokenID && (
        <Td textAlign="left">
          <NFTV2
            isLoading={isLoading}
            hash={token?.address}
            src={item.total?.instance?.metadata?.image}
            id={item.total?.token_id}
            fallback="-"
            width="max-content"
            float="left"
          />
        </Td>
      )}

      {showQuantity && (
        <Td textAlign="right">
          <CurrencyValue
            // @ts-ignore
            value={item.total?.value}
            decimals={token?.decimals || 0}
            fallback="-"
            isLoading={isLoading}
            isHybrid={isHybrid && item.total.token_id}
          ></CurrencyValue>
        </Td>
      )}
    </Tr>
  )
}

export default memo(HybridTransferTableItem, (prev, next) => {
  return (
    prev.item === next.item &&
    prev.isLoading === next.isLoading &&
    prev.token === next.token &&
    prev.showTokenID === next.showTokenID &&
    prev.showQuantity === next.showQuantity
  )
})
