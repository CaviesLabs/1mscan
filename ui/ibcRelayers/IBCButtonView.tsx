import type { SkeletonProps } from "@chakra-ui/react"
import { Button, Skeleton } from "@chakra-ui/react"
import { setRouter } from "lib/router/setQuery"
import { memo } from "react"

type Props = {
  isLoading?: boolean
  channel_id: string
  counterparty_channel_id: string
} & Partial<SkeletonProps>

const IBCButtonView = ({
  counterparty_channel_id,
  channel_id,
  isLoading,
  ...props
}: Props) => {
  return (
    <Skeleton isLoaded={!isLoading} {...props}>
      <Button
        variant="tertiary"
        onClick={() => {
          setRouter(
            "/ibc-relayer/[channel_id]/counterparty/[counterparty_channel_id]",
            {
              channel_id: channel_id,
              counterparty_channel_id: counterparty_channel_id,
            },
            {
              cleanQuery: true,
            },
          )
        }}
      >
        View
      </Button>
    </Skeleton>
  )
}

export default memo(IBCButtonView, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.channel_id === next.channel_id &&
    prev.counterparty_channel_id === next.counterparty_channel_id
  )
})
