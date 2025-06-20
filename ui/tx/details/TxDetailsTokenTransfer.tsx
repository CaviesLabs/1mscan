import { HStack } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { getIsNFT } from "lib/getOSType"
import { memo, useMemo } from "react"
import type { TokenTransfer as TTokenTransfer } from "types/api/tokenTransfer"
import CurrencyValue from "ui/shared/CurrencyValue"
import IconSvg from "ui/shared/IconSvg"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import NFTEntityV2 from "ui/shared/entities/nft/NFTEntityV2"
import TokenEntityV2 from "ui/shared/entities/token/TokenEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"

interface Props {
  data: TTokenTransfer
  isLoading?: boolean
}

const TxDetailsTokenTransfer = ({ data, isLoading }: Props) => {
  const tokenCategory = useMemo(() => getIsNFT(data.token?.type), [data])

  return (
    <HStack flexWrap="wrap" columnGap={4} rowGap={0} flex={1} overflow="hidden">
      <HStack columnGap={4} rowGap={0} flexWrap="wrap" overflow="hidden">
        <AddressEntityV2
          isLoading={isLoading}
          address={
            data.type === "mint" || data.type === "token_minting"
              ? {
                  hash: "",
                  name: getLanguage(
                    "transaction_details_page.evm_details.details_tab_content.minted",
                  ),
                }
              : data.from
          }
          noIcon
          flexShrink={0}
          truncation="constant"
          headLength={3}
          tailLength={4}
          textStyle="1"
          hashProps={{
            width: {
              base: "calc((100% - 3rem) / 2)",
              lg: "unset",
            },
          }}
          maxWidth={{
            base: "max-content",
            lg: "unset",
          }}
        />
        <IconSvg
          isLoading={isLoading}
          name="arrows/east"
          boxSize={5}
          flexShrink={0}
          color="neutral.light.5"
        />
        <AddressEntityV2
          isLoading={isLoading}
          address={data.to}
          noIcon
          flexShrink={0}
          truncation="constant"
          headLength={3}
          tailLength={4}
          textStyle="1"
          hashProps={{
            width: {
              base: "calc((100% - 3rem) / 2)",
              lg: "unset",
            },
          }}
          maxWidth={{
            base: "max-content",
            lg: "unset",
          }}
        />
      </HStack>

      <HStack columnGap={4} rowGap={0} flexWrap="wrap" overflow="hidden">
        <SkeletonText flexShrink={0} isLoading={isLoading}>
          {getLanguage(
            "transaction_details_page.evm_details.details_tab_content.for",
          )}
        </SkeletonText>
        <CurrencyValue
          isLoading={isLoading}
          value={
            data.token?.type === "ERC-721" || data.token?.type === "CW-721"
              ? 1
              : data.total.value
          }
          decimals={
            data.token?.type === "ERC-721" || data.token?.type === "CW-721"
              ? 0
              : data.token?.decimals || data.total?.decimals || 0
          }
          textStyle="1"
          color="neutral.light.7"
          isTruncated
          usdHasParenthesis
          usdProps={{
            textStyle: "1",
          }}
          autoPrice={
            data.token?.address || data.token?.token_denom || data.total?.denom
          }
          isHybrid={tokenCategory === "hybrid" && data.total.token_id}
        />
        {tokenCategory === "nft" && (
          <>
            <span>
              {getLanguage(
                "transaction_details_page.evm_details.details_tab_content.item",
              )}
            </span>
            <NFTEntityV2
              isLoading={isLoading}
              id={data.total.token_id}
              textStyle="1"
              hash={data.token?.address}
              src={data?.total.instance?.metadata?.image}
            />
            <SkeletonText textStyle="1" isLoading={isLoading}>
              {getLanguage(
                "transaction_details_page.evm_details.details_tab_content.of",
              )}
            </SkeletonText>
          </>
        )}

        <TokenEntityV2
          isLoading={isLoading}
          token={{
            ...data.token,
            address: data.token?.address || data.total?.denom,
          }}
          total={data.total}
          noCopy
          noSymbol
          textStyle="1"
          confirmIconProps={{
            boxSize: 5,
          }}
        />
      </HStack>
    </HStack>
  )
}

export default memo(TxDetailsTokenTransfer, (prev, next) => {
  return prev.data === next.data && prev.isLoading === next.isLoading
})
