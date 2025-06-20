import type { ImageProps } from "@chakra-ui/react"
import { Image, Skeleton } from "@chakra-ui/react"
import { useAsset } from "lib/hooks/useAssets"
import { memo, useMemo } from "react"

type IconProps = {
  address?: string | null
  token_denom?: string | null
  isLoading?: boolean
  noIcon?: boolean
} & Partial<ImageProps>

const Icon = ({
  noIcon,
  address,
  token_denom,
  isLoading,
  boxSize = "2.5rem",
  ...props
}: IconProps) => {
  const identifier = useMemo(
    () => address || token_denom || undefined,
    [address, token_denom],
  )

  const asset = useAsset(identifier)

  const src = useMemo(
    () =>
      (identifier === "usei" && "/icons/sei.svg") ||
      asset?.image ||
      "/icons/nft-placeholder.svg",
    [asset?.image, identifier],
  )

  if (noIcon) {
    return <></>
  }

  if (isLoading)
    return (
      <Skeleton
        boxSize={boxSize}
        borderRadius={1}
        flexShrink={0}
        {...props}
      ></Skeleton>
    )

  return (
    <>
      <Image
        boxSize={boxSize}
        flexShrink={0}
        loading="lazy"
        borderRadius={1}
        aria-invalid={!src || src === "/icons/nft-placeholder.svg" || undefined}
        src={src}
        alt={identifier}
        objectFit="cover"
        borderStyle="solid"
        backgroundColor="neutral.light.2"
        _invalid={{
          borderColor: "neutral.light.4",
          borderWidth: "0.5px",
        }}
        onError={(e) => {
          const currentSrc = e.currentTarget.src
          if (currentSrc === "/icons/nft-placeholder.svg") {
            return
          }

          e.currentTarget.src = "/icons/nft-placeholder.svg"
          return
        }}
        {...props}
      />
    </>
  )
}

export const CollectionIcon = memo(Icon)
export type CollectionIconProps = IconProps
