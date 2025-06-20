import { Skeleton, chakra } from "@chakra-ui/react"

import { useTokenInstanceMetadataContext } from "../TokenInstanceMetadataProvider"
import { formatName } from "./utils"

interface Props {
  name: string
  className?: string
}

const MetadataAccordionItemTitle = ({ name, className }: Props) => {
  const { isLoading } = useTokenInstanceMetadataContext()
  return (
    <Skeleton
      isLoaded={!isLoading}
      width="7.5rem"
      flexShrink={0}
      textStyle="1"
      color="neutral.light.7"
      wordBreak="break-word"
      className={className}
    >
      <span>{formatName(name)}</span>
    </Skeleton>
  )
}

export default chakra(MetadataAccordionItemTitle)
