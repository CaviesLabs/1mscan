import { last } from "lodash"
import { memo } from "react"
import Tag from "ui/shared/chakra/Tag"

type Props = {
  isLoading?: boolean
  type: string
}

const ProposalTypeTag = ({ isLoading, type }: Props) => {
  return (
    <Tag
      colorScheme="gray"
      isLoading={isLoading}
      isTruncated
      tooltipLabel={type}
      hasTooltip
      overflow="hidden"
    >
      {last(type.split("."))}
    </Tag>
  )
}

export default memo(ProposalTypeTag, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.type === next.type
})
