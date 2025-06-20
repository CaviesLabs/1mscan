import type { StackProps } from "@chakra-ui/react"
import { HStack, Skeleton, Text, VStack } from "@chakra-ui/react"
import IconSvg from "ui/shared/IconSvg"
import type { Props as IconSvgProps } from "ui/shared/IconSvg"

type Props = {
  title: string
  value: string
  isLoading?: boolean
} & Partial<StackProps> &
  IconSvgProps

const BinraryItem = ({
  src,
  title,
  value,
  isLoading,
  alt,
  name,
  ...props
}: Props) => {
  return (
    <HStack alignItems="flex-start" gap={3} {...props}>
      <IconSvg
        isLoading={isLoading}
        alt={alt}
        src={src as any}
        name={name as any}
        boxSize={6}
        overflow="hidden"
        borderRadius="full"
        backgroundColor="neutral.light.3"
        color="neutral.light.6"
      ></IconSvg>
      <VStack alignItems="flex-start" gap={2}>
        <Skeleton isLoaded={!isLoading}>
          <Text color="neutral.light.8" textStyle="1">
            {title}
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!isLoading}>
          <Text color="neutral.light.8" textStyle="1125500">
            {value}
          </Text>
        </Skeleton>
      </VStack>
    </HStack>
  )
}

export default BinraryItem
