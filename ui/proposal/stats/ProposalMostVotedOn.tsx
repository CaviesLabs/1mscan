import { Box, HStack, Skeleton, Text } from "@chakra-ui/react"
import { useMemo } from "react"
import {
  CATEGORY_COLORS,
  type ICalculatedIndicators,
  type ICategory,
  getPercentage,
} from "../utils"

type Props = {
  isLoading: boolean
  highlight: ICategory | undefined
  calculated: ICalculatedIndicators
}

const ProposalMostVotedOn = ({ isLoading, highlight, calculated }: Props) => {
  const { percentage, isSmall } = useMemo(() => {
    return getPercentage({ category: highlight, calculated: calculated })
  }, [calculated, highlight])

  return (
    <HStack spacing={2}>
      <Skeleton isLoaded={!isLoading}>
        <Box
          borderRadius="0.1875rem"
          width="1.25rem"
          height="0.75rem"
          backgroundColor={CATEGORY_COLORS[highlight!]}
        ></Box>
      </Skeleton>
      <Skeleton isLoaded={!isLoading}>
        <Text textStyle="1" color={`${CATEGORY_COLORS[highlight!]}.text`}>
          {(highlight || "").replace("no_with_", "").capitalizeFirstLetter()}
        </Text>
      </Skeleton>
      <Skeleton isLoaded={!isLoading}>
        <Text textStyle="1500" color="neutral.light.8">
          {isSmall ? "< " : ""}
          {percentage.toFormat(2)}%
        </Text>
      </Skeleton>
    </HStack>
  )
}

export default ProposalMostVotedOn
