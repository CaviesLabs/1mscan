import { Flex, Td, Tr } from "@chakra-ui/react"
import { getIsNFT } from "lib/getOSType"
import _ from "lodash"
import { memo, useMemo } from "react"
import type { TokenTransfer } from "types/api/tokenTransfer"
import CurrencyValue from "ui/shared/CurrencyValue"
import TokenV2 from "ui/shared/entities/token/TokenEntityV2"
import TransferDirection from "ui/shared/transfer/TransferDirection"
import TransferTag from "ui/transfer/TransferTag"
import TxTypeMethod from "ui/txs/TxTypeMethod"
import NFTEntityV2 from "../entities/nft/NFTEntityV2"

type Props = {
  isLoading?: boolean
  item: TokenTransfer
}

const TxTransferTableItem = ({ item, isLoading }: Props) => {
  const token = item.token

  const isHybrid = useMemo(
    () => getIsNFT(token?.type) === "hybrid",
    [token?.type],
  )

  return (
    <Tr role="group">
      <Td>
        <Flex flexDirection="column" rowGap={1}>
          <TokenV2
            token={{
              ...token,
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
                <NFTEntityV2
                  isLoading={isLoading}
                  hash={token?.address || ""}
                  id={item.total.token_id}
                  width="max-content"
                  float="left"
                  src={item.total.instance?.metadata?.image}
                />
              )
            }
            return "-"
          })
          .value()}
      </Td>

      <Td>
        <TransferDirection
          isLoading={isLoading}
          from={item.from}
          to={item.to}
          tx_types={item.type}
          method={item.method}
          direction="down"
        ></TransferDirection>
      </Td>

      <Td textAlign="right">
        <CurrencyValue
          value={item.total?.value}
          decimals={item.total?.decimals || 0}
          isLoading={isLoading}
          fallback="-"
          isHybrid={isHybrid && item.total.token_id}
        ></CurrencyValue>
      </Td>
    </Tr>
  )
}

export default memo(TxTransferTableItem, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.item === next.item
})
