import { Skeleton } from "@chakra-ui/react"
import { FT_TOKEN_TYPE_IDS, NFT_TOKEN_TYPE_IDS } from "lib/token/tokenTypes"

import type { IconSvgProps } from "ui/shared/IconSvg"
import IconSvg from "ui/shared/IconSvg"

const NFT_TYPES = [
  ...NFT_TOKEN_TYPE_IDS,
  ...NFT_TOKEN_TYPE_IDS.map((x) => x.toLowerCase()),
  "nft",
] as const
const FT_TYPES = [
  ...FT_TOKEN_TYPE_IDS,
  ...FT_TOKEN_TYPE_IDS.map((x) => x.toLowerCase()),
  "ICS20",
  "ics20",
  "ft",
] as const

export const TokenLogoPlaceholder = ({
  type,
  isLoading,
  ...props
}: {
  type?:
    | (typeof NFT_TYPES)[number]
    | (typeof FT_TYPES)[number]
    | Lowercase<(typeof NFT_TYPES)[number]>
    | Lowercase<(typeof FT_TYPES)[number]>
} & Partial<IconSvgProps>) => {
  if (isLoading) {
    ;<Skeleton isLoaded={!isLoading} {...props} />
  }

  return (
    <IconSvg
      backgroundColor="neutral.light.2"
      borderColor="neutral.light.4"
      borderWidth="0.5px"
      color="neutral.light.7"
      borderRadius="full"
      src={
        (NFT_TYPES.find((x) => x === type?.toLocaleLowerCase()) &&
          "/icons/nft-placeholder.svg") ||
        "/icons/token-placeholder.svg"
      }
      boxSize={4}
      flexShrink={0}
      transitionProperty="background-color,color"
      transitionDuration="normal"
      transitionTimingFunction="ease"
      {...props}
    />
  )
}

export default TokenLogoPlaceholder
