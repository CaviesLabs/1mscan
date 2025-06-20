import { HStack, Skeleton, Text } from "@chakra-ui/react"
import useTimeAgoIncrement from "lib/hooks/useTimeAgoIncrement"
import { memo } from "react"
import IconSvg from "ui/shared/IconSvg"

type Props = {
  verified_at?: string | null
  isLoading?: boolean
}

const CodeIDVerified = ({ verified_at, isLoading }: Props) => {
  const timeAgo = useTimeAgoIncrement(verified_at)
  if (!verified_at) return <>-</>
  return (
    <HStack spacing={1}>
      <IconSvg name="success" isLoading={isLoading} boxSize={4}></IconSvg>
      <Skeleton isLoaded={!isLoading}>
        <Text textStyle="875" color="neutral.light.6">
          {timeAgo}
        </Text>
      </Skeleton>
    </HStack>
  )
}

export default memo(CodeIDVerified, (prev, next) => {
  return (
    prev.isLoading === next.isLoading && prev.verified_at === next.verified_at
  )
})
