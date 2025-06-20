import { Flex } from "@chakra-ui/react"
import { memo } from "react"
import type { DecodedInput } from "types/api/decodedInput"
import LogDecodedInputDataHeader from "./LogDecodedInputDataHeader"
import LogDecodedInputDataTable from "./LogDecodedInputDataTable"

interface Props {
  data: DecodedInput
  isLoading?: boolean
}

const LogDecodedInputData = ({ data, isLoading }: Props) => {
  return (
    <Flex flexDirection="column" width="full">
      <LogDecodedInputDataHeader
        methodId={data.method_id}
        methodCall={data.method_call}
        isLoading={isLoading}
      />
      {data.parameters?.length > 0 && (
        <LogDecodedInputDataTable
          data={data.parameters}
          isLoading={isLoading}
        />
      )}
    </Flex>
  )
}

export default memo(LogDecodedInputData)
