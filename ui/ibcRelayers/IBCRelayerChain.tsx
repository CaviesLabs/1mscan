import type { StackProps } from "@chakra-ui/react"
import { Flex, HStack, Skeleton, Text } from "@chakra-ui/react"
import { memo } from "react"
import { Icon } from "ui/shared/entities/address/AddressEntityV2"
import { TruncatedTextTail } from "ui/shared/truncate"

type Props = {
  isLoading?: boolean
  label: any
  value: any
  image_url?: string | null
  chain?: string
} & StackProps

const IBCRelayerChain = ({
  label,
  value,
  isLoading,
  image_url,
  chain,
  ...props
}: Props) => {
  return (
    <HStack
      spacing={3}
      flexShrink={0}
      borderRadius="0.375rem"
      borderWidth="1px"
      backgroundColor="neutral.light.2"
      borderColor="neutral.light.1"
      boxShadow="0px -4px 12px 0px rgba(0, 0, 0, 0.04), 0px 8px 16px 0px rgba(0, 0, 0, 0.10)"
      paddingY={3}
      paddingX="0.88rem"
      width={{ base: "full", lg: "21.59375rem" }}
      {...props}
    >
      <Icon
        isLoading={isLoading}
        boxSize="3rem"
        address={{ hash: chain || "", image_url: image_url }}
      ></Icon>

      <Flex flexDirection="column" gap="0.1rem" flex={1} overflow="hidden">
        {label && (
          <Skeleton isLoaded={!isLoading}>
            <Text color="neutral.light.8" textStyle="125">
              {label}
            </Text>
          </Skeleton>
        )}

        <Skeleton isLoaded={!isLoading} overflow="hidden">
          <TruncatedTextTail
            label={value}
            color="neutral.light.8"
            textStyle="1"
            // noOfLines={1}
            isTruncated
          >
            {value}
          </TruncatedTextTail>
        </Skeleton>
      </Flex>
    </HStack>
  )
}

export default memo(IBCRelayerChain, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.value === next.value &&
    prev.label === next.label &&
    prev.image_url === next.image_url &&
    prev.chain === next.chain
  )
})
