import { Td, Tr } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import _ from "lodash"
import { memo } from "react"
import type { TokenHolder20And721, TokenInfo } from "types/api/token"
import CurrencyValue from "ui/shared/CurrencyValue"
import Utilization from "ui/shared/Utilization/Utilization"
import AddressV2 from "ui/shared/entities/address/AddressEntityV2"

type Props = {
  item: TokenHolder20And721
  token: TokenInfo | undefined
  isLoading?: boolean
  isHybrid?: boolean
}

const HolderTokenTableItem = ({ item, token, isLoading, isHybrid }: Props) => {
  return (
    <Tr role="group">
      <Td>
        <AddressV2 address={item.address} isLoading={isLoading} />
      </Td>
      <Td textAlign="right">
        {_.chain(
          BigNumber(item.value).div(BigNumber(10).pow(token?.decimals || 0)),
        )
          .thru((value) => {
            return (
              <>
                <CurrencyValue
                  value={value}
                  decimals={0}
                  isLoading={isLoading}
                />{" "}
                {/**
                 *  Only for 404 token
                 */}
                {isHybrid &&
                  _.chain(value.dp(0, BigNumber.ROUND_DOWN))
                    .thru((nfts) => (
                      <CurrencyValue
                        value={nfts}
                        decimals={0}
                        isLoading={isLoading}
                        currency={`NFT${(!nfts.eq(1) && "s") || ""}`}
                        hasParenthesis
                      />
                    ))
                    .value()}
              </>
            )
          })
          .value()}
      </Td>
      <Td textAlign="right">
        <Utilization
          value={BigNumber(item.value).div(BigNumber(token?.total_supply!))}
          colorScheme="green"
          isLoading={isLoading}
        />
      </Td>

      <Td textAlign="right">
        <CurrencyValue
          value={item.value}
          decimals={token?.decimals}
          hideValue
          usdProps={{
            color: "neutral.light.7",
          }}
          fallbackUsd
          isLoading={isLoading}
          autoPrice={token?.address || token?.token_denom}
        />
      </Td>
    </Tr>
  )
}

export default memo(HolderTokenTableItem, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.item.address === next.item.address &&
    prev.item.value === next.item.value &&
    prev.token === next.token
  )
})
