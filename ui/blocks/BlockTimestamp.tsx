import useTimeAgoIncrement from "lib/hooks/useTimeAgoIncrement"
import { memo } from "react"
import SkeletonText from "ui/shared/text/SkeletonText"

interface Props {
  ts: string | null
  isLoading?: boolean
}

const BlockTimestamp = ({ ts, isLoading }: Props) => {
  const timeAgo = useTimeAgoIncrement(ts, true)

  return (
    <SkeletonText
      isLoading={isLoading}
      color="neutral.light.6"
      textStyle="8125"
    >
      {timeAgo}
    </SkeletonText>
  )
}

export default memo(BlockTimestamp, (prev, next) => {
  return prev.ts === next.ts && prev.isLoading === next.isLoading
})
