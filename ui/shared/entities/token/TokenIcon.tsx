import { Image, Skeleton } from "@chakra-ui/react"
import { getIsNFT } from "lib/getOSType"
import { useAsset } from "lib/hooks/useAssets"
import _ from "lodash"
import { memo, useMemo } from "react"
import type { TokenInfo } from "types/api/token"
import type { TokenTotalPayload } from "types/api/tokenTransfer"
import TokenConfirm from "./TokenConfirm"
import type { BaseIconProps, IToken, IconProps } from "./types"

export const BaseIcon = ({
  noIcon,
  token,
  isLoading,
  showConfirm,
  confirmIconProps,
  boxSize = 4,
  asset,
  src: _src,
  ...props
}: BaseIconProps) => {
  const identifier = token?.address || token?.token_denom || undefined

  const isNFT = useMemo(() => getIsNFT(token?.type) === "nft", [token?.type])

  const src = useMemo(
    () =>
      (identifier === "usei" && "/icons/sei.svg") ||
      _src ||
      asset?.image ||
      token?.icon_url ||
      (isNFT && "/icons/nft-placeholder.svg") ||
      "/icons/token-placeholder.svg",
    [asset?.image, identifier, token?.icon_url, isNFT, _src],
  )

  if (noIcon) {
    return <></>
  }

  if (isLoading)
    return (
      <Skeleton boxSize={boxSize} borderRadius="full" flexShrink={0}></Skeleton>
    )

  return (
    <>
      <Image
        boxSize={boxSize}
        flexShrink={0}
        loading="lazy"
        borderRadius="full"
        aria-invalid={
          !src ||
          src === "/icons/token-placeholder.svg" ||
          src === "/icons/nft-placeholder.svg" ||
          undefined
        }
        src={src}
        alt={token?.symbol || token?.name || "token"}
        objectFit="cover"
        borderStyle="solid"
        backgroundColor="neutral.light.2"
        _invalid={{
          borderColor: "neutral.light.4",
          borderWidth: "0.5px",
        }}
        onError={(e) => {
          const currentSrc = e.currentTarget.src
          if (
            currentSrc === "/icons/token-placeholder.svg" ||
            currentSrc === "/icons/nft-placeholder.svg"
          ) {
            return
          }

          if (isNFT) {
            e.currentTarget.src = "/icons/nft-placeholder.svg"
            return
          } else {
            e.currentTarget.src = "/icons/token-placeholder.svg"
            return
          }
        }}
        {...props}
      />

      {showConfirm && (
        <TokenConfirm
          asset={asset}
          isLoading={isLoading}
          {...confirmIconProps}
        />
      )}
    </>
  )
}

export const TokenIcon = ({
  noIcon,
  token: _token,
  isLoading,
  total,
  showConfirm,
  ...props
}: IconProps & {
  total?: TokenTotalPayload
}) => {
  const { token, identifier } = useMemo(() => {
    const token = _.chain({ ...(_token || {}) } as IToken)
      .tap((item) => {
        if (item?.address === "usei" || total?.denom === "usei") {
          item["token_denom"] = "usei"
          return
        }
        if (
          item?.address?.startsWith("ibc/") ||
          item?.address?.startsWith("factory/")
        ) {
          item["token_denom"] = item.address
          return
        }
        if (
          total?.denom?.startsWith("ibc/") ||
          total?.denom?.startsWith("factory/")
        ) {
          item["token_denom"] = total.denom
        }
      })
      .value() as TokenInfo

    const identifier = token?.address || token?.token_denom || undefined

    return { token, identifier }
  }, [_token, total])

  const asset = useAsset(identifier)

  return (
    <BaseIcon
      token={token}
      isLoading={isLoading}
      asset={asset}
      noIcon={noIcon}
      showConfirm={showConfirm}
      {...props}
    />
  )
}

export default memo(TokenIcon)
