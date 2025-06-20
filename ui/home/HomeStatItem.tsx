import { Flex, HStack, Stack, Text } from "@chakra-ui/react"
import type { ChakraProps } from "@chakra-ui/system"
import { type ReactNode, memo } from "react"
import Hint from "ui/shared/Hint"
import type { IconName } from "ui/shared/IconSvg"
import IconSvg from "ui/shared/IconSvg"
import SkeletonText from "ui/shared/text/SkeletonText"

type Props = {
  icon: IconName
  title: ReactNode
  value: ReactNode
  isLoading?: boolean
  moreInfoTitle?: ReactNode
  moreInfoValue?: ReactNode
  moreInfoHint?: ReactNode
  colorScheme: ChakraProps["color"]
  hint?: ReactNode
}

const HomeStatItem = ({
  icon,
  title,
  value,
  isLoading,
  moreInfoTitle,
  moreInfoValue,
  colorScheme,
  moreInfoHint,
  hint,
}: Props) => {
  return (
    <Flex
      flexDirection={{
        base: "column",
        lg: "row",
        "2lg": "column",
        xl: "row",
      }}
      alignItems={{
        base: "stretch",
        lg: "center",
        "2lg": "stretch",
        xl: "center",
      }}
      gap={{
        base: 2,
        lg: 8,
        "2lg": 2,
        xl: 3,
      }}
      flexWrap="wrap"
    >
      <IconSvg
        boxShadow="primary"
        name={icon}
        boxSize="2.5rem"
        isLoading={isLoading}
        backgroundColor={colorScheme}
        color="neutral.light.1"
        padding={2}
        borderRadius="full"
        flexShrink={0}
      />
      <Stack gap="1px" flex={1} flexShrink={0}>
        <HStack justifyContent="space-between">
          <HStack gap={1}>
            <SkeletonText
              isLoading={isLoading}
              textStyle="875"
              color="neutral.light.6"
            >
              {title}
            </SkeletonText>
            {hint && <Hint boxSize={4} label={hint} />}
          </HStack>

          <HStack gap={1}>
            <Text textStyle="875" color="neutral.light.6">
              {moreInfoTitle}
            </Text>
            {moreInfoHint && <Hint boxSize={4} label={moreInfoHint} />}
          </HStack>
        </HStack>
        <HStack justifyContent="space-between">
          <SkeletonText
            isLoading={isLoading}
            textStyle="125"
            color="neutral.light.7"
          >
            {value}
          </SkeletonText>
          {moreInfoValue && (
            <SkeletonText
              isLoading={isLoading}
              textStyle="87500"
              color="neutral.light.7"
            >
              {moreInfoValue}
            </SkeletonText>
          )}
        </HStack>
      </Stack>
    </Flex>
  )
}
export default memo(HomeStatItem, (prev, next) => {
  return (
    prev.icon === next.icon &&
    prev.title === next.title &&
    prev.value === next.value &&
    prev.hint === next.hint &&
    prev.isLoading === next.isLoading &&
    prev.moreInfoTitle === next.moreInfoTitle &&
    prev.moreInfoValue === next.moreInfoValue &&
    prev.moreInfoHint === next.moreInfoHint
  )
})
