import { HStack } from "@chakra-ui/react"
import { memo } from "react"
import { durationStringToFormat } from "ui/pages/utilities/Duration"
import IconSvg from "ui/shared/IconSvg"
import Tag from "ui/shared/chakra/Tag"
import type { ICalculatedIndicators } from "../utils"

type Props = {
  isLoading?: boolean
  calculated?: ICalculatedIndicators
}

const ProposalIsExpeditedTag = ({ isLoading, calculated }: Props) => {
  return (
    <Tag
      colorScheme="gray"
      isLoading={isLoading}
      display="inline-flex"
      alignItems="center"
      maxWidth="unset"
      width="max-content"
      gap={1}
      flexShrink={0}
      isTruncated={Boolean(calculated)}
      hasTooltip={Boolean(calculated)}
      tooltipLabel={
        calculated
          ? `An expedited governance proposal is required to pass a quorum of ${calculated.expedited_quorum?.times(100).toFormat(2)}% and a high threshold of ${calculated.expedited_threshold?.times(100).toFormat(2)}% within ${durationStringToFormat(calculated.expedited_voting_period)} voting period in order to pass`
          : undefined
      }
    >
      <HStack>
        <IconSvg name="alarm" boxSize={4} color="neutral.light.6"></IconSvg>
        <span>Expedited</span>
      </HStack>
    </Tag>
  )
}

export default memo(ProposalIsExpeditedTag, (prev, next) => {
  return (
    prev.isLoading === next.isLoading && prev.calculated === next.calculated
  )
})
