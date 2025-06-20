import { Flex, type FlexProps, Image, Skeleton } from "@chakra-ui/react"
import { memo, useMemo } from "react"
import type { TokenTypeWithTransfer } from "types/api/token"

type Props = {
  type: TokenTypeWithTransfer | "usei" | undefined | null
  src?: string | null | undefined
  isLoading?: boolean
} & FlexProps

const TokenIconPlaceholder = ({
  src: _src,
  type,
  isLoading,
  ...props
}: Props) => {
  const category = useMemo(() => {
    if (isLoading) {
      return "loading"
    }
    const lcType = type?.toLowerCase()
    if (
      lcType === "erc-20" ||
      lcType === "cw-20" ||
      lcType === "ics-20" ||
      lcType === "native" ||
      lcType === "coin_transfer" ||
      lcType === "erc-404"
    ) {
      return "token"
    }
    if (lcType === "cw-721" || lcType === "erc-721" || lcType === "erc-1155") {
      return "nft"
    }
    if (lcType === "usei") {
      return "usei"
    }
    return ""
  }, [type, isLoading])

  const placeholder = useMemo(() => {
    if (!category) return ""
    if (category === "loading") return "/icons/loading-placeholder.svg"
    if (category === "usei") return "/icons/loading-placeholder.svg"
    return `/icons/${category}-placeholder.svg`
  }, [category])

  const src = useMemo(() => {
    if (type === "usei") {
      return "/icons/sei.svg"
    }
    if (!_src) {
      return placeholder
    }
    return _src
  }, [_src, type, placeholder])

  if (isLoading) {
    return (
      <Flex
        alignItems="stretch"
        justifyContent="stretch"
        boxSize={4}
        borderRadius="full"
        overflow="hidden"
        flexShrink={0}
        backgroundColor="neutral.light.1"
        {...props}
      >
        <Skeleton width="full" height="full"></Skeleton>
      </Flex>
    )
  }

  return (
    <Image
      src={src}
      boxSize={4}
      flexShrink={0}
      borderRadius="full"
      overflow="hidden"
      borderColor="neutral.light.3"
      objectFit="cover"
      borderWidth={!src ? "1px" : undefined}
      onError={(e) => {
        if (e.currentTarget.src === placeholder) {
          e.currentTarget.style.setProperty("border-width", "1px")
          return
        }
        e.currentTarget.src = placeholder
        e.currentTarget.style.setProperty("border-width", "1px")
      }}
      {...props}
    />
  )
}

export type ITokenIconProps = Partial<Props>

export default memo(TokenIconPlaceholder, (prev, next) => {
  return (
    prev.src === next.src &&
    prev.type === next.type &&
    prev.isLoading === next.isLoading
  )
})
