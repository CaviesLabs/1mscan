import { Box, Flex, Select } from "@chakra-ui/react"
import React from "react"

import hexToUtf8 from "lib/hexToUtf8"
import CopyToClipboard from "ui/shared/CopyToClipboard"

type DataType = "Hex" | "UTF-8"
const OPTIONS: Array<DataType> = ["Hex", "UTF-8"]

interface Props {
  hex: string
}

const RawInputData = ({ hex }: Props) => {
  const [selectedDataType, setSelectedDataType] =
    React.useState<DataType>("Hex")

  const handleSelectChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedDataType(event.target.value as DataType)
    },
    [],
  )

  return (
    <Box w="100%">
      <Flex justifyContent="space-between" alignItems="center">
        <Select
          size="xs"
          borderRadius="base"
          value={selectedDataType}
          onChange={handleSelectChange}
          focusBorderColor="none"
          w="auto"
        >
          {OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <CopyToClipboard text={hex} />
      </Flex>
      <Flex
        w="100%"
        mt={2}
        p={4}
        maxHeight="300px"
        overflowY="auto"
        wordBreak="break-all"
        whiteSpace="normal"
        borderRadius="0.5rem"
        borderWidth="1px"
        borderColor="neutral.light.4"
        backgroundColor="inherit"
        fontSize="sm"
      >
        {selectedDataType === "Hex" ? hex : hexToUtf8(hex)}
      </Flex>
    </Box>
  )
}

export default React.memo(RawInputData)
