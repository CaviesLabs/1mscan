import { memo, useMemo } from "react"
import SkeletonText from "../text/SkeletonText"
import type { IInfinityPagination } from "./types"

type Props = {
  pagination: IInfinityPagination
}

const InfitityPagination = ({ pagination }: Props) => {
  const { formated, isAvailable, postfix } = useMemo(() => {
    const valueNB = Number(pagination.total)
    if (Number.isNaN(valueNB) || valueNB < 0) {
      return {
        total: undefined,
        formated: undefined,
        isAvailable: false,
        postfix: "s",
      }
    }
    return {
      total: valueNB,
      formated: valueNB.toLocaleString("en-US"),
      isAvailable: true,
      postfix: valueNB !== 1 ? "s" : "",
    }
  }, [pagination.total])

  if (!isAvailable) return null

  return (
    <SkeletonText
      flexShrink={0}
      whiteSpace="nowrap"
      wordBreak="keep-all"
      isLoading={pagination.isLoading}
    >
      {`Total ${formated} item${postfix} found`}
    </SkeletonText>
  )
}

export default memo(InfitityPagination, (prev, next) => {
  return prev.pagination === next.pagination
})
