import { Flex, Select, Skeleton, Text } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"

type Props = {
  isLoading: boolean
}

const ContractSchemaFormat = ({ isLoading }: Props) => {
  return (
    <Flex gap={3} alignItems="center">
      <Skeleton isLoaded={!isLoading}>
        <Text
          as="span"
          color="neutral.light.7"
          fontSize="0.875rem"
          fontWeight={400}
          lineHeight="1.25rem"
        >
          {getLanguage("address.schema_type")}
        </Text>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} flex={1}>
        <Select placeholder={getLanguage("address.select_one")} flex={1}>
          <option value="json">{getLanguage("address.json_format")}</option>
          <option value="jraw">
            {getLanguage("address.jraw_text_format")}
          </option>
        </Select>
      </Skeleton>
    </Flex>
  )
}

export default ContractSchemaFormat
