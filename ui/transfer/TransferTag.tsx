import { memo, useMemo } from "react"
import type { TokenInfo } from "types/api/token"
import type { TokenTotalPayload } from "types/api/tokenTransfer"
import Tag, { type TagProps } from "ui/shared/chakra/Tag"

type Props = {
  token: TokenInfo | Empty
  total: Partial<TokenTotalPayload> | Empty
  isLoading?: boolean
} & Partial<Omit<TagProps, "children">>

const TransferTag = ({ token, total, isLoading, ...props }: Props) => {
  const title = useMemo(() => {
    if (total?.denom?.startsWith("ibc/")) {
      return "IBC Token"
    }
    if (total?.denom?.startsWith("factory/")) {
      return "Factory Token"
    }
    if (
      total?.denom === "usei" ||
      token?.base_denom === "usei" ||
      token?.token_denom === "usei"
    ) {
      return "Native coin"
    }
    return token?.type || "Unknown Type"
  }, [token, total])

  return (
    <Tag isLoading={isLoading} {...props}>
      {title}
    </Tag>
  )
}

export default memo(TransferTag, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.token === next.token &&
    prev.total === next.total
  )
})
