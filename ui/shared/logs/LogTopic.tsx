import { Center, Flex, Select, Skeleton, Text } from "@chakra-ui/react"
import capitalize from "lodash/capitalize"
import React from "react"

import hexToAddress from "lib/hexToAddress"
import hexToUtf8 from "lib/hexToUtf8"
import CopyToClipboard from "ui/shared/CopyToClipboard"
import AddressEntityV2 from "../entities/address/AddressEntityV2"

interface Props {
  hex: string
  index: number
  isLoading?: boolean
}

type DataType = "hex" | "text" | "address" | "number"

const VALUE_CONVERTERS: Record<DataType, (hex: string) => string> = {
  hex: (hex) => hex,
  text: hexToUtf8,
  address: hexToAddress,
  number: (hex) => BigInt(hex).toString(),
}
const OPTIONS: Array<DataType> = ["hex", "address", "text", "number"]

const LogTopic = ({ hex, index, isLoading }: Props) => {
  const [selectedDataType, setSelectedDataType] =
    React.useState<DataType>("hex")

  const handleSelectChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedDataType(event.target.value as DataType)
    },
    [],
  )

  const value =
    VALUE_CONVERTERS[selectedDataType.toLowerCase() as Lowercase<DataType>](hex)

  const content = (() => {
    switch (selectedDataType) {
      case "hex":
      case "number":
      case "text": {
        return (
          <Skeleton
            isLoaded={!isLoading}
            noOfLines={1}
            gap={3}
            display="flex"
            overflow="hidden"
          >
            <Text
              color="neutral.light.6"
              fontSize="1rem"
              fontWeight={400}
              lineHeight="1.5rem"
              isTruncated
              flex={1}
            >
              {value}
            </Text>
            <CopyToClipboard text={value} isLoading={isLoading} />
          </Skeleton>
        )
      }

      case "address": {
        return (
          <AddressEntityV2
            truncation="tail"
            textStyle="1"
            color="neutral.light.6"
            address={{
              hash: value,
              name: "",
              implementations: null,
              is_contract: false,
              is_verified: false,
            }}
            isLoading={isLoading}
          />
        )
      }
    }
  })()

  return (
    <Flex
      alignItems="center"
      px={{ base: 0, lg: 3 }}
      overflow="hidden"
      maxW="100%"
    >
      <Skeleton isLoaded={!isLoading} mr={3} borderRadius="base">
        <Center
          backgroundColor="secondary.04.bg"
          borderRadius="0.25rem"
          fontWeight={400}
          w={6}
          color="secondary.04.text"
          height={6}
        >
          {index}
        </Center>
      </Skeleton>
      {index !== 0 && (
        <Skeleton
          isLoaded={!isLoading}
          mr={3}
          flexShrink={0}
          borderRadius="base"
        >
          <Select
            size="xs"
            borderRadius="base"
            value={selectedDataType}
            onChange={handleSelectChange}
            w="auto"
            aria-label="Data type"
          >
            {OPTIONS.map((option) => (
              <option key={option} value={option}>
                {capitalize(option)}
              </option>
            ))}
          </Select>
        </Skeleton>
      )}
      {content}
    </Flex>
  )
}

export default LogTopic
