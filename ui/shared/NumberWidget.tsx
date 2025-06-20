import { Box, Flex, HStack, Skeleton, Text } from "@chakra-ui/react"
import { type ReactNode, memo } from "react"
import Hint from "ui/shared/Hint"
import SkeletonText from "./text/SkeletonText"
import TruncatedTextTooltip from "./truncate/TruncatedTextTooltip"

type Props = {
  label: string
  description?: string
  value: ReactNode
  isLoading?: boolean
  index: number
  valueLabel?: string
  noTooltip?: boolean
}

const NumberWidget = ({
  label,
  value,
  isLoading,
  description,
  valueLabel,
  noTooltip,
}: Props) => {
  return (
    <Flex
      flex={1}
      alignItems="flex-start"
      backgroundColor="neutral.light.1"
      px={3}
      py={{ base: 2, lg: 3 }}
      borderRadius={12}
      justifyContent="space-between"
      columnGap={3}
      position="relative"
      borderWidth="1px"
      borderColor="neutral.light.3"
      boxShadow="0px 12px 36px -4px rgba(0, 0, 0, 0.04)"
    >
      <Box
        position="absolute"
        top={0}
        left={5}
        width={"1.5rem"}
        height={"0.125rem"}
        borderBottomEndRadius={2}
        borderBottomStartRadius={2}
        backgroundColor="secondary.03"
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1), 0px 1px 2px secondary.03"
      ></Box>
      <Flex flexDirection="column" alignItems="flex-start" gap={1} flex={1}>
        <HStack spacing={2}>
          <SkeletonText
            isLoading={isLoading}
            color="neutral.light.7"
            textStyle="8125"
          >
            {label}
          </SkeletonText>
          {description && (
            <Hint label={description} boxSize={4} isLoading={isLoading} />
          )}
        </HStack>

        <Skeleton
          isLoaded={!isLoading}
          fontWeight={400}
          fontSize="lg"
          color="secondary.03.text"
        >
          <TruncatedTextTooltip
            highPriorityIsTruncated
            defaultIsTruncated
            label={valueLabel ?? value}
            isDisabled={noTooltip}
          >
            <Text
              as="span"
              fontSize="1.125rem"
              fontWeight={400}
              color="secondary.03.text"
              lineHeight="1.75rem"
              display="flex"
              alignItems="center"
              noOfLines={1}
            >
              {value}
            </Text>
          </TruncatedTextTooltip>
        </Skeleton>
      </Flex>
    </Flex>
  )
}

export default memo(NumberWidget, (prev, next) => {
  return (
    prev.label === next.label &&
    prev.value === next.value &&
    prev.description === next.description &&
    prev.isLoading === next.isLoading &&
    prev.index === next.index &&
    prev.valueLabel === next.valueLabel &&
    prev.noTooltip === next.noTooltip
  )
})
