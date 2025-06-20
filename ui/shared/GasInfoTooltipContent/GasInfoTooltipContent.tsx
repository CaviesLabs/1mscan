import { Grid, GridItem, HStack, Text, VStack } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import Divider from "../Divider"
import Hint from "../Hint"

const GasInfoTooltipContent = ({
  average_gas_price,
  fast_gas_price,
  slow_gas_price,
}: {
  average_gas_price: string | undefined
  fast_gas_price: string | undefined
  slow_gas_price: string | undefined
}) => {
  if (!average_gas_price || !fast_gas_price || !slow_gas_price) return null
  return (
    <VStack
      alignItems="stretch"
      spacing="0.375rem"
      paddingX={4}
      paddingY={3}
      width="11.75rem"
      maxWidth="calc(100vw - 2rem)"
      color="neutral.light.1"
      textStyle="625"
      textAlign="left"
    >
      <Grid
        templateColumns="repeat(2, max-content)"
        rowGap={2}
        columnGap={4}
        fontSize="xs"
        flex={1}
        justifyContent="space-between"
        alignItems="stretch"
      >
        <GridItem color="#BADEF3">
          {getLanguage("header.slow")}
        </GridItem>
        <GridItem>
          {slow_gas_price !== null ? `${slow_gas_price} nsei` : "N/A"}
        </GridItem>
        <GridItem color="#BADEF3">
          {getLanguage("header.average")}
        </GridItem>
        <GridItem>
          {average_gas_price !== null ? `${average_gas_price} nsei` : "N/A"}
        </GridItem>
        <GridItem color="#BADEF3">
          {getLanguage("header.fast")}
        </GridItem>
        <GridItem>
          {fast_gas_price !== null ? `${fast_gas_price} nsei` : "N/A"}
        </GridItem>
      </Grid>
      <Divider backgroundColor="neutral.light.3" />
      <HStack alignItems="flex-start" justifySelf="stretch" spacing="0.25rem">
        <Hint label="" boxSize={4} color="gray.600" mt="-1px" />
        <Text
          as="i"
          fontSize="0.75rem"
          whiteSpace="wrap"
          wordBreak="break-word"
          color="inherit"
        >
          {getLanguage("header.gas_calculation_based_on_latest_1000_blocks")}
        </Text>
      </HStack>
    </VStack>
  )
}

export default memo(GasInfoTooltipContent, (prev, next) => {
  return (
    prev.average_gas_price === next.average_gas_price &&
    prev.fast_gas_price === next.fast_gas_price &&
    prev.slow_gas_price === next.slow_gas_price
  )
})
