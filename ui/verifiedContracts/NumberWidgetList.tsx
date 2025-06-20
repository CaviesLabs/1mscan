import type { GridProps } from "@chakra-ui/react"
import { Flex, Grid, Text } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"

import useApiQuery from "lib/api/useApiQuery"

import NumberWidget from "ui/shared/NumberWidget"

const Item = ({
  total,
  new24,
}: {
  total: string | undefined
  new24: string | undefined
}) => {
  return (
    <Flex alignItems="baseline">
      <Text mr={2} fontSize="lg">
        {Number(total).toLocaleString()}
      </Text>
      {Number(new24) > 0 && (
        <>
          <Text mr={1} fontSize="lg" color="green.500">
            +{Number(new24).toLocaleString()}
          </Text>
          <Text variant="secondary" fontSize="sm">
            ({getLanguage("utils.24h")})
          </Text>
        </>
      )}
    </Flex>
  )
}

const NumberWidgetList = (props: GridProps) => {
  const { data, isPlaceholderData } = useApiQuery(
    "verified_contracts_counters",
    {
      queryOptions: {
        placeholderData: {
          new_smart_contracts_24h: "0",
          new_verified_smart_contracts_24h: "00",
          smart_contracts: "0000",
          verified_smart_contracts: "000",
        },
      },
    },
  )

  return (
    <Grid
      gridTemplateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
      gridGap="0.75rem"
      width="full"
      {...props}
    >
      <NumberWidget
        index={0}
        label={`${getLanguage("evm_verified_contracts_page.total_contracts")} (EVM)`}
        value={
          <Item
            total={data?.smart_contracts}
            new24={data?.new_smart_contracts_24h}
          ></Item>
        }
        isLoading={isPlaceholderData}
      />
      <NumberWidget
        index={1}
        label={`${getLanguage("evm_verified_contracts_page.verified_contracts")} (EVM)`}
        value={
          <Item
            total={data?.verified_smart_contracts}
            new24={data?.new_verified_smart_contracts_24h}
          ></Item>
        }
        isLoading={isPlaceholderData}
      />
    </Grid>
  )
}

export default NumberWidgetList
