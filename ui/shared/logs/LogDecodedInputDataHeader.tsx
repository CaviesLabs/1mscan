import { Divider, Flex, Skeleton, Text, VStack } from "@chakra-ui/react"
import React from "react"

interface Props {
  methodId: string
  methodCall: string
  isLoading?: boolean
}

const Item = ({
  label,
  text,
  isLoading,
}: {
  label: string
  text: string
  isLoading?: boolean
}) => {
  return (
    <Flex
      columnGap={5}
      rowGap={2}
      px={{ base: 0, lg: 4 }}
      flexDir={{ base: "column", lg: "row" }}
      alignItems="flex-start"
    >
      <Skeleton
        w={{ base: "auto", lg: "80px" }}
        flexShrink={0}
        isLoaded={!isLoading}
      >
        <Text variant="light7" fontWeight={500}>
          {label}
        </Text>
      </Skeleton>
      <Skeleton isLoaded={!isLoading}>
        <Text
          fontSize="0.875rem"
          fontWeight={400}
          lineHeight="1.25rem"
          color="neutral.light.6"
          whiteSpace="pre-wrap"
          wordBreak="break-word"
        >
          {text}
        </Text>
      </Skeleton>
    </Flex>
  )
}

const LogDecodedInputDataHeader = ({
  methodId,
  methodCall,
  isLoading,
}: Props) => {
  return (
    <VStack
      align="flex-start"
      divider={<Divider />}
      fontSize="sm"
      lineHeight={5}
    >
      <Item label="Method id" text={methodId} isLoading={isLoading} />
      <Item label="Call" text={methodCall} isLoading={isLoading} />
    </VStack>
  )
}

export default LogDecodedInputDataHeader
